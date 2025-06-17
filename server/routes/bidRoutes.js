const express = require('express');
const router = express.Router();
const { placeBid, getLeaderboard } = require('../controllers/bidController');

router.post('/', placeBid);
router.get('/leaderboard', getLeaderboard);

module.exports = router;
