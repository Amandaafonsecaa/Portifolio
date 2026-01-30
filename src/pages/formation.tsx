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
    description:
      "Developing Generative AI agents to article filtering.",
  },
  {
    year: "2025",
    title: "Fullstack Developer | PRISMA",
    institution: "UNIFOR",
    description:
      "Developed a platform for Neuromarketing research and IAT testing.",
    link: "#",
  },
  {
    year: "2021 – 2022",
    title: "Scientific Research Fellow | PIBIC Jr.",
    institution: "IFCE",
    description:
      "Machine Learning techniques for intrusion detection in IoT environments.",
    link: "#",
  },
];
export default function Formation() {
  return (
    <div className="relative w-full min-h-screen bg-white py-20">
      {/* 1. Fundo Isolado */}
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_90%_98%_at_7%_0%,#000_70%,transparent_110%)]"></div>

      {/* 2. Conteúdo em Camada Superior */}
      <div className="relative z-10 flex flex-col items-center max-w-6xl mx-auto px-6">
        <p className="text-center text-gray-400  uppercase tracking-widest text-xs mb-3">Education & Work</p>
        <h1 className="text-black text-center font-impact text-5xl uppercase leading-none mb-16">
          My <span className="text-[#ffd230] font-sans normal-case font-thin">Academic and <br /> Professional</span> Journey
        </h1>

        <section className="flex flex-col md:flex-row items-start gap-8 w-full">
          
          {/* COLUNA EDUCAÇÃO */}
          <div className="flex-1 w-full">
            <div className="flex items-center  justify-center gap-4 mb-12">
              <div className=" flex items-center justify-center ">
                <img src={iconAcademic} className="w-14 h-14 object-contain" alt="" />
              </div>
              
            </div>

            <div className="space-y-0">
              {educationData.map((item, index) => (
                <Card key={index} {...item} />
              ))}
            </div>
          </div>

          {/* COLUNA TRABALHO */}
          <div className="flex-1 w-full">
            <div className="flex items-center justify-center gap-4 mb-14">
              <div className="flex items-center justify-center">
                <img src={iconWork} className="w-12 h-12 object-contain" alt="" />
              </div>
              
            </div>

            <div className="space-y-0">
              {workData.map((item, index) => (
                <Card key={index} {...item} />
              ))}
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}