import { motion } from "framer-motion";

import Github from "../assets/icon/github.png";
import Linkedin from "../assets/icon/linkedin.png";
import Zap from "../assets/icon/whatsapp.png";
import Gmail from "../assets/icon/email.png";
import Polaroid from "../assets/polaroid.png";

export default function KnowMe() {
  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* Fundo grid */}
      <div className="absolute pointer-events-none inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="relative z-10 max-w-7xl ">
        {/* Header */}
        <section className="flex">
          <div className="bg-[#ffd230] flex-1 p-6 rounded-r-full">
            <h2 className="font-title text-6xl md:text-5xl italic">
              know me better ;)
            </h2>
          </div>
          <div className="flex-1" />
        </section>

        {/* Conteúdo */}
        <section className="flex items-center">
          {/* LINKS */}
          <div className="grid grid-cols-2 gap-12 flex-1 p-20">
            <a
              href="https://github.com/SEU_USUARIO"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center transition-all duration-300 hover:-translate-y-2"
            >
              <img
                className="w-20 object-contain group-hover:scale-110 transition-transform duration-300"
                src={Github}
                alt="GitHub"
              />
            </a>

            <a
              href="https://linkedin.com/in/SEU_PERFIL"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center transition-all duration-300 hover:-translate-y-2"
            >
              <img
                className="w-20 object-contain group-hover:scale-110 transition-transform duration-300"
                src={Linkedin}
                alt="LinkedIn"
              />
            </a>

            <a
              href="https://wa.me/5585999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center transition-all duration-300 hover:-translate-y-2"
            >
              <img
                className="w-20 object-contain group-hover:scale-110 transition-transform duration-300"
                src={Zap}
                alt="WhatsApp"
              />
            </a>

            <a
              href="mailto:seuemail@gmail.com"
              className="group flex items-center justify-center transition-all duration-300 hover:-translate-y-2"
            >
              <img
                className="w-20 object-contain group-hover:scale-110 transition-transform duration-300"
                src={Gmail}
                alt="Email"
              />
            </a>
          </div>

          {/* IMAGEM DIREITA */}
          <div className="flex-1 flex items-center justify-end pr-20">
            <motion.img
              src={Polaroid}
              alt="Polaroid"
              className="w-[380px] object-contain cursor-pointer"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </section>
      </div>
    </section>
  );
}
