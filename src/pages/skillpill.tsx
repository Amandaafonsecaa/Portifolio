import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, type PointerEvent } from "react";
import { useTranslation } from "react-i18next";
import MagneticPill from "../component/MagneticPill";
import RevealText from "../component/RevealText";

const skills = ["React", "TypeScript", "Node.js", "APIs REST", "Java & Spring Boot", "Software Architecture", "AI Agents & RAG", "Product & UX"];
const ease = [0.22, 1, 0.36, 1] as const;

export default function Skill() {
  const { t } = useTranslation();
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const auroraY = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const title = useRef<HTMLHeadingElement>(null);
  const titleInView = useInView(title, { once: true, amount: .5 });

  // o spotlight lê --mx/--my direto do CSS, sem re-render a cada movimento
  const handleMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return <section ref={section} id="expertise" className="capabilities-section" onPointerMove={handleMove}>
    <div className="expertise-light" aria-hidden="true">
      <motion.span className="expertise-aurora" style={{ y: auroraY }} />
      <span className="expertise-spotlight" />
      <span className="expertise-dots" />
    </div>

    <div className="capabilities-intro">
      <motion.span className="section-index" initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: .6, ease }}>01 — {t("expertise.label")}</motion.span>
      <h2 ref={title}>
        <RevealText text={t("expertise.title1")} play={titleInView} />
        <br />
        <em className="expertise-em">
          <RevealText text={t("expertise.title2")} play={titleInView} delay={.25} />
          <svg className="expertise-underline" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
            <motion.path d="M4 14 C 70 4, 150 4, 296 11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, ease, delay: .75 }} />
          </svg>
        </em>
      </h2>
      <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .6 }} transition={{ duration: .8, ease, delay: .45 }}>{t("expertise.description")}</motion.p>
    </div>

    <ul className="skill-cloud">{skills.map((skill, index) => <MagneticPill key={skill} label={skill} index={index} />)}</ul>
  </section>;
}
