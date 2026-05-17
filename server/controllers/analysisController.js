const axios = require('axios');
const { analyzeGenres } = require('../utils/analysisEngine');

exports.getAnalysis = async (req, res) => {
  const token = req.headers.authorization;
  const timeRange = req.query.time_range || 'short_term'; 
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // 1. Fetch Top Tracks
    const tracksRes = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
      headers: { Authorization: token },
      params: { limit: 20, time_range: timeRange }
    });
    const topTracks = tracksRes.data.items;

    // 2. Fetch Top Artists
    let topArtistsRes = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers: { Authorization: token },
      params: { limit: 50, time_range: timeRange }
    });
    let allTopArtists = topArtistsRes.data?.items || [];
    
    // Fallback if user has no top artists in short_term
    if (allTopArtists.length === 0) {
      topArtistsRes = await axios.get('https://api.spotify.com/v1/me/top/artists', {
        headers: { Authorization: token },
        params: { limit: 50, time_range: 'long_term' }
      });
      allTopArtists = topArtistsRes.data?.items || [];
    }

    // We only send the top 10 artists to the frontend for display
    const topArtists = allTopArtists.slice(0, 10);

    // 3. Build artist genre map and extract all genres
    let artistMap = {};
    let allGenresList = [];
    
    allTopArtists.forEach(artist => {
      if (artist) {
        artistMap[artist.id] = artist.genres || [];
        if (artist.genres && artist.genres.length > 0) {
          allGenresList.push(artist.genres);
        }
      }
    });

    // 4. Analyze mood based on ALL top artists' genres
    const moodAnalysis = analyzeGenres(allGenresList);
    const fallbackGenres = [...new Set(allGenresList.flat())];

    // 5. Merge tracks with their primary genre/vibe for the table
    const enrichedTracks = topTracks.map((track, idx) => {
      const genres = artistMap[track.artists?.[0]?.id] || [];
      let primaryGenre = genres.length > 0 ? genres[0] : null;
      
      if (!primaryGenre) {
        primaryGenre = fallbackGenres.length > 0 ? fallbackGenres[idx % fallbackGenres.length] : 'pop';
      }

      return {
        id: track.id,
        name: track.name,
        artist: track.artists?.[0]?.name || 'Unknown Artist',
        imageUrl: track.album?.images?.[0]?.url || '',
        previewUrl: track.preview_url || '',
        primaryGenre
      };
    });

    res.json({
      topTracks: enrichedTracks,
      topArtists,
      moodAnalysis
    });

  } catch (error) {
    console.error('Error fetching analysis data:', error.response?.data || error.message);
    const fs = require('fs');
    fs.writeFileSync('error_log.txt', JSON.stringify({
      message: error.message,
      stack: error.stack,
      data: error.response?.data
    }, null, 2));
    res.status(error.response?.status || 500).json(error.response?.data || { error: 'Failed to fetch analysis' });
  }
};
