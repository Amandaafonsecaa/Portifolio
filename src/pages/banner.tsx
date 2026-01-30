import foto from "../assets/sorrindo-comcor.png"
import Button from "../component/Button";

export default function Banner(){
    return(
        <section className="relative w-full h-screen overflow-hidden mx-auto">
           <section className="relative z-19 flex flex-col items-center">
                <div className="flex gap-40 absolute top-40 font-title text-5xl md:text-7xl z-20 italic">
                    <span>i'm</span>
                    <span className="opacity-0">L</span>
                    <span>a</span>
                </div>
                <div className="relative">
                    <img src={foto} className="relative w-[700px] z-10" alt="Foto da desenvolvedora" />
                </div>
            </section>
            <section className="flex items-center justify-center">
                <h1 className="font-impact text-[5vw] text-[#ffd230] z-0 top-60 absolute" >DEVEL
                    <span className="opacity-0">L</span>
                    LLLOPER</h1>
            </section>  
            <section className="z-20 bottom-15 left-0 right-0 mx-auto absolute flex justify-center">
                <Button 
                text="TALK TO ME"
                onClick={() => alert("Oi")}
                />
            </section>
        </section>
    )
}