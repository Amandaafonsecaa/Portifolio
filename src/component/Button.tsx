interface ButtonProps {
  text: string;
  onClick: () => void; 
}

export default function Button({ text, onClick }: ButtonProps) { 
    return (
        <button 
            onClick={onClick} 
            className="
                relative group overflow-hidden
                py-3 px-14 rounded-full font-bold text-white
                bg-[#ffd230] border border-white/10
                backdrop-blur-md transition-all duration-300
                shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
                hover:shadow-[0_0_20px_rgba(255,210,48,0.4)]
                hover:scale-105 active:scale-95
            "
        >
            {/* Brilho de fundo que aparece no hover */}
            <div className="absolute inset-0 bg-linear-to-tr from-[#ffd230]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <span className="relative z-10 drop-shadow-md">
                {text}
            </span>
        </button>
    )
}