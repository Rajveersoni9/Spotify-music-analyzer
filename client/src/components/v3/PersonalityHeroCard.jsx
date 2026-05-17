import { motion } from 'framer-motion';
import { Sparkles, Hexagon } from 'lucide-react';

const PersonalityHeroCard = ({ personality }) => {
  if (!personality) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-green-900/40 via-black to-black border border-white/10 p-10 md:p-14 shadow-2xl group"
    >
      {/* Background glow effects */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-500/20 rounded-full blur-[100px] group-hover:bg-green-500/30 transition-all duration-700"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px]"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10"
          >
            <Sparkles size={14} className="text-green-400" />
            <span className="text-xs font-semibold text-green-400 tracking-wider uppercase">Your Music Personality</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-neutral-500 tracking-tight"
          >
            {personality.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed"
          >
            {personality.description}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-3 pt-4"
          >
            {personality.traits?.map((trait, idx) => (
              <span 
                key={idx}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-neutral-300 backdrop-blur-md"
              >
                {trait}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Abstract shape representing personality */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
          className="hidden md:flex relative w-64 h-64 items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-green-500 to-emerald-300 rounded-[2rem] rotate-6 opacity-20 blur-xl"></div>
          <div className="relative w-full h-full bg-gradient-to-tr from-black to-neutral-900 border border-white/10 rounded-[2rem] shadow-2xl flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
             <Hexagon size={100} className="text-green-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]" strokeWidth={1} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PersonalityHeroCard;
