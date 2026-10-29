import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";

import portrait from "../assets/avatar-aquarela.jpg";

/* Autorretrato em aquarela (a ilustração da Amanda), em SVG.
 * - A imagem ganha bordas irregulares de papel de aquarela: a máscara é
 *   um retângulo deformado por turbulência e esfumado nas pontas.
 * - Interação: hover ou clique faz ela piscar um olho (uma "camada de
 *   pele" pintada por cima do olho + o traço do olho fechado) e solta uma
 *   explosão de manchas, respingos, borboletas, estrelas e símbolos de
 *   código saindo da cabeça e dos óculos, que se dissolvem no ar. */

// coordenadas na ilustração original (736 × 736)
const SIZE = 736;
const SKIN = "#fddac4";
const LEFT_EYE = { cx: 319, cy: 395, rx: 21, ry: 50 };
const RIGHT_EYE = { cx: 450, cy: 390, rx: 19, ry: 46 };
const HEAD = { x: 395, y: 150 };

const PALETTE = ["#3b5bdb", "#7048e8", "#e64980", "#f76707", "#fab005", "#12b886", "#4dabf7", "#ff8787"];
const KINDS = ["blob", "blob", "blob", "drop", "drop", "butterfly", "butterfly", "butterfly", "star", "code", "braces", "atom", "heart"] as const;
const BURST_SIZE = 28;
const COOLDOWN = 1700;

type Kind = (typeof KINDS)[number];

interface Particle {
  id: number;
  kind: Kind;
  color: string;
  x: number;
  y: number;
  rotate: number;
  scale: number;
  duration: number;
  delay: number;
}

const BUTTERFLY = "M0 0 C -10 -14 -22 -10 -16 2 C -22 12 -8 14 0 4 C 8 14 22 12 16 2 C 22 -10 10 -14 0 0 Z";
const STAR = "M0 -12 L3.5 -3.8 L12 -3.7 L5.2 1.6 L7.6 10 L0 5 L-7.6 10 L-5.2 1.6 L-12 -3.7 L-3.5 -3.8 Z";
const HEART = "M0 6 C -12 -2 -10 -12 -3 -10 C -1 -9.5 0 -8 0 -7 C 0 -8 1 -9.5 3 -10 C 10 -12 12 -2 0 6 Z";

function makeBurst(seed: number): Particle[] {
  return Array.from({ length: BURST_SIZE }, (_, i) => {
    // leque para cima, saindo da cabeça
    const angle = ((-175 + Math.random() * 170) * Math.PI) / 180;
    const distance = 260 + Math.random() * 380;
    return {
      id: seed * 100 + i,
      kind: KINDS[Math.floor(Math.random() * KINDS.length)],
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance * 0.8 - 30,
      rotate: -90 + Math.random() * 180,
      scale: 1.8 + Math.random() * 1.8,
      duration: 1.8 + Math.random() * 1,
      delay: 0.12 + Math.random() * 0.18,
    };
  });
}

function Shape({ kind, color, filter }: { kind: Kind; color: string; filter: string }) {
  switch (kind) {
    case "blob":
      return <circle r={20} fill={color} opacity={0.7} filter={filter} />;
    case "drop":
      return (
        <g fill={color} filter={filter}>
          <circle r={5} />
          <circle cx={9} cy={-4} r={2.5} />
          <circle cx={-7} cy={6} r={2} />
        </g>
      );
    case "butterfly":
      return <path d={BUTTERFLY} fill={color} opacity={0.85} filter={filter} />;
    case "star":
      return <path d={STAR} fill={color} opacity={0.85} filter={filter} />;
    case "heart":
      return <path d={HEART} fill={color} opacity={0.85} filter={filter} />;
    case "atom":
      return (
        <g fill="none" stroke={color} strokeWidth={2.2} opacity={0.85} filter={filter}>
          {[0, 60, 120].map((r) => (
            <ellipse key={r} rx={15} ry={5.5} transform={`rotate(${r})`} />
          ))}
          <circle r={2.5} fill={color} />
        </g>
      );
    default:
      return (
        <text textAnchor="middle" dominantBaseline="central" fontFamily="ui-monospace, monospace" fontWeight={800} fontSize={20} fill={color} opacity={0.85} filter={filter}>
          {kind === "code" ? "</>" : "{ }"}
        </text>
      );
  }
}

