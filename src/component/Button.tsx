interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "filled"  | "outline";
}

export default function Button({ text, onClick, variant }: ButtonProps) {
  const baseClasses = `
    relative group overflow-hidden text-white
    py-3 px-14 rounded-full font-bold text-base
    backdrop-blur-md transition-all duration-300
    shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
    hover:scale-105 active:scale-95
  `;

  const filledClasses = `
    bg-[#ffd230] text-black
    border border-white/10
    hover:shadow-[0_0_20px_rgba(255,210,48,0.4)]
  `;

  const outlineClasses = `
    bg-transparent text-[#ffd230]
    border border-[#ffd230]
    hover:bg-[#ffd230]/10
    hover:shadow-[0_0_20px_rgba(255,210,48,0.25)]
  `;

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${
        variant === "filled" ? filledClasses : outlineClasses
      }`}
    >
      {/* Brilho de fundo — só faz sentido no filled */}
      {variant === "filled" && (
        <div className="absolute inset-0 bg-linear-to-tr from-[#ffd230]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      )}

      <span className="relative z-10 drop-shadow-md">
        {text}
      </span>
    </button>
  );
}
