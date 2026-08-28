interface ProgressBarProps {
  label: string;
  percentage: number;
  isAI?: boolean; // Para darmos um brilho especial nas skills de IA
}

import { motion } from "framer-motion";

export default function ProgressBar({ label, percentage }: ProgressBarProps) {
  return (
    <div className="w-full max-w-md mb-6 mt-6">
      <div className="flex justify-between mb-2">
        <span className="text-white text-xs font-bold uppercase">{label}</span>
      </div>
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }} 
          whileInView={{ width: `${percentage}%` }} 
          transition={{ duration: 1.5, ease: "easeOut" }} 
          className={`h-full rounded-full bg-yellow-400 shadow-[0_0_15px_#ffd230]`}
        />
      </div>
    </div>
  );
}