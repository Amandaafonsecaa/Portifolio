import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import TiltedGridHero, { type TiltedGridProject } from "../component/TiltedGridHero";
import vetCareImg from "../assets/vetcare.png";
import zeusImg from "../assets/zeus.png";
import prismaImg from "../assets/prisma-fullscreen.png";
import uniquadraImg from "../assets/uniquadra.png";

const projects = [
  { title: "UniQuadra", key: "uniquadra", image: uniquadraImg, tags: ["React", "Motion", "Product Design"], repo: "https://github.com/Amandaafonsecaa/UniQuadra" },
  { title: "VetCare", key: "vetcare", image: vetCareImg, tags: ["React", "Node.js", "Sequelize"], repo: "https://github.com/Amandaafonsecaa/PetShop" },
  { title: "Zeus", key: "zeus", image: zeusImg, tags: ["React", "MongoDB", "Node.js"], repo: "https://github.com/Amandaafonsecaa/Zeus-Web" },
  { title: "Prisma", key: "prisma", image: prismaImg, tags: ["Research", "MySQL", "React"], repo: null },
];

export default function Projects() {
  const { t } = useTranslation();
  const items: TiltedGridProject[] = projects.map((project) => ({
    src: project.image,
    title: project.title,
    description: t(`projects.${project.key}.category`),
    tags: project.tags,
    href: project.repo,
  }));

  return <section id="projetos" className="projects-section">
    <div className="projects-heading"><span className="section-index">02 — {t("projectsShowcase.label")}</span><h2>{t("projectsShowcase.title1")}<br /><em>{t("projectsShowcase.title2")}</em></h2></div>
    <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .8 }}>
      <TiltedGridHero items={items} linkLabel={t("projectsShowcase.github")} privateLabel={t("projectsShowcase.private")} tileHeight={44} axis={50} className="h-[340px] w-full sm:h-[460px]" />
      {/* a faixa é decorativa (aria-hidden); leitores de tela e teclado usam esta lista */}
      <ul className="sr-only" aria-label={t("projectsShowcase.galleryLabel")}>
        {projects.map((project) => <li key={project.key}>{project.repo ? <a href={project.repo} target="_blank" rel="noopener noreferrer">{project.title} — {t("projectsShowcase.github")}</a> : `${project.title} — ${t("projectsShowcase.private")}`}</li>)}
      </ul>
    </motion.div>
  </section>;
}
