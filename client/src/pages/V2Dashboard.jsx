import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

import Sidebar from '../components/v2/Sidebar';
import TopNavbar from '../components/v2/TopNavbar';
import MoodHeroCard from '../components/v2/MoodHeroCard';
import VibeDistributionCard from '../components/v2/VibeDistributionCard';
import MoodBreakdownChart from '../components/v2/MoodBreakdownChart';
import MoodSummaryCard from '../components/v2/MoodSummaryCard';
import MoodTracksTable from '../components/v2/MoodTracksTable';
import InsightBanner from '../components/v2/InsightBanner';
import LoadingSkeleton from '../components/v2/LoadingSkeleton';

const V2Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('spotify_token');
    
    if (!token) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_BASE}/api/analysis`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('spotify_token');
          navigate('/');
        }
        setError('Failed to load your V2 Spotify data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans selection:bg-green-500/30">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0">
        <TopNavbar />
        
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-6 rounded-2xl max-w-md w-full">
              <h2 className="text-xl font-bold mb-2">Oops!</h2>
              <p>{error}</p>
            </div>
          </div>
        ) : data ? (
          <div className="p-8 pb-20 space-y-8 max-w-7xl mx-auto w-full">
            <MoodHeroCard 
              moodLabel={data.moodAnalysis?.moodLabel} 
              moodDescription={data.moodAnalysis?.moodDescription} 
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 flex flex-col space-y-8">
                <VibeDistributionCard breakdown={data.moodAnalysis?.breakdown} />
                <MoodTracksTable tracks={data.topTracks} />
              </div>
              <div className="flex flex-col space-y-8">
                <MoodBreakdownChart breakdown={data.moodAnalysis?.breakdown} />
                <MoodSummaryCard averages={data.moodAnalysis} />
              </div>
            </div>

            <InsightBanner moodLabel={data.moodAnalysis?.moodLabel} />
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default V2Dashboard;
