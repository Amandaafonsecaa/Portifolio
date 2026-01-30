import HoverCard from "../component/HoverCard";
import vetCareImg from "../assets/vetcare.png";
import zeusImg from "../assets/zeus.png";
import prismaImg from "../assets/prisma.png";
import uniquadraImg from "../assets/uniquadra.png";
import proforma from "../assets/proforma.png";
import i from "../assets/icon/i.png"

export default function Projects() {
  return (
    <section className="flex  justify-center">
      <section className="flex-1 font-impact text-6xl">
        <section>
          <h1>HOW CAN </h1>
          <img src={i} alt="" />
        </section>
        <h1>HELP YOU?</h1>
      </section>
      <section className=" flex-1 grid grid-cols-1 w-full gap-8 max-w-2xl mx-auto p-6 justify-center">
        <HoverCard
          title="UniQuadra"
          category="Serviços Universitários"
          image={uniquadraImg}
          tags={["React", "Framer Motion", "UI Design"]}
        />
        <HoverCard
          title="VetCare ERP"
          category="Gestão Veterinária"
          image={vetCareImg}
          tags={["React", "Node.js", "Sequelize"]}
        />

        <HoverCard
          title="Zeus"
          category="Finanças Pet"
          image={zeusImg}
          tags={["React", "MongoDB", "Node.js"]}
        />

        <HoverCard
          title="Prisma"
          category="Pesquisa Acadêmica"
          image={prismaImg}
          tags={["Lógica", "MySQL", "React"]}
        />

        <HoverCard
          title="Proforma"
          category="Landing Page"
          image={proforma}
          tags={["HTML", "CSS", "UI Design"]}
        />
      </section>
    </section>
  );
}
