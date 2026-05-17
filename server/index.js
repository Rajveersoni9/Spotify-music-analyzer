require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const spotifyController = require('./controllers/spotifyController');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/', authRoutes);
const analysisRoutes = require('./routes/analysis');
app.use('/api/analysis', analysisRoutes);
const dashboardRoutes = require('./routes/dashboard');
app.use('/api/dashboard-analysis', dashboardRoutes);

// API Routes
app.get('/api/top-tracks', spotifyController.getTopTracks);
app.get('/api/top-artists', spotifyController.getTopArtists);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
