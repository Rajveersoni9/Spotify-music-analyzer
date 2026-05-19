const TrackCard = ({ track, index }) => {
  return (
    <div className="flex items-center gap-3 sm:gap-4 bg-spotify-dark p-3 sm:p-4 rounded-xl hover:bg-spotify-light transition-colors duration-300 group cursor-pointer border border-white/5 hover:border-white/10">
      <div className="w-5 sm:w-6 text-sm sm:text-base text-center text-gray-400 font-medium group-hover:text-white transition-colors">
        {index + 1}
      </div>
      <img 
        src={track.album?.images?.[0]?.url} 
        alt={track.album?.name || 'Album cover'} 
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-md object-cover shadow-md bg-spotify-light flex-shrink-0"
      />
      <div className="flex flex-col overflow-hidden flex-1 min-w-0">
        <h3 className="text-white font-medium text-sm sm:text-base truncate group-hover:text-spotify-green transition-colors">
          {track.name}
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm truncate">
          {track.artists?.map(a => a.name).join(', ') || 'Unknown Artist'}
        </p>
      </div>
    </div>
  );
};

export default TrackCard;
