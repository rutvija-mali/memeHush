import MemeForm from '../components/MemeForm';
import MemeCard from '../components/MemeCard';
import Leaderboard from '../components/Leaderboard';
import BidPanel from '../components/BidPanel';
import GlitchText from '../components/GlitchText';
import { useEffect, useState } from 'react';
import { getMemes } from '../utils/api';
import socket from '../utils/socket';

function Home() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    loadMemes();
    socket.on('newBid', () => loadMemes());
    socket.on('voteUpdate', () => loadMemes());
    return () => socket.off();
  }, []);

  const loadMemes = async () => {
    const data = await getMemes();
    setMemes(data);
  };

  return (
    <div className="p-4">
      <GlitchText text="⚡ MemeHustle ⚡" />
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        <div className="md:col-span-2">
          <MemeForm onSubmit={loadMemes} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {memes.map(meme => (
              <MemeCard key={meme.id} meme={meme} onVote={loadMemes} />
            ))}

          </div>
        </div>
        <div>
          <Leaderboard />
          <BidPanel memes={memes} />
        </div>
      </div>
    </div>
  );
}

export default Home;