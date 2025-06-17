import { useState } from 'react';
import { placeBid } from '../utils/api';

function BidPanel({ memes }) {
  const [memeId, setMemeId] = useState('');
  const [credits, setCredits] = useState(100);

  const submitBid = async () => {
    if (!memeId) return;
    await placeBid({ meme_id: memeId, user_id: 'user123', credits });
    setCredits(100);
  };

  return (
    <div className="bg-zinc-900 p-4 rounded shadow">
      <h2 className="text-lg text-neon-cyan mb-2">💰 Place a Bid</h2>
      <select value={memeId} onChange={e => setMemeId(e.target.value)} className="w-full p-2 bg-black text-white border border-neon-blue mb-2">
        <option value="">Select a Meme</option>
        {memes.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
      </select>
      <input type="number" value={credits} onChange={e => setCredits(e.target.value)} className="w-full p-2 mb-2 bg-black text-white border border-neon-pink" />
      <button onClick={submitBid} className="bg-neon-cyan px-4 py-2 font-bold hover:glitch">Bid</button>
    </div>
  );
}

export default BidPanel;
