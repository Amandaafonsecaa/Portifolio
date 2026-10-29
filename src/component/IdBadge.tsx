import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";

import photo from "../assets/foto-amarelo.jpeg";

// distância entre o ponto de fixação do cordão e o topo do crachá
const STRAP_LENGTH = 300;
const STRAP_WIDTH = 30;
const CARD_WIDTH = 280;
const STACK = ["React", "TypeScript", "Node.js", "NestJS", "Python", "Docker", "Tailwind CSS"];

export default function IdBadge() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const dragged = useRef(false);

  // começa deslocado para balançar depois da queda
  const x = useMotionValue(reduceMotion ? 0 : 70);
  const y = useMotionValue(0);

  // o cordão sempre liga o ponto fixo ao clipe do crachá
  const strapAngle = useTransform([x, y], ([lx, ly]: number[]) => (-Math.atan2(lx, STRAP_LENGTH + ly) * 180) / Math.PI);
  const strapLength = useTransform([x, y], ([lx, ly]: number[]) => Math.hypot(lx, STRAP_LENGTH + ly));
  const badgeRotate = useSpring(strapAngle, { stiffness: 260, damping: 14 });

  // inclinação 3D proporcional à velocidade + rotação do flip
  const tilt = useSpring(useTransform(useVelocity(x), [-1500, 1500], [-28, 28]), { stiffness: 200, damping: 20 });
  const flip = useSpring(0, { stiffness: 90, damping: 14 });
  const rotateY = useTransform([flip, tilt], ([f, tl]: number[]) => f + tl);

  useEffect(() => {
    if (reduceMotion) return;
    const swing = animate(x, 0, { type: "spring", stiffness: 60, damping: 4, delay: 0.9 });
    return () => swing.stop();
  }, [reduceMotion, x]);

  const toggle = () => {
    const next = !flipped;
    setFlipped(next);
    flip.set(next ? 180 : 0);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  };

  return (
    // queda ao abrir o site
    <motion.div
      className="relative w-[420px] max-w-full select-none"
      style={{ height: STRAP_LENGTH + 470 }}
      initial={reduceMotion ? false : { y: -900 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 110, damping: 11, delay: 0.5 }}
    >
      {/* CORDÃO */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 overflow-hidden bg-[#ffd230] mask-[linear-gradient(to_bottom,transparent,black_90px)]"
        style={{
          left: `calc(50% - ${STRAP_WIDTH / 2}px)`,
          width: STRAP_WIDTH,
          height: strapLength,
          rotate: strapAngle,
          originX: 0.5,
          originY: 0,
        }}
      >
        <span className="absolute inset-x-0 bottom-0 flex justify-center [writing-mode:vertical-rl] rotate-180 font-impact text-[10px] tracking-[0.35em] text-[#0a0909]/70 whitespace-nowrap">
          {"AMANDA FONSECA ✦ ".repeat(8)}
        </span>
      </motion.div>

      {/* CRACHÁ */}
      <motion.div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={t("badge.ariaLabel")}
        className="absolute cursor-grab active:cursor-grabbing rounded-[20px] outline-none focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#ffd230]"
        style={{
          top: STRAP_LENGTH,
          left: `calc(50% - ${CARD_WIDTH / 2}px)`,
          width: CARD_WIDTH,
          x,
          y,
          rotate: badgeRotate,
          originX: 0.5,
          originY: 0,
        }}
        drag
        dragSnapToOrigin
        dragConstraints={{ left: -110, right: 110, top: -60, bottom: 50 }}
        dragElastic={0.15}
        dragTransition={{ bounceStiffness: 160, bounceDamping: 7 }}
        onPointerDown={() => (dragged.current = false)}
        onDragStart={() => (dragged.current = true)}
        onClick={() => !dragged.current && toggle()}
        onKeyDown={handleKeyDown}
      >
        {/* PRESILHA */}
        <div aria-hidden="true" className="flex flex-col items-center">
          <div className="h-5 w-5 -mt-2 rounded-full border-[3px] border-[#c9c9c9] shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]" />
          <div className="h-7 w-4 -mt-1 rounded-sm bg-linear-to-b from-[#e8e8e8] via-[#9a9a9a] to-[#d4d4d4] shadow-md" />
        </div>

        <motion.div
          className="relative -mt-1 h-105 rounded-[20px] transform-3d"
          style={{ rotateY, transformPerspective: 1100 }}
        >
          {/* FRENTE */}
          <div
            aria-hidden={flipped}
            className="absolute inset-0 flex flex-col items-center overflow-hidden rounded-[20px] border border-black/5 bg-white px-6 pt-4 text-center text-[#111] shadow-[0_30px_70px_rgba(0,0,0,0.22)] backface-hidden"
          >
            <span aria-hidden="true" className="h-2 w-12 rounded-full bg-[#111]/12" />
            <p className="mt-4 font-body text-[17px] font-extrabold tracking-[-0.08em]">
              AF<span className="text-[#e5b900]">.</span>
            </p>
            <div className="mt-4 h-[200px] w-[164px] overflow-hidden rounded-lg bg-[#e5e0d4]">
              <img
                src={photo}
                alt={t("about.photoAlt")}
                draggable={false}
                className="h-full w-full object-cover scale-[1.75] origin-[53%_30%]"
              />
            </div>
            <p className="mt-6 font-body text-[22px] font-bold leading-none tracking-[-0.03em]">{t("badge.name")}</p>
            <span aria-hidden="true" className="mt-3 h-[2px] w-8 bg-[#ffd230]" />
            <p className="mt-3 font-body text-[11px] font-semibold uppercase tracking-[0.22em] text-[#666]">{t("badge.role")}</p>
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3 bg-[#ffd230]" />
          </div>

          {/* VERSO */}
          <div
            aria-hidden={!flipped}
            className="absolute inset-0 flex flex-col items-center rounded-[20px] bg-[#111] px-7 pt-4 pb-6 text-center text-white shadow-[0_30px_70px_rgba(0,0,0,0.3)] backface-hidden transform-[rotateY(180deg)]"
          >
            <span aria-hidden="true" className="h-2 w-12 rounded-full bg-white/15" />
            <p className="mt-8 font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-[#ffd230]">{t("badge.focusLabel")}</p>
            <p className="mt-3 font-title text-[1.6rem] leading-[1.15] text-balance">{t("badge.focus")}</p>
            <span aria-hidden="true" className="mt-6 h-px w-10 bg-white/20" />
            <p className="mt-6 font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-[#ffd230]">{t("badge.stackLabel")}</p>
            <ul className="mt-3 flex flex-wrap justify-center gap-2">
              {STACK.map((tech) => (
                <li key={tech} className="rounded-full border border-white/25 px-3 py-1 font-body text-xs text-white/85">
                  {tech}
                </li>
              ))}
            </ul>
            <div
              aria-hidden="true"
              className="mt-auto h-8 w-full opacity-60 [background:repeating-linear-gradient(90deg,#fff_0_2px,transparent_2px_5px,#fff_5px_6px,transparent_6px_9px)]"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
