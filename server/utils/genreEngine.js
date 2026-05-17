exports.extractGenreDNA = (artists) => {
  const genreCounts = {};
  
  if (!artists || !Array.isArray(artists)) {
    return [];
  }

  artists.forEach(artist => {
    if (artist.genres && Array.isArray(artist.genres)) {
      artist.genres.forEach(genre => {
        // Capitalize each word for better formatting
        const formattedGenre = genre.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        genreCounts[formattedGenre] = (genreCounts[formattedGenre] || 0) + 1;
      });
    }
  });

  const sortedGenres = Object.keys(genreCounts)
    .map(name => ({ name, value: genreCounts[name] }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return sortedGenres;
};
