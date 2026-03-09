import { motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import about_me from "../assets/about_me.png";
import Polaroid from "../assets/polaroid.png";

export default function KnowMe() {
  const { t } = useTranslation();

  // container com stagger (anima os filhos em sequência)
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  // cada item sobe levemente + fade
  const item: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // polaroid entra pela direita bem sutil
  const rightItem: Variants = {
    hidden: { opacity: 0, x: 18, y: 10 },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
    },
  };

  return (
    <section className="relative w-full overflow-hidden pt-16 pb-18 bg-[#0a0909]">
      {/* WAVE TOPO */}
      <div className="absolute top-0 left-0 w-full leading-none z-0">
        <svg
          className="block w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,32L120,58.7C240,85,480,139,720,160C960,181,1200,171,1320,165.3L1440,160L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"
          />
        </svg>
      </div>

      {/* CONTEÚDO */}
      <div className="relative z-10 max-w-7xl mx-auto pt-[120px] px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* BLOCO ESQUERDO (stagger nos itens) */}
          <motion.div
            className="flex flex-col flex-1 gap-8 max-w-[560px] w-full"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            {/* IM AMANDA */}
            <motion.img
              variants={item}
              src={about_me}
              alt={t("about.title")}
              className="
                w-full max-w-[300px] h-auto select-none
                transition-all duration-500 ease-out
                hover:scale-105
                hover:-rotate-1
              "
            />

            {/* PRIMEIRO PARÁGRAFO: p1 + p2 JUNTOS */}
            <motion.p
              variants={item}
              className="text-white/80 font-sans font-thin text-base md:text-lg leading-relaxed md:leading-8 tracking-wide [text-wrap:balance]"
            >
              {`${t("about.p1Start")} `}
              <span className="text-[#ffd230]">{t("about.p1Highlight")}</span>
              {` ${t("about.p1End")} ${t("about.p2Start")} `}
              <span className="text-[#ffd230]">{t("about.p2Highlight")}</span>
              {` ${t("about.p2End")}`}
            </motion.p>

            {/* SEGUNDO PARÁGRAFO: p3 separado */}
            <motion.p
              variants={item}
              className="text-white/80 font-sans font-thin text-base md:text-lg leading-relaxed md:leading-8 tracking-wide [text-wrap:balance]"
            >
              {`${t("about.p3Start")} `}
              <span className="text-[#ffd230]">{t("about.p3Highlight")}</span>
              {` ${t("about.p3End")}`}
            </motion.p>

            {/* REDES SOCIAIS */}
            <motion.div
              variants={item}
              className="flex gap-8 flex-wrap items-center justify-center lg:justify-start"
            >
              <a
                href="https://github.com/Amandaafonsecaa"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-300 hover:-translate-y-1"
              >
                <FaGithub className="text-white text-5xl group-hover:text-[#ffd230] transition-all duration-300" />
              </a>

              <a
                href="https://www.linkedin.com/in/amanda-fonseca-b4189426b/"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-300 hover:-translate-y-1"
              >
                <FaLinkedin className="text-white text-5xl group-hover:text-[#ffd230] transition-all duration-300" />
              </a>

              <a
                href="https://wa.me/5588994865035"
                target="_blank"
                rel="noopener noreferrer"
                className="group transition-all duration-300 hover:-translate-y-1"
              >
                <FaWhatsapp className="text-white text-5xl group-hover:text-[#ffd230] transition-all duration-300" />
              </a>

              <a
                href="mailto:amandafonsecarod09@gmail.com"
                className="group transition-all duration-300 hover:-translate-y-1"
              >
                <MdEmail className="text-white text-5xl group-hover:text-[#ffd230] transition-all duration-300" />
              </a>
            </motion.div>
          </motion.div>

          {/* IMAGEM DIREITA - POLAROID */}
          <motion.div
            className="flex-1 flex items-center justify-center lg:justify-end lg:pr-10 mt-10 lg:mt-0"
            variants={rightItem}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <motion.img
              src={Polaroid}
              alt="Polaroid"
              className="w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] object-contain cursor-pointer"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}