const TrackCard = ({ track, index }) => {
  return (
    <div className="flex items-center gap-4 bg-spotify-dark p-4 rounded-xl hover:bg-spotify-light transition-colors duration-300 group cursor-pointer border border-white/5 hover:border-white/10">
      <div className="w-6 text-center text-gray-400 font-medium group-hover:text-white transition-colors">
        {index + 1}
      </div>
      <img 
        src={track.album?.images?.[0]?.url} 
        alt={track.album?.name || 'Album cover'} 
        className="w-14 h-14 rounded-md object-cover shadow-md bg-spotify-light"
      />
      <div className="flex flex-col overflow-hidden flex-1">
        <h3 className="text-white font-medium truncate group-hover:text-spotify-green transition-colors">
          {track.name}
        </h3>
        <p className="text-gray-400 text-sm truncate">
          {track.artists?.map(a => a.name).join(', ') || 'Unknown Artist'}
        </p>
      </div>
    </div>
  );
};

export default TrackCard;
