const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/', dashboardController.getDashboardAnalysis);
router.get('/current-song', dashboardController.getCurrentSong);

module.exports = router;
