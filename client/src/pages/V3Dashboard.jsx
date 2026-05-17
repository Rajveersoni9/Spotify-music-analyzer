import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';

import Sidebar from '../components/v3/Sidebar';
import TopNavbar from '../components/v3/TopNavbar';
import KeyStatsCard from '../components/v3/KeyStatsCard';
import GenreDNACard from '../components/v3/GenreDNACard';
import ListeningInsightsCard from '../components/v3/ListeningInsightsCard';
import ArtistAffinityCard from '../components/v3/ArtistAffinityCard';
import EraBreakdownCard from '../components/v3/EraBreakdownCard';
import LoadingSkeleton from '../components/v3/LoadingSkeleton';
import UniqueFeatureModal from '../components/v3/UniqueFeatureModal';
import MobileNav from '../components/v3/MobileNav';
import { Music } from 'lucide-react';

const V3Dashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFeature, setActiveFeature] = useState(null);


  useEffect(() => {
    let token = searchParams.get('access_token');
    
    if (token) {
      localStorage.setItem('spotify_token', token);
      navigate('/v3-dashboard', { replace: true });
    } else {
      token = localStorage.getItem('spotify_token');
    }
    
    if (!token) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_BASE}/api/dashboard-analysis`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('spotify_token');
          navigate('/');
        }
        setError('Failed to load your premium Spotify analytics.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Polling for currently playing song
  useEffect(() => {
    const token = localStorage.getItem('spotify_token');
    // Only start polling after initial data is loaded
    if (!token || !data) return;

    const fetchCurrentSong = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_BASE}/api/dashboard/current-song`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setData(prev => {
          if (!prev) return prev;
          // Only update state if data changed to avoid unnecessary re-renders
          if (JSON.stringify(prev.recentSong) !== JSON.stringify(res.data.recentSong) || prev.isPlaying !== res.data.isPlaying) {
             return { ...prev, recentSong: res.data.recentSong, isPlaying: res.data.isPlaying };
          }
          return prev;
        });
      } catch (err) {
        console.error('Error fetching current song:', err);
      }
    };

    const intervalId = setInterval(fetchCurrentSong, 10000);
    return () => clearInterval(intervalId);
  }, [data !== null]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex font-sans selection:bg-green-500/30 overflow-hidden relative">
      {/* Global Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-green-900/10 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-900/10 blur-[120px]"></div>
        <div className="absolute top-[40%] right-[20%] w-[20%] h-[20%] rounded-full bg-blue-900/5 blur-[100px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="z-10 flex w-full">
        <Sidebar onFeatureSelect={setActiveFeature} />
        
        <main className="flex-1 flex flex-col h-screen overflow-y-auto">
          <TopNavbar />
          
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-8 rounded-3xl max-w-md w-full text-center backdrop-blur-md">
                <h2 className="text-2xl font-bold mb-3 text-white">Connection Error</h2>
                <p>{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : data ? (
            <div className="p-6 md:p-10 pb-24 space-y-8 max-w-[1600px] mx-auto w-full">
              
              {/* Recently Played Banner - Moved to top to avoid taskbar overlap */}
              {data?.recentSong && (
                <div className="bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20 rounded-2xl p-4 flex items-center justify-between shadow-lg backdrop-blur-md relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-1 h-full bg-green-500" />
                   <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-md overflow-hidden bg-white/10 flex items-center justify-center shadow-md">
                        {data.recentSong.image ? (
                            <img src={data.recentSong.image} alt={data.recentSong.name} className="w-full h-full object-cover" />
                        ) : (
                            <Music className="text-neutral-400" size={20} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-green-400 font-bold tracking-wider uppercase mb-0.5 flex items-center gap-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full bg-green-500 ${data.isPlaying ? 'animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]' : ''}`}></span>
                            {data.isPlaying ? 'Now Playing' : 'Recently Played'}
                        </p>
                        <p className="text-white font-medium truncate text-sm drop-shadow-md">{data.recentSong.name}</p>
                        <p className="text-neutral-400 text-xs truncate">{data.recentSong.artists}</p>
                      </div>
                   </div>
                   <div className="hidden sm:flex items-end gap-1 h-8 opacity-60">
                      {data.isPlaying ? (
                        <>
                          <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 bg-green-400 rounded-t-sm" />
                          <motion.div animate={{ height: [12, 24, 12] }} transition={{ repeat: Infinity, duration: 1.1 }} className="w-1 bg-green-400 rounded-t-sm" />
                          <motion.div animate={{ height: [16, 8, 16] }} transition={{ repeat: Infinity, duration: 0.9 }} className="w-1 bg-green-400 rounded-t-sm" />
                          <motion.div animate={{ height: [8, 20, 8] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-1 bg-green-400 rounded-t-sm" />
                        </>
                      ) : (
                        <>
                          <div className="w-1 h-2 bg-neutral-600 rounded-t-sm" />
                          <div className="w-1 h-4 bg-neutral-600 rounded-t-sm" />
                          <div className="w-1 h-3 bg-neutral-600 rounded-t-sm" />
                          <div className="w-1 h-5 bg-neutral-600 rounded-t-sm" />
                        </>
                      )}
                   </div>
                </div>
              )}

              <div id="top-tracks">
                <KeyStatsCard stats={data.keyStats} />
              </div>

              {/* Balanced 2-column layout to fix blank spaces */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div id="top-artists" className="flex flex-col gap-6">
                  <ArtistAffinityCard artists={data.artistAffinity} />
                </div>
                <div className="flex flex-col gap-6">
                  <EraBreakdownCard breakdown={data.eraBreakdown} />
                </div>
                <div className="flex flex-col gap-6">
                  <ListeningInsightsCard insights={data.listeningInsights} />
                </div>
                <div id="genre-dna" className="flex flex-col gap-6">
                  <GenreDNACard genreDNA={data.genreDNA} />
                </div>
              </div>


            </div>
          ) : null}
        </main>
      </div>

      <MobileNav onFeatureSelect={setActiveFeature} activeFeature={activeFeature} />

      <UniqueFeatureModal 
        isOpen={!!activeFeature} 
        onClose={() => setActiveFeature(null)} 
        feature={activeFeature}
        data={data}
      />
    </div>
  );
};

export default V3Dashboard;
