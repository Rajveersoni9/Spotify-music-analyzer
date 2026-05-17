import { motion } from 'framer-motion';

const MoodHeroCard = ({ moodLabel, moodDescription }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full rounded-3xl overflow-hidden bg-[#181818] border border-white/10 shadow-2xl p-8 lg:p-12"
    >
      {/* Animated Background Gradients */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="text-sm font-bold tracking-widest text-green-400 uppercase mb-4">Your Vibe Right Now</p>
        <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-6">
          {moodLabel || "Analyzing..."}
        </h2>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
          {moodDescription || "Give us a moment while we process your latest listening history."}
        </p>
      </div>

      {/* Decorative Wave/Lines */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#121212]/80 to-transparent pointer-events-none"></div>
    </motion.div>
  );
};

export default MoodHeroCard;
