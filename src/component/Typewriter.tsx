import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  /** ms por letra digitada */
  typeSpeed?: number;
  /** ms por letra apagada */
  deleteSpeed?: number;
  /** ms com a palavra completa na tela */
  hold?: number;
}

// digita, segura, apaga e passa para a próxima palavra, em loop
export default function Typewriter({ words, typeSpeed = 90, deleteSpeed = 45, hold = 1900 }: TypewriterProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const word = words[index % words.length] ?? "";

  useEffect(() => {
    if (reduceMotion || words.length === 0) return;
    const full = !deleting && length === word.length;
    const empty = deleting && length === 0;
    const delay = full ? hold : empty ? 350 : deleting ? deleteSpeed : typeSpeed;

    const timer = setTimeout(() => {
      if (full) setDeleting(true);
      else if (empty) {
        setDeleting(false);
        setIndex((current) => (current + 1) % words.length);
      } else setLength((current) => current + (deleting ? -1 : 1));
    }, delay);
    return () => clearTimeout(timer);
  }, [deleting, length, word, words.length, reduceMotion, typeSpeed, deleteSpeed, hold]);

  return (
    <span className="typewriter">
      {/* leitores de tela ouvem uma palavra fixa em vez de cada letra */}
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden="true">
        {reduceMotion ? words[0] : word.slice(0, length)}
        <span className="typewriter-caret" />
      </span>
    </span>
  );
}
