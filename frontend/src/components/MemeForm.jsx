import { useState } from 'react';
import { createMeme } from '../utils/api';

function MemeForm({ onSubmit }) {
  const [form, setForm] = useState({ title: '', image_url: '', tags: '', owner_id: 'user123' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createMeme({
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim())
    });
    setForm({ title: '', image_url: '', tags: '', owner_id: 'user123' });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 p-4 rounded shadow">
      <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Meme Title" className="w-full p-2 mb-2 bg-black text-white border border-neon-pink" required />
      <input type="text" name="image_url" value={form.image_url} onChange={handleChange} placeholder="Image URL" className="w-full p-2 mb-2 bg-black text-white border border-neon-blue" required />
      <input type="text" name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="w-full p-2 mb-2 bg-black text-white border border-neon-green" />
      <button type="submit" className="bg-neon-pink px-4 py-2 font-bold hover:glitch">Upload Meme</button>
    </form>
  );
}

export default MemeForm;