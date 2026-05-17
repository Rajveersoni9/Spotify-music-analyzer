import { motion } from 'framer-motion';
import { Home, Music, LogOut, Sparkles, MapPin, Clock, Ghost, Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ onFeatureSelect }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('spotify_token');
    navigate('/');
  };

  const navItems = [
    { icon: <Home size={20} />, label: 'Dashboard', id: 'dashboard' },
    { icon: <Sparkles size={20} />, label: 'Aura Reading', id: 'aura-reading' },
    { icon: <MapPin size={20} />, label: 'Dream Festival', id: 'festival' },
    { icon: <Clock size={20} />, label: 'Time Machine', id: 'time-machine' },
    { icon: <Ghost size={20} />, label: 'Alter-Ego', id: 'alter-ego' },
    { icon: <Heart size={20} />, label: 'Vibe Check', id: 'vibe-check' },
  ];

  const handleNavClick = (id) => {
    if (id === 'dashboard') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onFeatureSelect(id);
    }
  };

  return (
    <aside className="w-64 hidden lg:flex flex-col bg-black/40 backdrop-blur-xl border-r border-white/5 h-screen sticky top-0 p-6">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
          <Music size={16} className="text-black" />
        </div>
        <span className="font-bold text-xl tracking-tight text-white">Aura.</span>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item, idx) => {
          const isActive = item.id === 'dashboard'; // Keeping Dashboard as the default active state visually
          return (
            <button
              key={idx}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 hover:text-white hover:bg-white/5 ${
                isActive ? 'text-green-400 font-medium' : 'text-neutral-400'
              }`}
            >
              <span className={isActive ? 'drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]' : ''}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all duration-300 group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
