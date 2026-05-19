const ArtistCard = ({ artist, index }) => {
  return (
    <div className="flex flex-col items-center bg-spotify-dark p-4 sm:p-6 rounded-2xl hover:bg-spotify-light transition-all duration-300 group cursor-pointer border border-white/5 hover:border-white/10 hover:-translate-y-1">
      <div className="relative mb-3 sm:mb-4">
        <img 
          src={artist.images?.[0]?.url} 
          alt={artist.name} 
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover shadow-lg border-4 border-transparent group-hover:border-spotify-green transition-colors duration-300 bg-spotify-light"
        />
        <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-7 h-7 sm:w-8 sm:h-8 bg-spotify-black text-white rounded-full flex items-center justify-center font-bold text-xs sm:text-sm border border-white/10">
          {index + 1}
        </div>
      </div>
      <h3 className="text-white font-bold text-base sm:text-lg text-center truncate w-full group-hover:text-spotify-green transition-colors">
        {artist.name}
      </h3>
      <p className="text-gray-400 text-xs sm:text-sm capitalize truncate w-full text-center mt-1">
        {artist.genres?.[0] || 'Artist'}
      </p>
    </div>
  );
};

export default ArtistCard;
