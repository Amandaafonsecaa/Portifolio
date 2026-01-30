import { motion, type Variants } from "framer-motion";
import Card from "../component/Card";
import iconAcademic from "../assets/icon/iconAcademic.png";
import iconWork from "../assets/icon/iconWork.png";

const educationData = [
  {
    year: "2023 – Present",
    title: "B.S. in Computer Science",
    institution: "UNIFOR",
    description: "Focusing on AI and Software Architecture.",
  },
  {
    year: "2020 – 2023",
    title: "High School Diploma",
    institution: "IFCE",
    description: "Computer Network.",
  },
];

const workData = [
  {
    year: "2024 – 2025",
    title: "AI Engineering Fellow | Nexus AI",
    institution: "Instituto Atlântico",
    description: "Developing Generative AI agents to article filtering.",
  },
  {
    year: "2025",
    title: "Fullstack Developer | PRISMA",
    institution: "UNIFOR",
    description: "Developed a platform for Neuromarketing research and IAT testing.",
    link: "#",
  },
  {
    year: "2021 – 2022",
    title: "Scientific Research Fellow | PIBIC Jr.",
    institution: "IFCE",
    description: "Machine Learning techniques for intrusion detection in IoT environments.",
    link: "#",
  },
];

export default function Formation() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  const list: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.10, delayChildren: 0.05 },
    },
  };

  return (
    <section className="relative w-full min-h-screen bg-white py-20">
      {/* Fundo */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_90%_98%_at_7%_0%,#000_70%,transparent_110%)]" />

      <div className="relative z-10 flex flex-col items-center max-w-6xl mx-auto px-6">
        {/* Microtítulo */}
        <motion.p
          className="text-center text-gray-400 uppercase tracking-widest text-xs mb-3"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          Education & Work
        </motion.p>

        {/* Título */}
        <motion.h1
          className="text-black text-center font-impact text-5xl uppercase leading-none mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          My{" "}
          <span className="text-[#ffd230] font-sans normal-case font-thin">
            Academic and <br /> Professional
          </span>{" "}
          Journey
        </motion.h1>

        {/* Colunas */}
        <motion.section
          className="flex flex-col md:flex-row items-start gap-8 w-full"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.18 } },
          }}
        >
          {/* EDUCAÇÃO */}
          <motion.div className="flex-1 w-full" variants={fadeUp}>
            <div className="flex items-center justify-center gap-4 mb-12">
              <img src={iconAcademic} className="w-14 h-14 object-contain" alt="" />
            </div>

            <motion.div
              className="space-y-0"
              variants={list}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {educationData.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Card {...item} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* TRABALHO */}
          <motion.div className="flex-1 w-full" variants={fadeUp}>
            <div className="flex items-center justify-center gap-4 mb-14">
              <img src={iconWork} className="w-12 h-12 object-contain" alt="" />
            </div>

            <motion.div
              className="space-y-0"
              variants={list}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {workData.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <Card {...item} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </section>
  );
}
