import { motion, type Variants } from "framer-motion";
import HoverCard from "../component/HoverCard";
import vetCareImg from "../assets/vetcare.png";
import zeusImg from "../assets/zeus.png";
import prismaImg from "../assets/prisma.png";
import uniquadraImg from "../assets/uniquadra.png";
import proforma from "../assets/proforma.png";
import i from "../assets/icon/i.png";

export default function Projects() {
  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.10,
        delayChildren: 0.12,
      },
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
    <section className="flex justify-center items-center min-h-screen pb-16">
      {/* COLUNA ESQUERDA (reveal elegante) */}
      <motion.section
        className="flex-1 text-4xl text-start items-center justify-center text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        <section className="flex items-center gap-3 justify-center">
          <h1 className="font-sans normal-case font-thin text-[#545454]">
            Building digital
          </h1>
          <span className="font-impact text-[#ffd230] underline decoration-[#ffd230]">
            solutions
          </span>
        </section>

        <section className="flex items-center justify-center gap-3">
          <h1 className="font-sans normal-case font-thin text-[#545454]">
            that actually solve
          </h1>
          <span className="font-impact text-[#ffd230] underline decoration-[#ffd230]">
            problems
          </span>
        </section>
      </motion.section>

      {/* COLUNA DIREITA (cards entram em stagger elegante) */}
      <section className="flex-1 w-full max-w-2xl mx-auto">
        <section className="relative rounded-l-[32px] bg-black px-6 py-20 max-h-[calc(100vh-80px)] overflow-y-auto overflow-x-hidden">
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
                category="University Services Platform"
                image={uniquadraImg}
                tags={["React", "Framer Motion", "UI Design"]}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <HoverCard
                title="VetCare ERP"
                category="Veterinary Management System"
                image={vetCareImg}
                tags={["React", "Node.js", "Sequelize"]}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <HoverCard
                title="Zeus"
                category="Pet Finance Management"
                image={zeusImg}
                tags={["React", "MongoDB", "Node.js"]}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <HoverCard
                title="Prisma"
                category="Academic Research Platform"
                image={prismaImg}
                tags={["Logic", "MySQL", "React"]}
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <HoverCard
                title="Proforma"
                category="Landing Page Design"
                image={proforma}
                tags={["HTML", "CSS", "UI Design"]}
              />
            </motion.div>
          </motion.div>
        </section>
      </section>
    </section>
  );
}
