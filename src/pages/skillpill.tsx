import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function Skill() {
  const { t } = useTranslation();
  const skills = ["React", "TypeScript", "Node.js", "APIs REST", "Java & Spring Boot", "Software Architecture", "AI Agents & RAG", "Product & UX"];
  return <section id="expertise" className="capabilities-section">
    <motion.div className="capabilities-intro" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .4 }}><span className="section-index">01 — {t("expertise.label")}</span><h2>{t("expertise.title1")}<br /><em>{t("expertise.title2")}</em></h2><p>{t("expertise.description")}</p></motion.div>
    <div className="skill-cloud">{skills.map((skill, index) => <motion.span key={skill} initial={{ opacity: 0, scale: .9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * .06 }} whileHover={{ y: -5 }}>{skill}</motion.span>)}</div>
  </section>;
}
