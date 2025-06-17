import axios from 'axios';

const API = 'http://localhost:5000';

export const getMemes = async () => {
  const res = await axios.get(`${API}/memes`);
  return res.data;
};

export const createMeme = async (meme) => {
  const res = await axios.post(`${API}/memes`, meme);
  return res.data;
};

export const upvoteMeme = async (id) => {
  const res = await axios.post(`${API}/memes/${id}/upvote`);
  return res.data;
};

export const placeBid = async (bid) => {
  const res = await axios.post(`${API}/bids`, bid);
  return res.data;
};

export const getLeaderboard = async () => {
  const res = await axios.get(`${API}/bids/leaderboard`);
  return res.data;
};

export const downvoteMeme = async (id) => {
  const res = await axios.post(`${API}/memes/${id}/downvote`);
  return res.data;
};
