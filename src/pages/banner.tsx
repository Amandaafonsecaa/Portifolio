import { motion, type Variants } from "framer-motion";
import foto from "../assets/sorrindo-comcor.png";
import Button from "../component/Button";

export default function Banner() {
  // 1) Container com stagger (os filhos entram em sequência)
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  // 2) Padrão premium: sobe levinho + aparece
  const itemUp: Variants = {
    hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // 3) Título grande entrando mais suave (pra não competir)
  const bigTitle: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative w-full h-screen overflow-hidden mx-auto">
      {/* Conteúdo principal com stagger */}
      <motion.section
        className="relative z-19 flex flex-col items-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Top line: i'm  a */}
        <motion.div
          className="flex gap-40 absolute top-40 font-title text-5xl md:text-7xl z-20 italic"
          variants={itemUp}
        >
          <span>i&apos;m</span>
          <span className="opacity-0">L</span>
          <span>a</span>
        </motion.div>

        {/* Foto (entra depois) */}
        <motion.div className="relative" variants={itemUp}>
          <img
            src={foto}
            className="relative w-[700px] z-10"
            alt="Photo of the developer"
          />
        </motion.div>
      </motion.section>

      {/* Título grande atrás (entra por último e mais suave) */}
      <motion.section
        className="flex items-center justify-center"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.h1
          className="font-impact text-[5vw] text-[#ffd230] z-0 top-60 absolute"
          variants={bigTitle}
        >
          DEVEL<span className="opacity-0">L</span>LLLOPER
        </motion.h1>
      </motion.section>

      {/* Botão (entra suave) */}
      <motion.section
        className="z-20 bottom-15 left-0 right-0 mx-auto absolute flex justify-center"
        initial={{ opacity: 0, y: 14 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        <Button text="DOWNLOAD MY CV" onClick={() => alert("Oi")} />
      </motion.section>
    </section>
  );
}
