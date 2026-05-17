exports.determinePersonality = (stats) => {
    const { discoveryScore, genreDNALength, artistDominance, avgPopularity, eras } = stats;

    if (discoveryScore > 60 && genreDNALength >= 4) {
        return {
            title: "The Explorer",
            type: "Explorer",
            description: "You're constantly searching for new sounds and diverse genres. Your taste knows no bounds.",
            traits: ["Adventurous", "Curious", "Open-minded"]
        };
    }

    if (artistDominance > 35) {
        return {
            title: "The Loyalist",
            type: "Loyalist",
            description: "When you find an artist you love, you stick with them. You are deeply dedicated to your favorites.",
            traits: ["Dedicated", "Focused", "Passionate"]
        };
    }

    if (avgPopularity > 75) {
        return {
            title: "The Trend Rider",
            type: "Trend Rider",
            description: "You are always on the pulse of what's hot right now. Your playlists are packed with hits.",
            traits: ["Trendy", "Current", "Vibrant"]
        };
    }

    const pre2015Percentage = (eras['2000s'] || 0) + ((eras['2010s'] || 0) / 2);
    if (pre2015Percentage > 50) {
        return {
            title: "The Nostalgia Lover",
            type: "Nostalgia Lover",
            description: "You love taking a trip down memory lane. Classics and throwbacks are your comfort zone.",
            traits: ["Sentimental", "Classic", "Reflective"]
        };
    }

    return {
        title: "The Balanced Listener",
        type: "Balanced Listener",
        description: "You have a well-rounded taste in music, enjoying a healthy mix of different artists, eras, and styles.",
        traits: ["Versatile", "Eclectic", "Harmonious"]
    };
};

exports.generateListeningInsights = (stats) => {
    const insights = [];
    if (stats.discoveryScore > 70) insights.push("Discovery Addict");
    if (stats.artistDominance > 40) insights.push("Repeat Loyalist");
    if (stats.avgPopularity > 80) insights.push("Pop Culture Connoisseur");
    if (stats.eras['2020s'] > 80) insights.push("Modern Maven");
    if (stats.eras['2000s'] > 30) insights.push("Y2K Enthusiast");
    if (insights.length === 0) insights.push("Weekend Listener");
    
    return insights.slice(0, 3);
};
