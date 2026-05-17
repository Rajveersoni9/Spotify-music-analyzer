const ArtistCard = ({ artist, index }) => {
  return (
    <div className="flex flex-col items-center bg-spotify-dark p-6 rounded-2xl hover:bg-spotify-light transition-all duration-300 group cursor-pointer border border-white/5 hover:border-white/10 hover:-translate-y-1">
      <div className="relative mb-4">
        <img 
          src={artist.images?.[0]?.url} 
          alt={artist.name} 
          className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-transparent group-hover:border-spotify-green transition-colors duration-300 bg-spotify-light"
        />
        <div className="absolute -top-2 -left-2 w-8 h-8 bg-spotify-black text-white rounded-full flex items-center justify-center font-bold text-sm border border-white/10">
          {index + 1}
        </div>
      </div>
      <h3 className="text-white font-bold text-lg text-center truncate w-full group-hover:text-spotify-green transition-colors">
        {artist.name}
      </h3>
      <p className="text-gray-400 text-sm capitalize truncate w-full text-center mt-1">
        {artist.genres?.[0] || 'Artist'}
      </p>
    </div>
  );
};

export default ArtistCard;
