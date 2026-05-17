import { Music, LogOut, LayoutDashboard } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('spotify_token');
    navigate('/');
  };

  return (
    <nav className="w-full bg-spotify-dark border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Music className="w-8 h-8 text-spotify-green" />
        <h1 className="text-xl font-bold tracking-tight text-white">
          Spotify Analyzer
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <Link 
          to="/v3-dashboard" 
          className="flex items-center gap-2 text-spotify-green hover:text-white transition-colors text-sm font-semibold border border-spotify-green px-4 py-1.5 rounded-full hover:bg-spotify-green/20"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="hidden sm:inline">Try Premium V2</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-full hover:bg-white/5"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium hidden sm:inline">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
