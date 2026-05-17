import { motion } from 'framer-motion';

const LoadingSkeleton = () => {
  return (
    <div className="p-6 md:p-10 pb-24 space-y-8 max-w-[1600px] mx-auto w-full">
      {/* Hero Skeleton */}
      <motion.div 
        className="w-full h-[400px] rounded-[2.5rem] bg-neutral-900/50 border border-white/5 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
      </motion.div>
      
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="col-span-2 h-[450px] rounded-[2.5rem] bg-neutral-900/50 border border-white/5 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </motion.div>
        <motion.div 
          className="col-span-1 h-[450px] rounded-[2.5rem] bg-neutral-900/50 border border-white/5 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <motion.div 
            key={i}
            className="h-[300px] rounded-[2.5rem] bg-neutral-900/50 border border-white/5 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + (i * 0.1), duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
