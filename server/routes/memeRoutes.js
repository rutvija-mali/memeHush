const express = require('express');
const router = express.Router();
const { getMemes, createMeme, upvoteMeme,downvoteMeme } = require('../controllers/memeController');



router.get('/', getMemes);
router.post('/', createMeme);
router.post('/:id/upvote', upvoteMeme);
router.post('/:id/downvote', downvoteMeme);

module.exports = router;
