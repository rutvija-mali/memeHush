const supabase = require('../supabase/client');
const { broadcastBidUpdate } = require('../socket');

exports.placeBid = async (req, res) => {
  const { meme_id, user_id, credits } = req.body;
  const { data, error } = await supabase
    .from('bids')
    .insert([{ meme_id, user_id, credits }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  broadcastBidUpdate(data[0]);
  res.status(201).json(data[0]);
};


exports.getLeaderboard = async (req, res) => {
  const { data, error } = await supabase
    .from('bids')
    .select('meme_id, credits')
    .limit(1000); 

  if (error) {
    return res.status(500).json({ error: error.message });
  }

 
  const leaderboardMap = {};

  data.forEach(bid => {
    if (!leaderboardMap[bid.meme_id]) {
      leaderboardMap[bid.meme_id] = 0;
    }
    leaderboardMap[bid.meme_id] += bid.credits;
  });

 
  const leaderboard = Object.entries(leaderboardMap)
    .map(([meme_id, totalCredits]) => ({ meme_id, totalCredits }))
    .sort((a, b) => b.totalCredits - a.totalCredits)
    .slice(0, 10); // top 10

  res.json(leaderboard);
};


