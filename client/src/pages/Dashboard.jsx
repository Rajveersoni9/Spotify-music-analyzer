import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import TrackCard from '../components/TrackCard';
import ArtistCard from '../components/ArtistCard';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get token from URL or localStorage
    let token = searchParams.get('access_token');
    
    if (token) {
      localStorage.setItem('spotify_token', token);
      // Clean up URL
      navigate('/dashboard', { replace: true });
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
        const [tracksRes, artistsRes] = await Promise.all([
          axios.get(`${API_BASE}/api/top-tracks`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${API_BASE}/api/top-artists`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        setTracks(tracksRes.data?.items || []);
        setArtists(artistsRes.data?.items || []);
      } catch (err) {
        console.error('Error fetching data:', err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('spotify_token');
          navigate('/');
        }
        setError('Failed to load your Spotify data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-spotify-black flex flex-col items-center justify-center text-spotify-green">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <h2 className="text-xl font-medium text-white">Analyzing your taste...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-spotify-black flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-6 rounded-2xl max-w-md w-full">
          <h2 className="text-2xl font-bold mb-2">Oops!</h2>
          <p>{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-6 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-full transition-colors"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-spotify-black text-white pb-20">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-10">
        <header className="mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight mb-2">Your Dashboard</h2>
          <p className="text-gray-400">A deep dive into your most played music right now.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Top Tracks Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold border-b-2 border-spotify-green pb-1 inline-block">Top Tracks</h3>
            </div>
            <div className="flex flex-col gap-3">
              {tracks.map((track, index) => (
                <TrackCard key={track.id} track={track} index={index} />
              ))}
            </div>
          </section>

          {/* Top Artists Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold border-b-2 border-spotify-green pb-1 inline-block">Top Artists</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {artists.map((artist, index) => (
                <ArtistCard key={artist.id} artist={artist} index={index} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
