import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const InsightBanner = ({ moodLabel }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-5 flex items-center gap-4"
    >
      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
        <Sparkles className="w-5 h-5 text-green-400" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-white mb-1">AI Generated Insight</h4>
        <p className="text-sm text-gray-400">
          Based on your recent listening, you seem to use music to enhance your 
          <span className="text-green-400 font-semibold mx-1">{moodLabel?.split(' ')[0] || 'current'}</span> 
          state of mind rather than change it.
        </p>
      </div>
    </motion.div>
  );
};

export default InsightBanner;
