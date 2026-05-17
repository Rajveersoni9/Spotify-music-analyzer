import { Home, Sparkles, MapPin, Clock, Ghost, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MobileNav = ({ onFeatureSelect, activeFeature }) => {
  const navigate = useNavigate();

  const navItems = [
    { icon: <Home size={20} />, label: 'Home', id: 'dashboard' },
    { icon: <Sparkles size={20} />, label: 'Aura', id: 'aura-reading' },
    { icon: <MapPin size={20} />, label: 'Festival', id: 'festival' },
    { icon: <Clock size={20} />, label: 'Time', id: 'time-machine' },
    { icon: <Ghost size={20} />, label: 'Ego', id: 'alter-ego' },
    { icon: <Heart size={20} />, label: 'Vibe', id: 'vibe-check' },
  ];

  const handleNavClick = (id) => {
    if (id === 'dashboard') {
      onFeatureSelect(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onFeatureSelect(id);
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-xl border-t border-white/5 z-50 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item, idx) => {
          const isActive = activeFeature === item.id || (!activeFeature && item.id === 'dashboard');
          return (
            <button
              key={idx}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-green-400' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <div className={isActive ? 'drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]' : ''}>
                {item.icon}
              </div>
              <span className="text-[10px] font-medium tracking-tight truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
