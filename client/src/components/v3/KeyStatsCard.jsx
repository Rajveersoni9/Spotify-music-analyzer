import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { Clock, Disc3, Users, Compass, Library, Repeat, Info } from 'lucide-react';

const AnimatedCounter = ({ from = 0, to, duration = 2, delay = 0 }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    const controls = animate(from, to, {
      duration: duration,
      delay: delay,
      ease: "easeOut",
      onUpdate(value) {
        setCount(Math.round(value));
      }
    });
    return () => controls.stop();
  }, [from, to, duration, delay]);

  return <>{count}</>;
};

const StatItem = ({ icon, label, value, isPercentage, delay, tooltipText, subtext, watermarkIcon: WatermarkIcon }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
      className="flex flex-col p-5 rounded-3xl bg-white/5 border border-white/5 transition-all duration-300 relative overflow-visible group z-10 hover:z-50"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/0 group-hover:from-green-500/10 group-hover:to-transparent transition-all duration-500 rounded-3xl" />
      
      {/* Watermark Icon to fill empty space */}
      {WatermarkIcon && (
        <div className="absolute -bottom-8 -right-8 text-white/[0.03] group-hover:text-green-500/[0.05] transition-colors duration-500 transform rotate-12 pointer-events-none">
          <WatermarkIcon size={140} strokeWidth={1} />
        </div>
      )}

      {/* Info Button */}
      <div 
        className="absolute top-4 right-4 z-20 text-neutral-500 hover:text-green-400 cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
      >
        <Info size={16} />
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute -top-16 left-0 right-0 z-50 bg-neutral-800 border border-white/10 p-3 rounded-xl shadow-2xl text-[10px] sm:text-xs text-neutral-300 leading-relaxed pointer-events-none"
          >
            {tooltipText}
            {/* Arrow */}
            <div className="absolute -bottom-2 right-4 w-4 h-4 bg-neutral-800 border-b border-r border-white/10 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex items-center gap-2 mb-4 pr-6">
        <div className="p-2 rounded-xl bg-white/5 text-green-400 group-hover:scale-110 group-hover:bg-green-500/20 transition-all duration-300">{icon}</div>
        <span className="text-xs text-neutral-400 font-bold uppercase tracking-widest">{label}</span>
      </div>
      <div className="relative z-10 text-3xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all duration-300">
        {typeof value === 'number' ? (
          <AnimatedCounter to={value} delay={delay + 0.2} />
        ) : (
          value
        )}
        {isPercentage && '%'}
      </div>
      
      {/* Subtext Badge */}
      {subtext && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.5 }}
          className="relative z-10 mt-3 text-[10px] font-bold px-2.5 py-1 rounded-md bg-green-500/10 text-green-400 w-max border border-green-500/20 uppercase tracking-wider drop-shadow-md"
        >
          {subtext}
        </motion.div>
      )}
    </motion.div>
  );
};

const KeyStatsCard = ({ stats }) => {
  if (!stats) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="p-8 rounded-[2.5rem] bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-[80px]" />
      <h3 className="text-xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
        <span className="w-2 h-8 rounded-full bg-green-500" />
        Your Numbers
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 relative z-10">
        <StatItem 
          icon={<Compass size={20} />} 
          label="Discovery" 
          value={stats.discoveryScore || 0} 
          isPercentage={true}
          delay={0.1} 
          tooltipText="Percentage of unique artists across your top tracks. >100% means you listen to a lot of collaborations!"
          subtext="Explorer Status"
          watermarkIcon={Compass}
        />
        <StatItem 
          icon={<Repeat size={20} />} 
          label="Repeat" 
          value={stats.repeatBehavior || 'Low'} 
          isPercentage={false}
          delay={0.2} 
          tooltipText="How often you binge the same artist versus exploring new ones."
          subtext={stats.repeatBehavior === 'High' ? "Loyalist" : "Varied Taste"}
          watermarkIcon={Repeat}
        />
        <StatItem 
          icon={<Users size={20} />} 
          label="Dominance" 
          value={stats.artistDominance || 0} 
          isPercentage={true}
          delay={0.3} 
          tooltipText="The percentage of your top tracks that belong to your absolute favorite artist."
          subtext={stats.artistDominance > 20 ? "Superfan" : "Diverse Rotation"}
          watermarkIcon={Users}
        />
        <StatItem 
          icon={<Disc3 size={20} />} 
          label="Popularity" 
          value={stats.avgPopularity || 0} 
          isPercentage={false}
          delay={0.4} 
          tooltipText="Average mainstream popularity (0-100) of your top tracks according to Spotify's algorithm."
          subtext={stats.avgPopularity > 60 ? "Mainstream" : "Underground"}
          watermarkIcon={Disc3}
        />
        <StatItem 
          icon={<Library size={20} />} 
          label="Genres" 
          value={stats.genreDNALength || 0} 
          isPercentage={false}
          delay={0.5} 
          tooltipText="The number of distinct, unique genres tied to your most listened-to artists."
          subtext="Sonic Palette"
          watermarkIcon={Library}
        />
      </div>
    </motion.div>
  );
};

export default KeyStatsCard;
