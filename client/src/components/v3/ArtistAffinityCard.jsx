import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100 } }
};

const ArtistAffinityCard = ({ artists }) => {
  if (!artists || artists.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="p-8 rounded-[2.5rem] bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] group-hover:bg-emerald-500/10 transition-colors duration-700" />
      <h3 className="text-xl font-black text-white mb-2 flex items-center gap-3 relative z-10">
        <span className="w-2 h-6 rounded-full bg-emerald-500" />
        Artist Affinity
      </h3>
      <p className="text-sm text-neutral-400 mb-8 font-medium relative z-10">Your most played artists</p>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-6 relative z-10"
      >
        {artists.map((artist, idx) => {
          const percentage = Math.max(10, 100 - (idx * 15));
          
          return (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 10 }}
              className="flex items-center gap-5 p-3 -mx-3 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="relative">
                <img 
                  src={artist.image || artist.images?.[0]?.url || 'https://via.placeholder.com/150'} 
                  alt={artist.name} 
                  className="w-14 h-14 rounded-full object-cover border border-white/10 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-black flex items-center justify-center border border-white/10 text-xs font-bold text-emerald-400">
                  {idx + 1}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-white font-bold truncate text-lg tracking-tight">{artist.name}</h4>
                  <span className="text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">{percentage}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-800/50 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3 + (idx * 0.1), ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default ArtistAffinityCard;
