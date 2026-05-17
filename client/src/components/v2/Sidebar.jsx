import { Music, LayoutDashboard, ListMusic, Users, Activity, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: ListMusic, label: 'Top Tracks', active: false },
    { icon: Users, label: 'Top Artists', active: false },
    { icon: Activity, label: 'Mood Analysis', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <aside className="w-64 h-screen sticky top-0 bg-[#121212]/80 backdrop-blur-xl border-r border-white/5 flex flex-col p-6">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.3)]">
          <Music className="w-6 h-6 text-black" />
        </div>
        <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Analyzer V2
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item, idx) => (
          <motion.button
            whileHover={{ x: 5 }}
            key={idx}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
              item.active 
                ? 'bg-green-500/10 text-green-400 shadow-[inset_2px_0_0_0_rgba(34,197,94,1)]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="bg-gradient-to-br from-green-500/20 to-transparent p-4 rounded-xl border border-green-500/20">
          <p className="text-xs text-green-400 font-semibold mb-1">PRO TIP</p>
          <p className="text-xs text-gray-400 leading-relaxed">Your mood updates dynamically based on your most recently played tracks.</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
