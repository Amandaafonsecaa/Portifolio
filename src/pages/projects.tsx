import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import vetCareImg from "../assets/vetcare.png";
import zeusImg from "../assets/zeus.png";
import prismaImg from "../assets/prisma-fullscreen.png";
import uniquadraImg from "../assets/uniquadra.png";

const projects = [
  { title: "UniQuadra", key: "uniquadra", image: uniquadraImg, tags: "React · Motion · Product Design", number: "01", repo: "https://github.com/Amandaafonsecaa/UniQuadra" },
  { title: "VetCare", key: "vetcare", image: vetCareImg, tags: "React · Node.js · Sequelize", number: "02", repo: "https://github.com/Amandaafonsecaa/PetShop" },
  { title: "Zeus", key: "zeus", image: zeusImg, tags: "React · MongoDB · Node.js", number: "03", repo: "https://github.com/Amandaafonsecaa/Zeus-Web" },
  { title: "Prisma", key: "prisma", image: prismaImg, tags: "Research · MySQL · React", number: "04", repo: null },
];

export default function Projects() {
  const { t } = useTranslation();
  return <section id="projetos" className="projects-section">
    <div className="projects-heading"><span className="section-index">02 — {t("projectsShowcase.label")}</span><h2>{t("projectsShowcase.title1")}<br /><em>{t("projectsShowcase.title2")}</em></h2></div>
    <div className="project-grid">{projects.map((project, index) => <motion.article className="project-card" key={project.title} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .65, delay: index * .06 }}>
      <span className="project-number">{project.number}</span>
      <div className="project-copy"><h3>{project.title}</h3><p>{t(`projects.${project.key}.category`)}</p><small>{project.tags}</small><div className="project-repository">{project.repo ? <a href={project.repo} target="_blank" rel="noopener noreferrer">{t("projectsShowcase.github")} <span>↗</span></a> : <span>{t("projectsShowcase.private")}</span>}</div></div>
      <div className="project-thumbnail"><img src={project.image} alt={`Interface do projeto ${project.title}`} /></div>
      <i className="project-arrow" aria-hidden="true">{project.repo ? "↗" : "—"}</i>
    </motion.article>)}</div>
  </section>;
}
