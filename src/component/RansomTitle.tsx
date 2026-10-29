import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

interface RansomTitleProps {
  text: string;
}

// recortes de revista: papel, cor do texto, fonte e inclinação
const PAPERS = [
  { bg: "#ffd230", fg: "#111111", font: "font-title", rotate: -6 },
  { bg: "#f4ead5", fg: "#c0392b", font: "font-impact", rotate: 4 },
  { bg: "#f26b1d", fg: "#fff8e7", font: "font-body font-extrabold", rotate: -3 },
  { bg: "#2f6f73", fg: "#f4ead5", font: "font-title italic", rotate: 6 },
  { bg: "#ffffff", fg: "#111111", font: "font-mono font-bold", rotate: -2 },
  { bg: "#e8d5b0", fg: "#6b4e4a", font: "font-hand font-semibold", rotate: 3 },
  { bg: "#d94f30", fg: "#ffd230", font: "font-impact", rotate: -5 },
  { bg: "#1b1b1b", fg: "#ffd230", font: "font-title", rotate: 2 },
];

// bordas levemente tortas, como corte de tesoura
const CUTS = [
  "polygon(2% 4%, 97% 0, 100% 93%, 4% 100%)",
  "polygon(0 2%, 100% 6%, 96% 100%, 3% 95%)",
  "polygon(4% 0, 100% 3%, 98% 97%, 0 100%)",
  "polygon(0 0, 95% 4%, 100% 100%, 5% 96%)",
];

function Letter({ char, index, seed, show, big }: { char: string; index: number; seed: number; show: boolean; big: boolean }) {
  const paper = PAPERS[(index * 3 + seed) % PAPERS.length];
  const cut = CUTS[(index + seed) % CUTS.length];
  const lift = ((index * 7 + seed) % 5) - 2;

  return (
    <motion.span
      className={`ransom-letter ${paper.font} ${big ? "ransom-big" : "ransom-small"}`}
      style={{ backgroundColor: paper.bg, color: paper.fg, clipPath: cut }}
      initial={{ y: -70, opacity: 0, rotate: paper.rotate * 4 }}
      animate={show ? { y: lift, opacity: 1, rotate: paper.rotate } : undefined}
      whileHover={{ y: lift - 8, rotate: -paper.rotate, scale: 1.08 }}
      transition={{ type: "spring", stiffness: 320, damping: 16, delay: show ? index * 0.045 : 0 }}
    >
      {char}
    </motion.span>
  );
}

// "I'm Amanda" montado com recortes; clicar no título recorta tudo de novo
export default function RansomTitle({ text }: RansomTitleProps) {
  const title = useRef<HTMLHeadingElement>(null);
  const show = useInView(title, { once: true, amount: 0.4 });
  const [seed, setSeed] = useState(0);

  const words = text.split(" ");
  const name = words.pop() ?? "";
  const prefix = words.join(" ");
  let count = 0;

  const renderWord = (word: string, big: boolean) => (
    <span className="inline-flex flex-nowrap gap-[0.08em]">
      {[...word].map((char) => {
        const index = count++;
        return <Letter key={`${char}-${index}`} char={char} index={index} seed={seed} show={show} big={big} />;
      })}
    </span>
  );

  return (
    <h2 ref={title} aria-label={text} className="ransom-title" onClick={() => setSeed((value) => value + 1)}>
      <span aria-hidden="true" className="flex flex-col items-start gap-[0.12em]">
        {prefix && <span className="inline-flex flex-wrap gap-[0.3em]">{prefix.split(" ").map((word) => <span key={word}>{renderWord(word, false)}</span>)}</span>}
        {renderWord(name, true)}
      </span>
    </h2>
  );
}
