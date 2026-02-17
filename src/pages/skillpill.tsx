import { motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Skill() {
  const { t } = useTranslation();

  const hardSkills = [
    t("skills.stack.react"),
    t("skills.stack.node"),
    t("skills.stack.spring"),
    t("skills.stack.fullstack"),
    t("skills.stack.uiux"),
  ];

  const softSkills = [
    t("skills.soft.organization"),
    t("skills.soft.adaptability"),
    t("skills.soft.communication"),
    t("skills.soft.critical"),
  ];

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const title: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-[500px] w-full bg-black overflow-hidden py-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      {/* TÍTULO */}
      <motion.div
        className="relative z-10 text-center mb-16"
        variants={title}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-white font-impact text-5xl uppercase tracking-tighter">
          {t("skills.titleMain")}{" "}
          <span className="text-[#ffd230] font-sans normal-case italic">
            {t("skills.titleHighlight")}
          </span>{" "}
          {t("skills.titleEnd")}
        </h2>
      </motion.div>

      {/* SKILLS */}
      <motion.div
        className="relative z-10 flex flex-wrap justify-center gap-x-3 gap-y-6 max-w-6xl mx-auto px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {hardSkills.map((skill, index) => (
          <motion.div
            key={`hard-${index}`}
            variants={item}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.5}
            whileHover={{ scale: 1.05 }}
            animate={{ rotate: index % 2 === 0 ? 3 : -4 }}
            whileDrag={{ scale: 1.1, rotate: 0, zIndex: 100 }}
            className="px-5 py-2 bg-white rounded-full cursor-grab active:cursor-grabbing text-black font-bold border border-gray-200 shadow-sm whitespace-nowrap"
          >
            {skill}
          </motion.div>
        ))}

        <div className="w-full h-0" />

        {softSkills.map((skill, index) => (
          <motion.div
            key={`soft-${index}`}
            variants={item}
            drag
            whileHover={{
              backgroundColor: "#ffd230",
              color: "#000",
              scale: 1.05,
            }}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.5}
            animate={{ rotate: index % 2 === 0 ? -3 : 5 }}
            whileDrag={{ scale: 1.1, rotate: 0, zIndex: 100 }}
            className="px-6 py-2 border-2 border-[#ffd230] rounded-full cursor-grab active:cursor-grabbing text-[#ffd230] font-medium shadow-md whitespace-nowrap"
          >
            {skill}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}