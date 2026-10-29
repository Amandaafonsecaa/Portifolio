import { motion } from "framer-motion";

interface RevealTextProps {
  text: string;
  delay?: number;
}

// cada palavra sobe de dentro de uma "fenda" com overflow escondido
export default function RevealText({ text, delay = 0 }: RevealTextProps) {
  const words = text.split(" ");

  return words.map((word, index) => (
    <span key={`${word}-${index}`}>
      <span className="reveal-word">
        <motion.span
          className="inline-block"
          initial={{ y: "110%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay + index * 0.08 }}
        >
          {word}
        </motion.span>
      </span>
      {index < words.length - 1 && " "}
    </span>
  ));
}
