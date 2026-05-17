exports.analyzeGenres = (trackGenres) => {
  if (!trackGenres || trackGenres.length === 0) return null;

  let vibesCount = {
    energetic: 0,
    chill: 0,
    intense: 0,
    groovy: 0,
    melancholic: 0
  };

  let totalMatches = 0;

  const keywordMap = {
    energetic: ['pop', 'dance', 'house', 'edm', 'electro', 'bounce', 'party', 'techno', 'upbeat', 'club', 'latin', 'reggaeton'],
    chill: ['acoustic', 'indie', 'lo-fi', 'ambient', 'classical', 'jazz', 'folk', 'chill', 'soft', 'singer-songwriter'],
    intense: ['rock', 'metal', 'punk', 'hardcore', 'rap', 'trap', 'drill', 'hip hop', 'grime', 'hard'],
    groovy: ['r&b', 'soul', 'funk', 'disco', 'motown', 'groove', 'afrobeat'],
    melancholic: ['sad', 'emo', 'blues', 'doom', 'melancholy', 'dark', 'goth', 'dreampop']
  };

  trackGenres.forEach(genres => {
    if (!genres || genres.length === 0) return;

    let matchFound = false;

    genres.forEach(genre => {
      const g = genre.toLowerCase();
      for (const [vibe, keywords] of Object.entries(keywordMap)) {
        if (keywords.some(kw => g.includes(kw))) {
          vibesCount[vibe]++;
          totalMatches++;
          matchFound = true;
        }
      }
    });

    // If no keywords matched, classify as energetic by default if it's popular music
    if (!matchFound) {
      vibesCount.energetic++;
      totalMatches++;
    }
  });

  if (totalMatches === 0) {
    totalMatches = 1; // avoid division by zero
  }

  const breakdown = [
    { name: 'Energetic', value: Math.round((vibesCount.energetic / totalMatches) * 100) },
    { name: 'Chill', value: Math.round((vibesCount.chill / totalMatches) * 100) },
    { name: 'Intense', value: Math.round((vibesCount.intense / totalMatches) * 100) },
    { name: 'Groovy', value: Math.round((vibesCount.groovy / totalMatches) * 100) },
    { name: 'Melancholic', value: Math.round((vibesCount.melancholic / totalMatches) * 100) }
  ];

  // Find dominant vibe
  let dominantVibe = 'energetic';
  let maxVal = vibesCount.energetic;
  for (const [vibe, count] of Object.entries(vibesCount)) {
    if (count > maxVal) {
      maxVal = count;
      dominantVibe = vibe;
    }
  }

  // Generate Mood Labels
  const moodLabels = {
    energetic: { label: "Party Vibes 🎉", desc: "Your rotation is packed with rhythmic, highly danceable, and upbeat tracks." },
    chill: { label: "Calm & Reflective 🍃", desc: "Your tracks feature organic instruments and soothing vibes to keep you grounded." },
    intense: { label: "Intense & Focused 🚀", desc: "High energy, heavy beats, or intense lyrics—perfect for deep work or gym sessions." },
    groovy: { label: "Smooth & Groovy 🕺", desc: "You've been leaning into soulful, rhythmic, and funky soundscapes." },
    melancholic: { label: "Melancholic 🌧️", desc: "You've been leaning towards deeper, more reflective, and emotional music." }
  };

  return {
    moodLabel: moodLabels[dominantVibe].label,
    moodDescription: moodLabels[dominantVibe].desc,
    breakdown,
    dominantVibe
  };
};
