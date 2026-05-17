import { LogOut, User } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const TopNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('spotify_token');
    navigate('/');
  };

  return (
    <header className="w-full flex items-center justify-end py-6 px-8 bg-transparent">
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="text-xs text-gray-400 hover:text-white transition-colors underline-offset-4 hover:underline mr-4">
          Back to V1 Dashboard
        </Link>
        
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-500 flex items-center justify-center p-0.5 border border-white/10">
           <div className="w-full h-full bg-[#121212] rounded-full flex items-center justify-center">
             <User className="w-5 h-5 text-gray-400" />
           </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/5 hover:border-red-500/30 transition-all"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

export default TopNavbar;
