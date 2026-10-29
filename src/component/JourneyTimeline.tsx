import { motion, useReducedMotion, useScroll, useSpring, type Variants } from "framer-motion";
import { useRef } from "react";
import JourneyCard, { type JourneyItem } from "./JourneyCard";

interface JourneyTimelineProps {
  label: string;
  icon: string;
  items: JourneyItem[];
}

const ease = [0.22, 1, 0.36, 1] as const;

const entry: Variants = {
  hidden: { opacity: 0, x: -18 },
  show: (index: number) => ({ opacity: 1, x: 0, transition: { duration: 0.7, ease, delay: index * 0.05 } }),
};

// o ponto "acende" junto com a entrada do card
const dot: Variants = {
  hidden: { backgroundColor: "#ffffff", scale: 0.6 },
  show: { backgroundColor: "#ffd230", scale: 1, transition: { duration: 0.5, ease, delay: 0.35 } },
};

export default function JourneyTimeline({ label, icon, items }: JourneyTimelineProps) {
  const reduceMotion = useReducedMotion();
  const list = useRef<HTMLOListElement>(null);
  // a linha do tempo é "riscada" a lápis conforme a pessoa rola a página
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <div className="w-full flex-1">
      <header className="mb-8 flex items-center gap-3">
        <img src={icon} alt="" className="h-9 w-9 object-contain" />
        <h3 className="font-hand text-3xl leading-none text-[#111]">{label}</h3>
        <span aria-hidden="true" className="h-px flex-1 bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.25)_0_6px,transparent_6px_11px)]" />
        <span className="font-mono text-xs text-[#777]">{String(items.length).padStart(2, "0")}</span>
      </header>

      <ol ref={list} className="relative pl-8">
        <span aria-hidden="true" className="absolute top-3 bottom-3 left-[9px] w-px bg-black/12" />
        <motion.span
          aria-hidden="true"
          className="absolute top-3 bottom-3 left-[8px] w-[3px] origin-top rounded-full bg-[#ffd230]"
          style={{ scaleY: reduceMotion ? 1 : progress }}
        />

        {items.map((item, index) => (
          <motion.li
            key={item.title}
            className="relative pb-6 last:pb-0"
            variants={entry}
            custom={index}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.span
              aria-hidden="true"
              className="absolute top-6 -left-8 h-[19px] w-[19px] rounded-full border-2 border-[#111]"
              variants={dot}
            />
            <JourneyCard {...item} />
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
