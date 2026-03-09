import { motion, type Variants } from "framer-motion";
import HoverCard from "../component/HoverCard";
import vetCareImg from "../assets/vetcare.png";
import zeusImg from "../assets/zeus.png";
import prismaImg from "../assets/prisma.png";
import uniquadraImg from "../assets/uniquadra.png";
import proforma from "../assets/proforma.png";
import Button from "../component/Button.tsx"
import { useTranslation } from "react-i18next";

export default function Projects() {
  const { t } = useTranslation(); // SEMPRE usar sem namespace, igual no Banner!
  
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.10, delayChildren: 0.12 },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <section className="w-full min-h-screen pb-5 px-6 pt-20 md:pt-28 lg:pt-32">
      <section className="flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:min-h-screen">
        {/* ESQUERDA */}
        <motion.section
          className="flex-[1] w-full text-2xl sm:text-3xl text-center lg:text-left"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          <section className="flex flex-col items-center lg:items-start justify-center">
              <section className="flex items-center gap-3 justify-center lg:justify-start">
              <h2 className="font-sans font-thin text-[#545454]">
                {t("projects.headlineStart")} <span className="font-impact text-[#ffd230] underline decoration-[#ffd230]">
                  {t("projects.headlineHighlight")}
              </span> {t("projects.headlineEnd")}
              </h2>
            </section>
            <section className="pt-8 flex items-center justify-center lg:justify-start">
              <Button text={t("projects.cta")} variant="filled" onClick={() => alert("Oi")} />
            </section>
          </section>
           
        </motion.section>

        {/* DIREITA */}
        <section className="flex-[2] w-full">
          <section className="relative rounded-3xl lg:rounded-l-[32px] bg-black px-4 sm:px-6 py-10 lg:py-20 max-h-full lg:max-h-[calc(100vh-80px)] overflow-y-visible lg:overflow-y-auto overflow-x-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

            <motion.div
              className="relative z-10 grid grid-cols-1 gap-8"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              <motion.div variants={fadeUp}>
                <HoverCard
                  title="UniQuadra"
                  category={t("projects.uniquadra.category")}
                  image={uniquadraImg}
                  tags={["React", "Framer Motion", "UI Design"]}
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <HoverCard
                  title="VetCare"
                  category={t("projects.vetcare.category")}
                  image={vetCareImg}
                  tags={["React", "Node.js", "Sequelize"]}
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <HoverCard
                  title="Zeus"
                  category={t("projects.zeus.category")}
                  image={zeusImg}
                  tags={["React", "MongoDB", "Node.js"]}
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <HoverCard
                  title="Prisma"
                  category={t("projects.prisma.category")}
                  image={prismaImg}
                  tags={["Logic", "MySQL", "React"]}
                />
              </motion.div>

              <motion.div variants={fadeUp}>
                <HoverCard
                  title="Proforma"
                  category={t("projects.proforma.category")}
                  image={proforma}
                  tags={["HTML", "CSS", "UI Design"]}
                />
              </motion.div>
            </motion.div>
          </section>
        </section>
      </section>
    </section>
  );
}