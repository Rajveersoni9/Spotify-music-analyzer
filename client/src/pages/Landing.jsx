import { Music } from 'lucide-react';

const Landing = () => {
  const handleLogin = () => {
    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    window.location.href = `${API_BASE}/login`;
  };

  return (
    <div className="min-h-screen bg-spotify-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-spotify-green/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="z-10 flex flex-col items-center text-center px-6">
        <div className="bg-spotify-dark p-4 rounded-3xl mb-8 shadow-2xl border border-white/5">
          <Music className="w-16 h-16 text-spotify-green" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white">
          Spotify Music <span className="text-transparent bg-clip-text bg-gradient-to-r from-spotify-green to-[#1ed760]">Analyzer</span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12">
          Discover your most played tracks and favorite artists. Get a deeper insight into your musical taste with an elegant, minimalist dashboard.
        </p>
        
        <button
          onClick={handleLogin}
          className="bg-spotify-green hover:bg-[#1ed760] text-black font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(29,185,84,0.4)] text-lg"
        >
          Login with Spotify
        </button>
      </div>
    </div>
  );
};

export default Landing;
