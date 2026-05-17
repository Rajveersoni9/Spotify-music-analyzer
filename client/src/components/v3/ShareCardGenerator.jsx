import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';

const ShareCardGenerator = ({ data }) => {
  const cardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  if (!data) return null;

  const { personality, keyStats, genreDNA, artistAffinity } = data;
  const topArtist = artistAffinity?.[0];
  const topGenres = genreDNA?.slice(0, 3);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#000000',
        logging: false
      });
      
      const link = document.createElement('a');
      link.download = 'my-spotify-personality.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to generate image', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 flex justify-center"
      >
        <button 
          onClick={handleDownload}
          disabled={isGenerating}
          className="flex items-center gap-3 px-8 py-4 bg-white text-black hover:bg-neutral-200 hover:scale-105 rounded-full font-bold transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          {isGenerating ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
          <span>{isGenerating ? 'Generating...' : 'Download Personality Card'}</span>
        </button>
      </motion.div>

      {/* Hidden Card Container for Export */}
      <div style={{ position: 'absolute', top: 0, left: 0, zIndex: -9999, opacity: 0, pointerEvents: 'none' }}>
        <div 
          ref={cardRef} 
          className="w-[1080px] h-[1920px] bg-black text-white p-16 flex flex-col relative overflow-hidden font-sans"
        >
          {/* Background Elements */}
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-green-800/40 blur-[150px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-900/40 blur-[150px]"></div>

          {/* Header */}
          <div className="z-10 flex items-center justify-between mb-24">
            <span className="text-3xl font-bold tracking-tight text-white/50 uppercase">Spotify Music Analyzer</span>
            <span className="text-3xl font-bold tracking-tight text-green-400">2026</span>
          </div>

          {/* Personality Hero */}
          <div className="z-10 flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8 w-max">
              <span className="text-2xl font-bold text-green-400">MY MUSIC PERSONALITY</span>
            </div>
            
            <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-400 leading-tight mb-8">
              {personality?.title}
            </h1>
            
            <p className="text-4xl text-neutral-300 max-w-4xl leading-snug mb-12">
              {personality?.description}
            </p>

            <div className="flex gap-4">
              {personality?.traits?.map((trait, i) => (
                <span key={i} className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 text-2xl font-bold text-white shadow-xl">
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Grid Stats */}
          <div className="z-10 grid grid-cols-3 gap-8 mt-auto pt-16 border-t border-white/20">
            {/* Top Artist */}
            {topArtist && (
              <div className="flex flex-col">
                <span className="text-2xl text-neutral-400 uppercase font-bold tracking-wider mb-8">Top Artist</span>
                <div className="flex items-center gap-6">
                  {topArtist.image && (
                    <img src={topArtist.image} alt={topArtist.name} className="w-32 h-32 rounded-full object-cover border-4 border-green-500 shadow-xl" crossOrigin="anonymous" />
                  )}
                  <span className="text-5xl font-bold text-white break-words">{topArtist.name}</span>
                </div>
              </div>
            )}

            {/* Top Genres */}
            <div className="flex flex-col">
              <span className="text-2xl text-neutral-400 uppercase font-bold tracking-wider mb-8">Sonic DNA</span>
              <div className="flex flex-col gap-4">
                {topGenres?.map((g, i) => (
                  <span key={i} className="text-4xl font-bold text-white">{i + 1}. {g.name}</span>
                ))}
              </div>
            </div>

            {/* Discovery Score */}
            <div className="flex flex-col justify-start">
              <span className="text-2xl text-neutral-400 uppercase font-bold tracking-wider mb-8">Discovery Score</span>
              <span className="text-8xl font-black text-green-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]">{keyStats?.discoveryScore}%</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareCardGenerator;
