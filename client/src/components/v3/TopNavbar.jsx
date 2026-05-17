import { useState, useEffect, useRef } from 'react';
import { Search, Bell, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const TopNavbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchNotifications = async () => {
    setShowNotifications(!showNotifications);
    
    // If already loaded or closing, don't fetch again
    if (notifications.length > 0 || showNotifications) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('spotify_token');
      // Spotify API doesn't have a personal 'notifications' endpoint.
      // The best alternative is showing 'New Releases' to simulate latest updates.
      const res = await axios.get('https://api.spotify.com/v1/browse/new-releases?limit=5', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(res.data.albums.items);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="h-20 border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-black text-white tracking-tight">Spotify<span className="text-green-500">Analyzer</span></h2>
      </div>

      <div className="flex items-center gap-6">
        
        {/* Notifications */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={fetchNotifications}
            className="relative p-2 text-neutral-400 hover:text-white transition-colors"
            title="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-4 w-80 bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
              >
                <div className="p-4 border-b border-white/5 bg-white/5">
                  <h3 className="text-white font-bold text-sm">Latest from Spotify</h3>
                  <p className="text-xs text-neutral-400 mt-1">New Releases</p>
                </div>
                
                <div className="max-h-96 overflow-y-auto p-2">
                  {loading ? (
                    <div className="flex justify-center p-8">
                      <Loader2 size={24} className="text-green-500 animate-spin" />
                    </div>
                  ) : notifications.length > 0 ? (
                    notifications.map((item, idx) => (
                      <a 
                        key={idx}
                        href={item.external_urls.spotify}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-xl transition-colors"
                      >
                        <img src={item.images[0]?.url} alt={item.name} className="w-12 h-12 rounded-md object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-white truncate">{item.name}</p>
                          <p className="text-xs text-neutral-400 truncate">{item.artists.map(a => a.name).join(', ')}</p>
                        </div>
                      </a>
                    ))
                  ) : (
                    <div className="p-4 text-center text-neutral-500 text-sm">No new releases found.</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile */}
        <a 
          href="https://open.spotify.com" 
          target="_blank" 
          rel="noreferrer"
          className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-400 to-emerald-600 p-[2px] cursor-pointer hover:scale-105 transition-transform shadow-[0_0_10px_rgba(34,197,94,0.3)]"
          title="Your Spotify Profile"
        >
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
            <span className="text-sm font-bold text-white">ME</span>
          </div>
        </a>
      </div>
    </header>
  );
};

export default TopNavbar;
