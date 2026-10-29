import { motion, type Variants } from "framer-motion";

interface RevealTextProps {
  text: string;
  /** Liga a animação; quem decide é o pai (ex.: useInView no título). */
  play: boolean;
  delay?: number;
}

const word: Variants = {
  hidden: { y: "110%" },
  show: (delay: number) => ({ y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay } }),
};

// cada palavra sobe de dentro de uma "fenda" com overflow escondido.
// `animate` vem explícito em cada palavra (e não herdado do pai) para que
// palavras montadas depois, ao trocar de idioma, também apareçam.
export default function RevealText({ text, play, delay = 0 }: RevealTextProps) {
  const words = text.split(" ");

  return words.map((item, index) => (
    <span key={`${item}-${index}`}>
      <span className="reveal-word">
        <motion.span
          className="inline-block"
          variants={word}
          custom={delay + index * 0.08}
          initial="hidden"
          animate={play ? "show" : "hidden"}
        >
          {item}
        </motion.span>
      </span>
      {index < words.length - 1 && " "}
    </span>
  ));
}
