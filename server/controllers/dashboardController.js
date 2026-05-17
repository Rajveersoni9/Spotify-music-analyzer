const axios = require('axios');
const genreEngine = require('../utils/genreEngine');
const statsEngine = require('../utils/statsEngine');
const personalityEngine = require('../utils/personalityEngine');

exports.getDashboardAnalysis = async (req, res) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        // Fetch data concurrently from Spotify API
        const [tracksRes, artistsRes] = await Promise.all([
            axios.get('https://api.spotify.com/v1/me/top/tracks', {
                headers: { Authorization: token },
                params: { limit: 50, time_range: 'long_term' }
            }),
            axios.get('https://api.spotify.com/v1/me/top/artists', {
                headers: { Authorization: token },
                params: { limit: 50, time_range: 'long_term' }
            })
        ]);

        const tracks = tracksRes.data.items || [];
        const artists = artistsRes.data.items || [];

        let currentSong = null;
        let isPlaying = false;
        
        try {
            // Check currently playing first
            const currentRes = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                headers: { Authorization: token },
                params: { additional_types: 'track' }
            });
            
            if (currentRes.data && currentRes.data.item) {
                const track = currentRes.data.item;
                currentSong = {
                    name: track.name,
                    artists: track.artists.map(a => a.name).join(', '),
                    image: track.album.images[0]?.url
                };
                isPlaying = currentRes.data.is_playing;
            } else {
                // If not currently playing, try recently played
                const recentRes = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
                    headers: { Authorization: token },
                    params: { limit: 1 }
                });
                if (recentRes.data.items && recentRes.data.items.length > 0) {
                    const track = recentRes.data.items[0].track;
                    currentSong = {
                        name: track.name,
                        artists: track.artists.map(a => a.name).join(', '),
                        image: track.album.images[0]?.url
                    };
                    isPlaying = false;
                }
            }
        } catch (err) {
            console.log("Could not fetch current/recently played song, falling back to top track");
        }

        if (!currentSong && tracks.length > 0) {
            currentSong = {
                name: tracks[0].name,
                artists: tracks[0].artists.map(a => a.name).join(', '),
                image: tracks[0].album.images[0]?.url
            };
            isPlaying = false;
        }


        // 1. Process Genre DNA
        const genreDNA = genreEngine.extractGenreDNA(artists);

        // 2. Process Stats Engine Data
        const discoveryScore = statsEngine.calculateDiscoveryScore(tracks);
        const artistDominance = statsEngine.calculateArtistDominance(tracks);
        const eraBreakdown = statsEngine.calculateEraBreakdown(tracks);
        const repeatBehavior = statsEngine.calculateRepeatBehavior(artistDominance);
        const avgPopularity = statsEngine.calculateAveragePopularity(tracks);

        const stats = {
            discoveryScore,
            artistDominance,
            eraBreakdown,
            repeatBehavior,
            avgPopularity,
            genreDNALength: genreDNA.length,
            eras: eraBreakdown
        };

        // 3. Process Personality Engine
        const personality = personalityEngine.determinePersonality(stats);
        const listeningInsights = personalityEngine.generateListeningInsights(stats);

        // 4. Construct Response
        res.json({
            personality,
            keyStats: {
                discoveryScore,
                artistDominance,
                repeatBehavior,
                avgPopularity
            },
            genreDNA,
            artistAffinity: artists.slice(0, 5).map(a => ({ name: a.name, images: a.images })),
            eraBreakdown,
            listeningInsights,
            topTracks: tracks.slice(0, 5).map(t => ({
                id: t.id,
                name: t.name,
                artists: t.artists.map(a => a.name).join(', '),
                album: t.album.name,
                image: t.album.images[0]?.url
            })),
            topArtists: artists.slice(0, 5).map(a => ({
                id: a.id,
                name: a.name,
                image: a.images[0]?.url,
                genres: a.genres
            })),
            genreDNA,
            recentSong: currentSong, // We keep the key as recentSong but it contains either current or recent
            isPlaying,
            personality
        });

    } catch (error) {
        console.error('Error fetching dashboard analysis:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json(error.response?.data || { error: 'Failed to fetch dashboard analysis data' });
    }
};

exports.getCurrentSong = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
        let currentSong = null;
        let isPlaying = false;
        
        // Try currently playing
        const currentRes = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: { Authorization: token },
            params: { additional_types: 'track' }
        });
        
        if (currentRes.data && currentRes.data.item) {
            const track = currentRes.data.item;
            currentSong = {
                name: track.name,
                artists: track.artists.map(a => a.name).join(', '),
                image: track.album.images[0]?.url
            };
            isPlaying = currentRes.data.is_playing;
            return res.json({ recentSong: currentSong, isPlaying });
        }
        
        // Try recently played
        const recentRes = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
            headers: { Authorization: token },
            params: { limit: 1 }
        });
        
        if (recentRes.data.items && recentRes.data.items.length > 0) {
            const track = recentRes.data.items[0].track;
            currentSong = {
                name: track.name,
                artists: track.artists.map(a => a.name).join(', '),
                image: track.album.images[0]?.url
            };
            isPlaying = false;
            return res.json({ recentSong: currentSong, isPlaying });
        }
        
        // If nothing, just return null
        return res.json({ recentSong: null, isPlaying: false });

    } catch (err) {
        console.error("Error fetching current song:", err.message);
        res.status(500).json({ error: 'Failed to fetch current song' });
    }
};
