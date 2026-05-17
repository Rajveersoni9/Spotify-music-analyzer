import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, MapPin, Clock, Ghost, Heart } from 'lucide-react';

const UniqueFeatureModal = ({ isOpen, onClose, feature, data }) => {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (feature) {
      case 'aura-reading':
        return (
          <div className="flex flex-col items-center text-center space-y-4">
            <Sparkles size={48} className="text-purple-400 mb-4" />
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Mystic Aura Reading</h3>
            <p className="text-lg text-neutral-300">
              The cosmic frequencies of your top artists suggest you are going through a phase of profound emotional processing wrapped in high-energy beats. 
              Your musical aura is <span className="font-bold text-white">shimmering magenta</span>.
            </p>
          </div>
        );
      case 'festival':
        return (
          <div className="flex flex-col items-center text-center space-y-4">
            <MapPin size={48} className="text-orange-400 mb-4" />
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">Your Dream Festival</h3>
            <p className="text-lg text-neutral-300">
              If you curated a festival, the headliners would be an absolute fever dream.
            </p>
            <div className="bg-white/5 p-4 rounded-xl w-full border border-white/10">
              <p className="text-xl font-bold text-white mb-2">AURA FEST 2026</p>
              <p className="text-neutral-400">Headlined by:</p>
              <p className="text-2xl font-black text-orange-300 mt-1">
                {data?.topArtists?.[0]?.name || 'Unknown'} & {data?.topArtists?.[1]?.name || 'Unknown'}
              </p>
            </div>
          </div>
        );
      case 'time-machine':
        return (
          <div className="flex flex-col items-center text-center space-y-4">
            <Clock size={48} className="text-blue-400 mb-4" />
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">Sonic Time Machine</h3>
            <p className="text-lg text-neutral-300">
              Your dominant era is the <span className="font-bold text-white">{data?.eraBreakdown?.[0]?.era || '2020s'}</span>.
            </p>
            <p className="text-md text-neutral-400">
              If we sent you back in time, you'd fit right in at a nostalgic basement party playing your top tracks from that decade.
            </p>
          </div>
        );
      case 'alter-ego':
        return (
          <div className="flex flex-col items-center text-center space-y-4">
            <Ghost size={48} className="text-green-400 mb-4" />
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">Musical Alter-Ego</h3>
            <p className="text-lg text-neutral-300">
              While you project a {data?.personality?.title || 'calm'} persona, your underlying beats reveal a secret chaotic alter-ego that thrives on unpredictable genre shifts.
            </p>
          </div>
        );
      case 'vibe-check':
        return (
          <div className="flex flex-col items-center text-center space-y-4">
            <Heart size={48} className="text-red-400 mb-4" />
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-rose-600">Daily Vibe Check</h3>
            <p className="text-lg text-neutral-300">
              Status: <span className="font-bold text-white">Immaculate.</span>
            </p>
            <p className="text-md text-neutral-400">
              Your recent listening patterns indicate high levels of main character energy. Keep streaming.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-neutral-900 border border-white/10 rounded-3xl p-8 max-w-lg w-full relative overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors bg-white/5 rounded-full p-2"
          >
            <X size={20} />
          </button>
          
          <div className="relative z-10 py-4">
            {renderContent()}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UniqueFeatureModal;
