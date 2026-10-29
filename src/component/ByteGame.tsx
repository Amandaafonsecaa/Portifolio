import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

/* BYTE.exe: um bichinho virtual em pixel art. O Byte é um gato
 * programador que mora num quartinho à noite. Dá para alimentar (café),
 * fazer carinho, brincar com o novelo e colocá-lo para programar; as
 * linhas de código que ele "entrega" ficam salvas no navegador.
 * A cena é desenhada pixel a pixel num canvas 96×64, ampliado sem
 * suavização, a 12 quadros por segundo (ritmo de pixel art). */

const W = 96;
const H = 64;
const FLOOR = 42;
const CAT_Y = 44;
const DESK_X = 60;
const TICK = 1000 / 12;
const LOC_KEY = "byte-loc";

const PALETTE: Record<string, string> = { k: "#2b2118", o: "#f2a541", p: "#ff8fa3", e: "#1a1a1a", w: "#fff3e0", h: "#ff5d8f" };

const CAT = [
  "...k........k...",
  "..kok......kok..",
  "..kopk....kpok..",
  ".kooooooooooook.",
  "kooooooooooooook",
  "koooeeooooeeoook",
  "koooeeooooeeoook",
  "kowwoooppooowwok",
  ".kooooowwoooook.",
  "..kooooooooook..",
  ".koowwwwwwwwook.",
  ".kowwwwwwwwwwok.",
  ".kowwwwwwwwwwok.",
  ".kooowwwwwwoook.",
  ".koookkookkoook.",
  "..kkkkkkkkkkkk..",
];
const CAT_BLINK = CAT.map((row, i) => (i === 5 ? row.replace(/e/g, "o") : i === 6 ? row.replace(/e/g, "k") : row));
const CAT_EAT = CAT.map((row, i) => (i === 8 ? ".koooookkoooook." : row));
const TAIL = [
  ["..k..", ".kok.", ".kok.", "kok..", "kok..", "kk..."],
  [".....", "...k.", "..kok", ".kok.", "kok..", "kk..."],
];
const HEART = [".h.h.", "hhhhh", ".hhh.", "..h.."];
const CODE_COLORS = ["#ffd230", "#7fd1ae", "#7aa2f7", "#ff8fa3"];

type Mode = "idle" | "walk" | "eat" | "happy" | "play" | "code" | "sleep";
type Action = "feed" | "pet" | "play" | "code";
type BubbleKey = "hello" | "feed" | "pet" | "play" | "code" | "shipped" | "tired" | "sleep" | "bored";

interface Sim {
  mode: Mode;
  timer: number;
  x: number;
  target: number;
  facing: 1 | -1;
  frame: number;
  blink: number;
  ballX: number;
  ballV: number;
  hearts: { x: number; y: number; life: number }[];
  code: { width: number; color: string }[];
  pending: number;
}

const clamp = (value: number) => Math.max(0, Math.min(100, value));

function sprite(ctx: CanvasRenderingContext2D, rows: string[], x: number, y: number, flip = false) {
  rows.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) {
      const ch = row[flip ? row.length - 1 - c : c];
      if (ch === ".") continue;
      ctx.fillStyle = PALETTE[ch];
      ctx.fillRect(Math.round(x) + c, y + r, 1, 1);
    }
  });
}

