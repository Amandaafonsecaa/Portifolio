import { motion, useReducedMotion, useSpring } from "framer-motion";
import type { PointerEvent } from "react";

interface MagneticPillProps {
  label: string;
  index: number;
}

// fração da distância até o centro que a pílula acompanha o cursor
const PULL = 0.35;
const spring = { stiffness: 220, damping: 15, mass: 0.4 };

export default function MagneticPill({ label, index }: MagneticPillProps) {
  const reduceMotion = useReducedMotion();
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  // mede o <li>, que não se move, para o ímã não realimentar o próprio deslocamento
  const handleMove = (event: PointerEvent<HTMLLIElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = event.clientX - rect.left;
    const py = event.clientY - rect.top;
    event.currentTarget.style.setProperty("--px", `${px}px`);
    event.currentTarget.style.setProperty("--py", `${py}px`);
    if (reduceMotion || event.pointerType !== "mouse") return;
    x.set((px - rect.width / 2) * PULL);
    y.set((py - rect.height / 2) * PULL);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 + index * 0.06 }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      <motion.span className="magnetic-pill" style={{ x, y }}>
        <i aria-hidden="true">{String(index + 1).padStart(2, "0")}</i>
        {label}
      </motion.span>
    </motion.li>
  );
}
