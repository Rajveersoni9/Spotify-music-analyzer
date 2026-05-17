import { motion } from 'framer-motion';

const EraBreakdownCard = ({ breakdown }) => {
  if (!breakdown) return null;

  const eras = [
    { label: '2000s', value: breakdown['2000s'] || 0, color: 'from-blue-500 to-indigo-500', shadow: 'rgba(59,130,246,0.5)' },
    { label: '2010s', value: breakdown['2010s'] || 0, color: 'from-purple-500 to-pink-500', shadow: 'rgba(168,85,247,0.5)' },
    { label: '2020s', value: breakdown['2020s'] || 0, color: 'from-green-400 to-emerald-600', shadow: 'rgba(52,211,153,0.5)' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="p-8 rounded-[2.5rem] bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] group-hover:bg-blue-500/10 transition-colors duration-700" />
      <h3 className="text-xl font-black text-white mb-2 flex items-center gap-3 relative z-10">
        <span className="w-2 h-6 rounded-full bg-blue-500" />
        Era Breakdown
      </h3>
      <p className="text-sm text-neutral-400 mb-8 font-medium relative z-10">Time travel through your library</p>

      <div className="space-y-7 relative z-10">
        {eras.map((era, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + (idx * 0.1), type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02 }}
            className="group/item cursor-pointer"
          >
            <div className="flex justify-between items-end mb-3">
              <span className="text-white font-bold text-lg group-hover/item:text-white/80 transition-colors">{era.label}</span>
              <span className="text-2xl font-black text-neutral-500 group-hover/item:text-white transition-colors">{era.value}%</span>
            </div>
            <div className="w-full h-3 bg-neutral-800/50 border border-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${era.value}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3 + (idx * 0.2), ease: "easeOut" }}
                className={`h-full bg-gradient-to-r ${era.color} rounded-full`}
                style={{ boxShadow: `0 0 10px ${era.shadow}` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default EraBreakdownCard;
