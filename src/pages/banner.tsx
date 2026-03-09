import { motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import foto from "../assets/foto_me.png";
import Button from "../component/Button";

export default function Banner() {
  const { t, i18n } = useTranslation();

  const isEN = i18n.language === "en";
  const toggleLanguage = () => i18n.changeLanguage(isEN ? "pt-BR" : "en");

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemUp: Variants = {
    hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const bigTitle: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden mx-auto">

      {/* ── Botão de idioma — canto superior direito ── */}
      <motion.div
        className="absolute top-6 right-6 z-50"
        initial={{ opacity: 0, y: -8 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.8, duration: 0.5, ease: "easeOut" },
        }}
      >
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-black/20 bg-white/60 backdrop-blur-sm hover:bg-[#ffd230] hover:border-[#ffd230] transition-all duration-300 text-sm font-bold tracking-widest text-black/70 hover:text-black"
        >
          <span className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${isEN ? "bg-black" : "bg-black/25"}`} />
            EN
          </span>
          <span className="text-black/25">|</span>
          <span className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full transition-colors duration-300 ${!isEN ? "bg-black" : "bg-black/25"}`} />
            PT
          </span>
        </button>
      </motion.div>

      {/* Conteúdo principal com stagger */}
      <motion.section
        className="relative z-19 flex flex-col items-center pt-24 sm:pt-28 md:pt-32"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Top line: "eu sou" mais próximo e parecido em tamanho com "desenvolvedora" */}
        <motion.div
          className="flex items-center justify-center gap-2 sm:gap-3 absolute inset-x-0 top-[22%] sm:top-[20%] md:top-[18%] font-title text-[8vw] sm:text-[7vw] md:text-[4vw] z-20 italic px-4"
          variants={itemUp}
        >
          <span>{t("hero.smallLeft")}</span>
          <span>{t("hero.smallRight")}</span>
        </motion.div>

        {/* Foto */}
        <motion.div className="relative" variants={itemUp}>
          <img
            src={foto}
            className="relative z-10 w-full max-w-[280px] sm:max-w-[360px] md:max-w-[480px] lg:max-w-[700px]"
            alt="Photo of the developer"
          />
        </motion.div>
      </motion.section>

      {/* Título grande atrás */}
      <motion.section
        className="flex items-center justify-center px-4"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.h1
          className="font-impact text-[11vw] sm:text-[8vw] md:text-[5vw] text-[#ffd230] z-0 absolute inset-x-0 top-1/2 -translate-y-1/2 text-center leading-none"
          variants={bigTitle}
        >
          {t("hero.big")}
        </motion.h1>
      </motion.section>

      {/* Botão CV + subtitle */}
      <motion.section
        className="z-20 bottom-10 md:bottom-16 left-0 right-0 mx-auto absolute flex flex-col items-center justify-center px-4 text-center"
        initial={{ opacity: 0, y: 14 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        <Button
          text={t("hero.cta")}
          onClick={() => {
            const link = document.createElement("a");
            link.href = "/cv/cv_amanda_en.pdf";
            link.download = "Amanda_Fonseca_CV.pdf";
            link.click();
          }}
        />
        <motion.p className="mt-4 text-black/70 text-xs sm:text-sm tracking-[0.22em]">
          {t("hero.subtitle")}
        </motion.p>
      </motion.section>

    </section>
  );
}