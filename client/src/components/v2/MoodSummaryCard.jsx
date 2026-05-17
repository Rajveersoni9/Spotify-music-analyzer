import { motion } from 'framer-motion';

const MoodSummaryCard = ({ averages }) => {
  if (!averages) return null;

  const badges = [];
  if (averages.avgEnergy > 0.7) badges.push({ text: 'High Energy', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' });
  if (averages.avgValence > 0.6) badges.push({ text: 'Positive', color: 'text-green-400 bg-green-400/10 border-green-400/20' });
  if (averages.avgValence < 0.4) badges.push({ text: 'Moody', color: 'text-blue-400 bg-blue-400/10 border-blue-400/20' });
  if (averages.avgDanceability > 0.7) badges.push({ text: 'Danceable', color: 'text-pink-400 bg-pink-400/10 border-pink-400/20' });
  if (averages.avgAcousticness > 0.5) badges.push({ text: 'Acoustic', color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' });

  return (
    <div className="bg-gradient-to-br from-[#282828] to-[#181818] rounded-3xl p-6 border border-white/5 h-full flex flex-col justify-between min-h-[200px]">
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Quick Summary</h3>
        <p className="text-xl lg:text-2xl font-bold text-white mb-6 leading-tight">
          Your rotation is leaning towards {badges.length > 0 ? badges[0].text.toLowerCase() : 'balanced'} and highly immersive tracks.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {badges.map((badge, idx) => (
          <motion.span 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            key={idx} 
            className={`px-3 py-1 text-xs font-semibold rounded-full border ${badge.color}`}
          >
            {badge.text}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default MoodSummaryCard;
