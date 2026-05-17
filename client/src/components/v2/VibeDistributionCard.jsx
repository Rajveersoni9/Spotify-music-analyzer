import { motion } from 'framer-motion';
import { Activity, Zap, Coffee, Flame, Music, CloudRain } from 'lucide-react';

const VibeDistributionCard = ({ breakdown }) => {
  if (!breakdown || breakdown.length === 0) return null;

  // Map breakdown to icons and colors
  const vibeConfig = {
    Energetic: { icon: Zap, color: 'bg-yellow-500' },
    Chill: { icon: Coffee, color: 'bg-green-500' },
    Intense: { icon: Flame, color: 'bg-red-500' },
    Groovy: { icon: Music, color: 'bg-purple-500' },
    Melancholic: { icon: CloudRain, color: 'bg-blue-500' }
  };

  return (
    <div className="bg-[#181818] rounded-3xl p-6 border border-white/5 h-full">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Activity className="w-5 h-5 text-spotify-green" />
        Vibe Distribution
      </h3>
      <div className="space-y-5">
        {[...breakdown].sort((a, b) => b.value - a.value).map((vibe, idx) => {
          const config = vibeConfig[vibe.name] || { icon: Activity, color: 'bg-gray-500' };
          const Icon = config.icon;
          return (
            <div key={idx}>
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center gap-2 text-gray-300">
                  <Icon className="w-4 h-4" />
                  <span>{vibe.name}</span>
                </div>
                <span className="font-mono text-gray-400">{vibe.value}%</span>
              </div>
              <div className="w-full bg-[#2a2a2a] rounded-full h-2.5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${vibe.value}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className={`h-full rounded-full ${config.color}`}
                ></motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VibeDistributionCard;
