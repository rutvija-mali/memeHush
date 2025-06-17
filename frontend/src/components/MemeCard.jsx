import { upvoteMeme , downvoteMeme} from '../utils/api';

function MemeCard({ meme, onVote}) {
   const handleUpvote = async () => {
    await upvoteMeme(meme.id);
    onVote(); 
  };

  const handleDownvote = async () => {
    await downvoteMeme(meme.id);
    onVote();
  };

  return (
    <div className="bg-zinc-800 p-4 rounded shadow text-center">
      <img src={meme.image_url} alt={meme.title} className="w-full h-48 object-cover mb-2 rounded" />
      <h3 className="text-xl font-bold text-neon-green">{meme.title}</h3>
      <p className="text-sm italic text-neon-blue">{meme.caption}</p>
      <p className="text-xs mb-2">
          {meme.tags ? meme.tags.split(',').map(tag => tag.trim()).join(', ') : ''}
      </p>
       <div className="flex justify-center gap-2">
        <button onClick={handleUpvote} className="bg-neon-green px-2 py-1 text-sm hover:glitch">
          ▲ {meme.upvotes}
        </button>
        <button onClick={handleDownvote} className="bg-neon-pink px-2 py-1 text-sm hover:glitch">
          ▼ {meme.downvotes || 0}
        </button>
      </div>
    </div>
  );
}

export default MemeCard;

