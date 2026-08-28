interface CardProps {
  year: string;
  title?: string;
  institution: string;
  description: string;
}

export default function Card({ year, title, institution, description }: CardProps) {
  return (
    /* 1. Troque bg-gray-100 por bg-white sólido e adicione shadow-md */
    <div className="bg-white border border-gray-100 rounded-xl p-4 mb-4 shadow-md relative z-20">
      
      <div className="relative border-l-2 border-gray-200 pl-8 pb-4 last:pb-0 last:border-transparent">
        {/* O Pingo da Linha do Tempo */}
        <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-[#ffd230] border-4 border-white" />
        
        <p className="text-sm text-gray-400 font-mono mb-1">{year}</p>
        <p className="text-lg font-bold text-gray-900">{title}</p>
        <p className="text-[#ffd230] font-semibold text-sm mb-2">{institution}</p>
        <p className="text-gray-600 text-sm">{description}</p>
        
        
      </div>
    </div>
  );
}