function rect(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, w: number, h: number) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawRoom(ctx: CanvasRenderingContext2D, sim: Sim) {
  // parede com papel de parede pontilhado
  rect(ctx, "#26223f", 0, 0, W, FLOOR);
  for (let y = 4; y < FLOOR - 4; y += 8) for (let x = (y / 4) % 8; x < W; x += 8) rect(ctx, "#302b52", x, y, 1, 1);
  rect(ctx, "#1a1730", 0, FLOOR - 2, W, 2);

  // janela com lua e estrelas piscando
  rect(ctx, "#6e4632", 6, 6, 23, 21);
  rect(ctx, "#10183a", 8, 8, 19, 17);
  rect(ctx, "#ffe9a8", 21, 10, 4, 4);
  rect(ctx, "#10183a", 21, 10, 1, 1);
  [[10, 10], [13, 20], [18, 12], [24, 21], [11, 16]].forEach(([sx, sy], i) => {
    if ((sim.frame + i * 7) % 40 > 4) rect(ctx, "#ffffff", sx, sy, 1, 1);
  });
  rect(ctx, "#6e4632", 17, 8, 1, 17);
  rect(ctx, "#6e4632", 8, 16, 19, 1);

  // pôster "</>"
  rect(ctx, "#e0b400", 34, 8, 13, 13);
  rect(ctx, "#ffd230", 35, 9, 11, 11);
  [[37, 14], [38, 13], [38, 15], [43, 14], [42, 13], [42, 15], [41, 12], [40, 14], [39, 16]].forEach(([px, py]) => rect(ctx, "#2b2118", px, py, 1, 1));

  // prateleira com livros
  rect(ctx, "#6e4632", 52, 16, 20, 2);
  [["#7aa2f7", 53, 4], ["#ff8fa3", 55, 5], ["#7fd1ae", 57, 3], ["#ffd230", 59, 6], ["#d94f30", 63, 4]].forEach(([color, bx, bh]) =>
    rect(ctx, color as string, bx as number, 16 - (bh as number), 2, bh as number),
  );

  // chão de tábuas
  rect(ctx, "#6e4632", 0, FLOOR, W, H - FLOOR);
  for (let y = FLOOR + 4; y < H; y += 5) rect(ctx, "#5b3a29", 0, y, W, 1);
  for (let y = FLOOR; y < H; y += 5) rect(ctx, "#5b3a29", ((y * 13) % 40) + 10, y, 1, 4);

  // tapete
  rect(ctx, "#b8433a", 16, 54, 40, 8);
  rect(ctx, "#d9655b", 18, 56, 36, 4);

  // escrivaninha + notebook + caneca
  rect(ctx, "#8a5a3b", 56, 30, 37, 3);
  rect(ctx, "#6b4329", 58, 33, 2, 21);
  rect(ctx, "#6b4329", 89, 33, 2, 21);
  rect(ctx, "#3a3f4b", 69, 19, 17, 11);
  rect(ctx, "#12151d", 70, 20, 15, 9);
  if (sim.mode === "code" && Math.abs(sim.x - DESK_X) <= 1) {
    sim.code.forEach((line, i) => rect(ctx, line.color, 71, 21 + i * 2, line.width, 1));
  } else if (sim.frame % 12 < 6) {
    rect(ctx, "#ffd230", 71, 21, 1, 2);
  }
  rect(ctx, "#b7bcc4", 67, 29, 21, 1);
  rect(ctx, "#ffd230", 88, 26, 3, 4);
  rect(ctx, "#ffd230", 91, 27, 1, 2);

  // planta
  rect(ctx, "#b5651d", 3, 51, 7, 6);
  [[4, 47], [6, 45], [8, 47], [5, 49], [7, 48], [6, 43]].forEach(([lx, ly]) => rect(ctx, "#4caf50", lx, ly, 2, 3));
}

function drawActors(ctx: CanvasRenderingContext2D, sim: Sim) {
  const flip = sim.facing === -1;
  const asleep = sim.mode === "sleep";

  if (sim.mode === "eat") {
    rect(ctx, "#4a90d9", sim.x + (flip ? -6 : 16), 57, 7, 3);
    if (sim.timer > 10) rect(ctx, "#c96a3a", sim.x + (flip ? -5 : 17), 56, 5, 1);
  }
  if (sim.mode === "play") {
    rect(ctx, "#ff7eb6", sim.ballX, 56, 4, 4);
    rect(ctx, "#d94f8a", sim.ballX + 1, 57, 2, 1);
  }

  const tail = TAIL[asleep ? 0 : Math.floor(sim.frame / 4) % 2];
  sprite(ctx, tail, flip ? sim.x + 15 : sim.x - 4, CAT_Y + 9, flip);
  const body = asleep || sim.blink > 0 || sim.mode === "happy" ? CAT_BLINK : sim.mode === "eat" && sim.frame % 6 < 3 ? CAT_EAT : CAT;
  // pulinho enquanto anda ou brinca
  const hop = (sim.mode === "walk" || sim.mode === "play") && sim.frame % 4 < 2 ? 1 : 0;
  sprite(ctx, body, sim.x, CAT_Y - hop, flip);

  sim.hearts.forEach((heart) => sprite(ctx, HEART, heart.x, Math.round(heart.y)));

  if (asleep) {
    const rise = (sim.frame % 24) / 3;
    ctx.fillStyle = "#ffffff";
    [[0, 0], [1, 0], [2, 0], [1, 1], [0, 2], [1, 2], [2, 2]].forEach(([zx, zy]) => ctx.fillRect(sim.x + 14 + zx, CAT_Y - 6 - Math.round(rise) + zy, 1, 1));
  }
}

