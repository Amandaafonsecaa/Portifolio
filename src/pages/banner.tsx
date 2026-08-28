import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import foto from "../assets/foto_me.png";

export default function Banner() {
  const { t, i18n } = useTranslation();
  const { scrollYProgress } = useScroll();
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -55]);
  const isEN = i18n.language.startsWith("en");
  const cvUrl = `${import.meta.env.BASE_URL}cv/Amanda_Fonseca_Curriculo.pdf`;

  return (
    <section id="inicio" className="hero-shell">
      <div className="hero-glow" />
      <nav className="topbar" aria-label="Navegação principal">
        <a href="#inicio" className="brand" aria-label="Amanda Fonseca, início">AF<span>.</span></a>
        <div className="nav-links"><a href="#projetos">{t("nav.projects")}</a><a href="#expertise">{t("nav.expertise")}</a><a href="#trajetoria">{t("nav.journey")}</a><a href="#sobre">{t("nav.about")}</a></div>
        <div className="language-pill" role="group" aria-label="Selecionar idioma">
          <button type="button" aria-pressed={!isEN} className={!isEN ? "active" : ""} onClick={() => i18n.changeLanguage("pt-BR")}>PT</button>
          <span aria-hidden="true" />
          <button type="button" aria-pressed={isEN} className={isEN ? "active" : ""} onClick={() => i18n.changeLanguage("en")}>EN</button>
        </div>
      </nav>
      <div className="hero-copy">
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }} className="eyebrow">{t("portfolioHero.eyebrow")}</motion.p>
        <motion.h1 style={{ y: titleY }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: [0.22, 1, 0.36, 1] }}>{t("portfolioHero.line1")}<br />{t("portfolioHero.line2")} <em>{t("portfolioHero.highlight")}</em></motion.h1>
        <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .65, duration: .7 }}>{t("portfolioHero.description")}</motion.p>
        <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .8 }}><a className="primary-action" href="#projetos">{t("portfolioHero.projectsCta")} <span>↘</span></a><a className="secondary-action" href={cvUrl} download="Amanda_Fonseca_CV.pdf">{t("portfolioHero.cvCta")}</a></motion.div>
      </div>
      <motion.div className="hero-portrait" style={{ y: photoY }} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .25, duration: 1 }}><img src={foto} alt="Amanda Fonseca" /></motion.div>
      <div className="scroll-cue"><span /> {t("portfolioHero.explore")}</div>
    </section>
  );
}
