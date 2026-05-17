import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const MoodBreakdownChart = ({ breakdown }) => {
  if (!breakdown) return null;

  const COLORS = ['#22c55e', '#eab308', '#3b82f6', '#8b5cf6', '#ec4899'];

  return (
    <div className="bg-[#181818] rounded-3xl p-6 border border-white/5 flex flex-col h-full">
      <h3 className="text-xl font-bold mb-2">Vibe Breakdown</h3>
      <p className="text-sm text-gray-400 mb-6">How your music is distributed</p>
      
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={breakdown}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {breakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#181818', borderColor: '#333', borderRadius: '12px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-3 justify-center mt-4">
        {breakdown.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodBreakdownChart;
