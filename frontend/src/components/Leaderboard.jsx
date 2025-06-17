import { useEffect, useState } from 'react';
import { getLeaderboard, getMemes } from '../utils/api';

function Leaderboard() {
  const [topMemes, setTopMemes] = useState([]);

  useEffect(() => {
    const load = async () => {
      const leaderboard = await getLeaderboard(); 
      const allMemes = await getMemes(); 

      const merged = leaderboard.map(lb => {
        const meme = allMemes.find(m => m.id == lb.meme_id);
        return {
          ...lb,
          title: meme?.title || 'Untitled',
        };
      });

      setTopMemes(merged);
    };

    load();
  }, []);

  return (
    <div className="bg-zinc-900 p-4 mb-4 rounded shadow">
      <h2 className="text-lg text-neon-yellow mb-2">🔥 Leaderboard</h2>
      <ul className="text-sm space-y-1">
        {topMemes.map((m, i) => (
          <li key={i} className="text-neon-green">
            {i + 1}. {m.title} ({m.totalCredits})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Leaderboard;

