import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

const ListeningInsightsCard = ({ insights }) => {
  if (!insights || insights.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="p-8 rounded-[2.5rem] bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-[80px]" />
      
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="p-3 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
          <Lightbulb size={24} className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
        </div>
        <h3 className="text-xl font-black text-white">Listening Insights</h3>
      </div>
      
      <div className="space-y-4 relative z-10">
        {insights.map((insight, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + (idx * 0.1), type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02, x: 10 }}
            className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-white/5 to-transparent border border-white/5 hover:from-white/10 hover:border-white/10 cursor-pointer transition-all duration-300 group"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-[0_0_10px_rgba(250,204,21,0.8)] group-hover:scale-150 transition-transform duration-300"></div>
            <span className="text-white font-bold tracking-wide group-hover:text-yellow-400 transition-colors duration-300">{insight}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ListeningInsightsCard;