/** Pálpebra fechada pintada por cima do olho da ilustração. */
function ClosedEye({ eye, filter }: { eye: typeof LEFT_EYE; filter: string }) {
  return (
    <g filter={filter}>
      <ellipse cx={eye.cx} cy={eye.cy} rx={eye.rx + 8} ry={eye.ry + 8} fill={SKIN} />
      <path
        d={`M${eye.cx - eye.rx - 4} ${eye.cy + 6} Q${eye.cx} ${eye.cy + 26} ${eye.cx + eye.rx + 4} ${eye.cy + 6}`}
        stroke="#141018"
        strokeWidth={9}
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

interface WatercolorAvatarProps {
  label: string;
}

export default function WatercolorAvatar({ label }: WatercolorAvatarProps) {
  const reduceMotion = useReducedMotion();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const edge = `wc-edge-${uid}`;
  const paper = `wc-paper-${uid}`;
  const bleed = `wc-bleed-${uid}`;
  const brush = `wc-brush-${uid}`;

  const [bursts, setBursts] = useState<{ id: number; particles: Particle[] }[]>([]);
  const [winking, setWinking] = useState(false);
  const [blink, setBlink] = useState(false);
  const lastBurst = useRef(0);
  const count = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // piscadas naturais de vez em quando
  useEffect(() => {
    if (reduceMotion) return;
    const pending = timers.current;
    const interval = setInterval(() => {
      setBlink(true);
      pending.push(setTimeout(() => setBlink(false), 150));
    }, 4200);
    return () => {
      clearInterval(interval);
      pending.forEach(clearTimeout);
    };
  }, [reduceMotion]);

  const play = () => {
    const now = performance.now();
    if (now - lastBurst.current < COOLDOWN) return;
    lastBurst.current = now;
    setWinking(true);
    timers.current.push(setTimeout(() => setWinking(false), 700));
    if (reduceMotion) return;
    const id = ++count.current;
    setBursts((current) => [...current, { id, particles: makeBurst(id) }]);
    timers.current.push(setTimeout(() => setBursts((current) => current.filter((burst) => burst.id !== id)), 3400));
  };

  return (
    <button
      type="button"
      aria-label={label}
      onPointerEnter={(event) => event.pointerType === "mouse" && play()}
      onClick={play}
      className="relative mx-auto block w-full max-w-[480px] cursor-pointer rounded-[2rem] outline-none focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#ffd230]"
    >
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="block h-auto w-full overflow-visible" aria-hidden="true">
        <defs>
          {/* borda de papel de aquarela: retângulo deformado e esfumado */}
          <filter id={edge} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="46" xChannelSelector="R" yChannelSelector="G" result="wobble" />
            <feGaussianBlur in="wobble" stdDeviation="7" />
          </filter>
          <mask id={paper} maskUnits="userSpaceOnUse" x="0" y="0" width={SIZE} height={SIZE}>
            <rect x="44" y="40" width={SIZE - 88} height={SIZE - 84} rx="40" fill="#fff" filter={`url(#${edge})`} />
          </mask>
          {/* tinta que escorre: manchas da explosão */}
          <filter id={bleed} x="-60%" y="-60%" width="220%" height="220%">
            <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="2" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G" result="wobble" />
            <feGaussianBlur in="wobble" stdDeviation="1.1" />
          </filter>
          {/* pincelada de giz/aquarela para a piscadinha combinar com o desenho */}
          <filter id={brush} x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="8" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="7" xChannelSelector="R" yChannelSelector="G" result="wobble" />
            <feGaussianBlur in="wobble" stdDeviation="1.6" />
          </filter>
        </defs>

        {/* RETRATO: flutua de leve e dá um pulinho na interação */}
        <motion.g
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          animate={
            reduceMotion
              ? undefined
              : winking
                ? { y: [0, -14, 0], rotate: [0, -1.5, 0], scale: [1, 1.025, 1] }
                : { y: [0, -6, 0], rotate: 0, scale: 1 }
          }
          transition={winking ? { duration: 0.6, ease: "easeOut" } : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <g mask={`url(#${paper})`}>
            <image href={portrait} width={SIZE} height={SIZE} preserveAspectRatio="xMidYMid slice" />
            {/* piscadinha: o olho esquerdo fecha; os dois piscam de vez em quando */}
            {(winking || blink) && <ClosedEye eye={LEFT_EYE} filter={`url(#${brush})`} />}
            {blink && !winking && <ClosedEye eye={RIGHT_EYE} filter={`url(#${brush})`} />}
          </g>
        </motion.g>

        {/* EXPLOSÃO DE AQUARELA saindo da cabeça e dos óculos */}
        <g transform={`translate(${HEAD.x} ${HEAD.y})`}>
          <AnimatePresence>
            {bursts.flatMap((burst) =>
              burst.particles.map((p) => (
                <motion.g
                  key={p.id}
                  initial={{ x: 0, y: 0, scale: 0.3, rotate: 0, opacity: 0 }}
                  animate={{
                    x: [0, p.x * 0.7, p.x],
                    y: [0, p.y * 0.7, p.y + 70],
                    scale: [0.3, p.scale, p.scale * (p.kind === "blob" ? 1.7 : 1.1)],
                    rotate: [0, p.rotate * 0.6, p.rotate],
                    opacity: [0, 0.95, 0],
                  }}
                  transition={{ duration: p.duration, delay: p.delay, ease: [0.16, 1, 0.3, 1], times: [0, 0.45, 1] }}
                >
                  <Shape kind={p.kind} color={p.color} filter={`url(#${bleed})`} />
                </motion.g>
              )),
            )}
          </AnimatePresence>
        </g>
      </svg>
    </button>
  );
}
