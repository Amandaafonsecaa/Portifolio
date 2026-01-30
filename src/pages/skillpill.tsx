import { motion } from "framer-motion";

export default function Skill() {
  const hardSkills = [
    "Generative AI", "React", "Machine Learning", 
    "Fullstack Dev", "Node.js", "TypeScript", "UI/UX"
  ];

  const softSkills = [
    "Problem Solving", "Organization", "Tech Adaptability", 
    "Effective Communication", "Adaptability", "Critical Thinking"
  ];

  return (
    <section className="relative h-auto min-h-[500px] w-full bg-black overflow-hidden py-20">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="relative z-10 text-center mb-16">
        <h2 className="text-white font-impact text-5xl uppercase tracking-tighter">
          My <span className="text-[#ffd230] font-sans normal-case italic">Skills</span> Toolbox
        </h2>
      </div>

      {/* Ajustado: gap-x-3 para ganhar espaço e max-w-6xl para dar mais margem lateral */}
      <div className="relative z-10 flex flex-wrap justify-center gap-x-3 gap-y-6 max-w-6xl mx-auto px-6">
        
        {hardSkills.map((skill, index) => (
          <motion.div
            key={`hard-${index}`}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.5}
            whileHover={{ scale: 1.05 }}
            animate={{ rotate: index % 2 === 0 ? 3 : -4 }}
            whileDrag={{ scale: 1.1, rotate: 0, zIndex: 100 }} 
            // Reduzi levemente o px-5 para caber melhor na linha
            className="px-5 py-2 bg-white rounded-full cursor-grab active:cursor-grabbing text-black font-bold border border-gray-200 shadow-sm whitespace-nowrap"
          >
            {skill}
          </motion.div>
        ))}

        {/* Separador invisível para forçar a quebra se você quiser as soft skills SEMPRE embaixo */}
        <div className="w-full h-0"></div>

        {softSkills.map((skill, index) => (
          <motion.div
            key={`soft-${index}`}
            drag
            whileHover={{ backgroundColor: "#ffd230", color: "#000", scale: 1.05 }}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.5}
            animate={{ rotate: index % 2 === 0 ? -3 : 5 }}
            whileDrag={{ scale: 1.1, rotate: 0, zIndex: 100 }}
            className="px-6 py-2 border-2 border-[#ffd230] rounded-full cursor-grab active:cursor-grabbing text-[#ffd230] font-medium shadow-md whitespace-nowrap"
          >
            {skill}
          </motion.div>
        ))}
      </div>
    </section>
  );
}