interface CardProps{
    title: string,
    category: string,
    image: string,
    tags: string[]
}

const HoverCard = ({ title, category, image, tags }: CardProps) => {
  return (
    <div className="relative group w-full h-[300px] overflow-hidden rounded-xl bg-gray-900 cursor-pointer  ">
      
      {/* 1. Imagem: object-cover garante que ela preencha o espaço sem distorcer */}
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover object-top transition-all duration-700 brightness-[0.6] group-hover:brightness-[0.25] group-hover:scale-110"
      />

      {/* 2. Overlay de Informações */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 bg-gradient-to-t from-black via-black/40 to-transparent">
        
        <span className="text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase mb-2">
          {category}
        </span>
        
        <h3 className="text-xl font-bold text-white mb-3">
          {title}
        </h3>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="text-[9px] font-medium px-2 py-1 bg-white/10 text-gray-300 rounded  backdrop-blur-md">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 text-[11px] text-white/70 font-bold uppercase tracking-widest hover:text-white transition-colors">
          See solution
        </div>
      </div>
    </div>
  );
};

export default HoverCard;