function newCode() {
  return Array.from({ length: 4 }, () => ({ width: 3 + Math.floor(Math.random() * 11), color: CODE_COLORS[Math.floor(Math.random() * CODE_COLORS.length)] }));
}

export default function ByteGame() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const canvas = useRef<HTMLCanvasElement>(null);
  const bubbleEl = useRef<HTMLDivElement>(null);
  const sim = useRef<Sim>({ mode: "idle", timer: 40, x: 26, target: 26, facing: 1, frame: 0, blink: 0, ballX: 0, ballV: 0, hearts: [], code: newCode(), pending: 0 });

  const [stats, setStats] = useState({ energy: 80, happiness: 70 });
  const statsRef = useRef(stats);
  const [loc, setLoc] = useState(() => {
    try {
      return Number(localStorage.getItem(LOC_KEY)) || 0;
    } catch {
      return 0;
    }
  });
  const [bubble, setBubble] = useState<{ key: BubbleKey; count?: number } | null>({ key: "hello" });
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const say = (key: BubbleKey, count?: number) => {
    setBubble({ key, count });
    clearTimeout(bubbleTimer.current);
    bubbleTimer.current = setTimeout(() => setBubble(null), 3600);
  };

  const changeStats = (energy: number, happiness: number) => {
    const next = { energy: clamp(statsRef.current.energy + energy), happiness: clamp(statsRef.current.happiness + happiness) };
    statsRef.current = next;
    setStats(next);
  };

  // o React só fica sabendo de eventos (entregas); o resto mora no ref
  const onShipped = useRef((lines: number) => {
    setLoc((value) => value + lines);
    say("shipped", lines);
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOC_KEY, String(loc));
    } catch {
      // armazenamento indisponível: o contador vale só para esta visita
    }
  }, [loc]);

  useEffect(() => () => clearTimeout(bubbleTimer.current), []);

  // laço do jogo
  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    let visible = true;

    const update = () => {
      const s = sim.current;
      s.frame++;
      if (s.blink > 0) s.blink--;
      else if (Math.random() < 0.02) s.blink = 2;
      s.hearts = s.hearts.map((h) => ({ ...h, y: h.y - 0.5, life: h.life - 1 })).filter((h) => h.life > 0);

      const walkTo = (target: number, speed = 1) => {
        if (Math.abs(target - s.x) <= speed) {
          s.x = target;
          return true;
        }
        s.facing = target > s.x ? 1 : -1;
        s.x += speed * s.facing;
        return false;
      };

      switch (s.mode) {
        case "idle":
          if (reduceMotion) break;
          if (--s.timer <= 0) {
            s.mode = "walk";
            s.target = 8 + Math.floor(Math.random() * 48);
          }
          break;
        case "walk":
          if (walkTo(s.target)) {
            s.mode = "idle";
            s.timer = 50 + Math.floor(Math.random() * 60);
          }
          break;
        case "eat":
        case "happy":
          if (s.mode === "happy" && s.frame % 4 === 0) s.hearts.push({ x: s.x + 4 + Math.floor(Math.random() * 8), y: CAT_Y - 4, life: 16 });
          if (--s.timer <= 0) s.mode = "idle";
          break;
        case "play":
          s.ballX += s.ballV;
          if (s.ballX < 4 || s.ballX > 80) s.ballV *= -1;
          walkTo(s.ballX - (s.ballV > 0 ? 14 : -4), 1.5);
          if (--s.timer <= 0) s.mode = "idle";
          break;
        case "code":
          // vai trotando até a mesa
          if (!walkTo(DESK_X, 2)) break;
          s.facing = 1;
          if (s.frame % 3 === 0) s.code = [...s.code.slice(1), newCode()[0]];
          if (--s.timer <= 0) {
            s.mode = "idle";
            s.timer = 60;
            onShipped.current(s.pending);
          }
          break;
        case "sleep":
          break;
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      acc += Math.min(now - last, 250);
      last = now;
      if (!visible) return;
      let dirty = false;
      while (acc >= TICK) {
        update();
        acc -= TICK;
        dirty = true;
      }
      if (!dirty) return;
      drawRoom(ctx, sim.current);
      drawActors(ctx, sim.current);
      // o balão de fala acompanha o gato
      if (bubbleEl.current) bubbleEl.current.style.left = `${Math.max(24, Math.min(76, ((sim.current.x + 8) / W) * 100))}%`;
    };

    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    observer.observe(el);
    drawRoom(ctx, sim.current);
    drawActors(ctx, sim.current);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [reduceMotion]);

  // fome e tédio com o tempo; sem energia, o Byte dorme
  useEffect(() => {
    let seconds = 0;
    const timer = setInterval(() => {
      if (document.hidden) return;
      seconds++;
      changeStats(-0.6, -0.8);
      const s = sim.current;
      if (statsRef.current.energy < 12 && s.mode !== "sleep") {
        s.mode = "sleep";
        say("sleep");
      } else if (statsRef.current.happiness < 25 && seconds % 15 === 0 && s.mode === "idle") {
        say("bored");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const act = (action: Action) => {
    const s = sim.current;
    const { energy } = statsRef.current;
    if (s.mode === "sleep" && action !== "feed" && action !== "pet") return say("sleep");

    if (action === "feed") {
      changeStats(30, 4);
      Object.assign(s, { mode: "eat", timer: 30 });
    } else if (action === "pet") {
      changeStats(0, 15);
      Object.assign(s, { mode: "happy", timer: 24 });
    } else if (action === "play") {
      if (energy < 20) return say("tired");
      changeStats(-12, 25);
      Object.assign(s, { mode: "play", timer: 66, ballX: 6, ballV: 2 });
    } else {
      if (energy < 25) return say("tired");
      changeStats(-15, 5);
      Object.assign(s, { mode: "code", timer: 54, pending: 12 + Math.floor(Math.random() * 40), code: newCode() });
    }
    say(action);
  };

  const actions: { id: Action; icon: string }[] = [
    { id: "feed", icon: "☕" },
    { id: "pet", icon: "♥" },
    { id: "play", icon: "🧶" },
    { id: "code", icon: "</>" },
  ];

  return (
    <div className="byte-console">
      <div className="byte-header">
        <span className="byte-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>BYTE.exe</span>
        <span className="byte-loc">
          {loc.toLocaleString()} {t("about.game.loc")}
        </span>
      </div>

      <div className="byte-screen">
        <canvas
          ref={canvas}
          width={W}
          height={H}
          role="img"
          aria-label={t("about.game.canvasLabel")}
          className="block aspect-[3/2] w-full cursor-pointer [image-rendering:pixelated]"
          onClick={() => act("pet")}
        />
        <div ref={bubbleEl} className="byte-bubble" aria-live="polite">
          {bubble && <span key={`${bubble.key}-${bubble.count ?? 0}`}>{t(`about.game.bubbles.${bubble.key}`, { count: bubble.count })}</span>}
        </div>
      </div>

      <div className="byte-stats">
        {([["energy", stats.energy], ["happiness", stats.happiness]] as const).map(([key, value]) => (
          <div key={key} className="byte-stat">
            <span>{t(`about.game.${key}`)}</span>
            <span className="byte-bar" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value)} aria-label={t(`about.game.${key}`)}>
              {Array.from({ length: 10 }, (_, i) => (
                <i key={i} className={i < Math.ceil(value / 10) ? "on" : ""} />
              ))}
            </span>
          </div>
        ))}
      </div>

      <div className="byte-actions">
        {actions.map(({ id, icon }) => (
          <button key={id} type="button" className="byte-button" onClick={() => act(id)}>
            <span aria-hidden="true">{icon}</span>
            {t(`about.game.${id}`)}
          </button>
        ))}
      </div>
    </div>
  );
}
