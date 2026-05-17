import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#22c55e', '#16a34a', '#15803d', '#166534', '#14532d'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black/90 border border-white/10 p-4 rounded-2xl backdrop-blur-xl shadow-[0_0_20px_rgba(34,197,94,0.2)]">
        <p className="text-white font-bold mb-1">{payload[0].name}</p>
        <p className="text-green-400 text-sm font-medium">{payload[0].value} artists</p>
      </div>
    );
  }
  return null;
};

const GenreDNACard = ({ genreDNA }) => {
  if (!genreDNA || genreDNA.length === 0) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="p-8 rounded-[2.5rem] bg-black/40 border border-white/10 backdrop-blur-xl shadow-2xl flex flex-col h-full relative overflow-hidden"
    >
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-[80px]" />
      
      <h3 className="text-xl font-black text-white mb-2 flex items-center gap-3 relative z-10">
        <span className="w-2 h-6 rounded-full bg-green-500" />
        Genre DNA
      </h3>
      <p className="text-sm text-neutral-400 mb-8 font-medium relative z-10">The sonic foundation of your library</p>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: "spring" }}
        className="flex-1 min-h-[250px] relative z-10"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={genreDNA}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              animationBegin={200}
              animationDuration={1500}
            >
              {genreDNA.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} cursor={false} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center bg-black/50 w-24 h-24 rounded-full flex flex-col items-center justify-center border border-white/5 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <span className="block text-3xl font-black text-white">{genreDNA.length}</span>
            <span className="block text-[10px] font-bold tracking-widest text-green-400 uppercase">Top</span>
          </div>
        </div>
      </motion.div>
      
      <div className="mt-6 flex flex-wrap gap-3 justify-center relative z-10">
        {genreDNA.map((genre, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + (idx * 0.1) }}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
            className="flex items-center gap-2 text-xs font-bold text-neutral-300 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full cursor-pointer transition-colors"
          >
            <div className="w-2.5 h-2.5 rounded-full shadow-[0_0_5px_rgba(34,197,94,0.5)]" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
            {genre.name}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default GenreDNACard;
