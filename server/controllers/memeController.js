const supabase = require('../supabase/client');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { broadcastVoteUpdate } = require('../socket');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.getMemes = async (req, res) => {
  const { data, error } = await supabase.from('memes').select('*');
  if (error) return res.status(500).json({ error });
  res.json(data);
};

exports.createMeme = async (req, res) => {
  const { title, image_url, tags, owner_id } = req.body;
  // Default Gemini values
  let caption = "YOLO to the moon!";
  let vibe = "Retro Stonks Vibes";

  try {
    genAI.getGenerativeModel({ model: 'models/gemini-pro' });
    const result = await model.generateContent(
      `Funny caption and vibe for meme with tags: ${tags.join(', ')}`
    );
    const text = result.response.text().split('\n');
    caption = text[0] || caption;
    vibe = text[1] || vibe;
  } catch (err) {
    console.log(" Gemini failed, using defaults:", err.message);
  }

  try {
    const { data: insertData, error: insertError } = await supabase
      .from('memes')
      .insert([{ title, image_url, tags, upvotes: 0, owner_id, caption, vibe }])
      .select();

    if (insertError) {
      return res.status(500).json({ error: insertError.message });
    }

    res.status(201).json(insertData[0]);
  } catch (err) {
    res.status(500).json({ error: 'Unexpected error occurred' });
  }
};


exports.upvoteMeme = async (req, res) => {
const memeId = parseInt(req.params.id);

const { data: memeData, error: selectError } = await supabase
  .from('memes')
  .select('upvotes')
  .eq('id', memeId)
  .single();

if (selectError) {
  return res.status(500).json({ error: selectError.message });
}

const newUpvotes = memeData.upvotes + 1;

const { data: updatedData, error: updateError } = await supabase
  .from('memes')
  .update({ upvotes: newUpvotes })
  .eq('id', memeId)
  .select()
  .single();

if (updateError) {
  return res.status(500).json({ error: updateError.message });
}

broadcastVoteUpdate(memeId, updatedData.upvotes);
res.json({ memeId, upvotes: updatedData.upvotes });

};

exports.downvoteMeme = async (req, res) => {
  const memeId = parseInt(req.params.id);

  const { data: memeData, error: selectError } = await supabase
    .from('memes')
    .select('downvotes')
    .eq('id', memeId)
    .single();

  if (selectError) {
    return res.status(500).json({ error: selectError.message });
  }

  const newDownvotes = memeData.downvotes + 1;

  const { data: updatedData, error: updateError } = await supabase
    .from('memes')
    .update({ downvotes: newDownvotes })
    .eq('id', memeId)
    .select()
    .single();

  if (updateError) {
    return res.status(500).json({ error: updateError.message });
  }

  broadcastVoteUpdate(memeId, updatedData.downvotes);
  res.json({ memeId, downvotes: updatedData.downvotes });
};
