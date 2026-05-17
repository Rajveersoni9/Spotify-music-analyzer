exports.calculateDiscoveryScore = (tracks) => {
    if (!tracks || tracks.length === 0) return 0;
    const uniqueArtists = new Set();
    tracks.forEach(track => {
        if (track.artists && Array.isArray(track.artists)) {
            track.artists.forEach(artist => uniqueArtists.add(artist.id));
        }
    });
    return Math.round((uniqueArtists.size / tracks.length) * 100);
};

exports.calculateArtistDominance = (tracks) => {
    if (!tracks || tracks.length === 0) return 0;
    const artistCounts = {};
    tracks.forEach(track => {
        if (track.artists && track.artists.length > 0) {
            const mainArtist = track.artists[0].name;
            artistCounts[mainArtist] = (artistCounts[mainArtist] || 0) + 1;
        }
    });
    
    const maxCount = Math.max(...Object.values(artistCounts), 0);
    return Math.round((maxCount / tracks.length) * 100);
};

exports.calculateEraBreakdown = (tracks) => {
    const eras = {
        '2000s': 0,
        '2010s': 0,
        '2020s': 0
    };
    
    if (!tracks || tracks.length === 0) return eras;

    let totalValid = 0;

    tracks.forEach(track => {
        if (track.album && track.album.release_date) {
            const year = parseInt(track.album.release_date.substring(0, 4), 10);
            if (year >= 2000 && year < 2010) {
                eras['2000s']++;
                totalValid++;
            }
            else if (year >= 2010 && year < 2020) {
                eras['2010s']++;
                totalValid++;
            }
            else if (year >= 2020) {
                eras['2020s']++;
                totalValid++;
            }
        }
    });

    if (totalValid === 0) return eras;

    return {
        '2000s': Math.round((eras['2000s'] / totalValid) * 100),
        '2010s': Math.round((eras['2010s'] / totalValid) * 100),
        '2020s': Math.round((eras['2020s'] / totalValid) * 100)
    };
};

exports.calculateRepeatBehavior = (artistDominance) => {
    if (artistDominance >= 40) return "High";
    if (artistDominance >= 20) return "Medium";
    return "Low";
};

exports.calculateAveragePopularity = (tracks) => {
    if (!tracks || tracks.length === 0) return 0;
    const sum = tracks.reduce((acc, track) => acc + (track.popularity || 0), 0);
    return Math.round(sum / tracks.length);
};
