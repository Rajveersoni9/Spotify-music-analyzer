const MoodTracksTable = ({ tracks }) => {
  if (!tracks || tracks.length === 0) return null;

  // Simple helper to get an emoji for the genre string
  const getGenreEmoji = (genre) => {
    if (!genre || genre === 'Unknown') return '🎵';
    const g = genre.toLowerCase();
    if (g.includes('pop') || g.includes('dance')) return '🎉';
    if (g.includes('rock') || g.includes('metal') || g.includes('rap')) return '🔥';
    if (g.includes('acoustic') || g.includes('indie') || g.includes('jazz')) return '🍃';
    if (g.includes('sad') || g.includes('emo')) return '🌧️';
    if (g.includes('r&b') || g.includes('soul') || g.includes('funk')) return '🕺';
    return '🎵';
  };

  return (
    <div className="bg-[#181818] rounded-3xl p-6 border border-white/5 flex flex-col" style={{ maxHeight: '450px' }}>
      <h3 className="text-xl font-bold mb-4 shrink-0">Top Tracks Driving This Mood</h3>
      
      <div className="overflow-y-auto flex-1 pr-2 relative">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-[#181818] z-10">
            <tr className="text-gray-400 text-sm border-b border-white/5">
              <th className="pb-3 pt-2 font-medium pl-2 w-10">#</th>
              <th className="pb-3 pt-2 font-medium">Track</th>
              <th className="pb-3 pt-2 font-medium text-right pr-4">Primary Genre</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {tracks.map((track, idx) => (
              <tr key={track.id} className="hover:bg-white/5 transition-colors group">
                <td className="py-3 pl-2 text-gray-500">{idx + 1}</td>
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    {track.imageUrl ? (
                      <img src={track.imageUrl} alt={track.name} className="w-10 h-10 rounded-md shadow-md shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-md bg-[#282828] shrink-0"></div>
                    )}
                    <div className="min-w-0">
                      <p className="font-semibold text-white truncate max-w-[140px] lg:max-w-[180px]">{track.name}</p>
                      <p className="text-xs text-gray-400 truncate max-w-[140px] lg:max-w-[180px]">{track.artist}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 text-right pr-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 text-xs font-medium text-gray-300 capitalize border border-white/10 max-w-[120px]">
                    <span className="shrink-0">{getGenreEmoji(track.primaryGenre)}</span>
                    <span className="truncate">{track.primaryGenre}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MoodTracksTable;
