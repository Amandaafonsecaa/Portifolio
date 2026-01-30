import Github from "../assets/icon/github.png";
import Linkedin from "../assets/icon/linkedin.png";
import Zap from "../assets/icon/whatsapp.png";
import Gmail from "../assets/icon/email.png";
import Polaroid from "../assets/polaroid.png";

export default function KnowMe() {
  return (
    <div className="relative h-full w-full bg-white">
      <div className="absolute pointer-events-none bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] "></div>
      <section className="relative">
        <section className="flex">
          <div className="bg-[#ffd230] flex-1 p-5 rounded-r-full">
            <h2 className="font-title text-6xl md:text-5xl italic">
              know me better ;)
            </h2>
          </div>
          <div className="flex-1"> </div>
        </section>
        <section className="flex">
          <div className="grid grid-cols-2 flex-1 m-22">
            {/* GitHub */}
            <a
              href="https://github.com/SEU_USUARIO"
              target="_blank"
              rel="noopener noreferrer"
              className="group transition-all flex items-center justify-center duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <img
                className="w-20 object-contain group-hover:scale-110 transition-transform duration-300"
                src={Github}
                alt="GitHub"
              />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/SEU_PERFIL"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <img
                className="w-20 object-contain group-hover:scale-110 transition-transform duration-300"
                src={Linkedin}
                alt="LinkedIn"
              />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/5585999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <img
                className="w-20 object-contain group-hover:scale-110 transition-transform duration-300"
                src={Zap}
                alt="WhatsApp"
              />
            </a>

            {/* Gmail */}
            <a
              href="mailto:seuemail@gmail.com"
              className="group flex items-center justify-center transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
              <img
                className="w-20 object-contain group-hover:scale-110 transition-transform duration-300"
                src={Gmail}
                alt="Email"
              />
            </a>
          </div>
          <div className="flex-1 items-center justify-end">
            <img className="w-100 " src={Polaroid} alt="" />
          </div>
        </section>
      </section>
    </div>
  );
}
