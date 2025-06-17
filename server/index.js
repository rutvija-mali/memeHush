const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();

const memeRoutes = require('./routes/memeRoutes');
const bidRoutes = require('./routes/bidRoutes');
const initSocket = require('./socket');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

initSocket(io);

const cors = require('cors');

const allowedOrigins = [
  'https://meme-hush-qw2t8dnkn-rutvija-malis-projects.vercel.app', 
  'http://localhost:5173'  
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

app.use('/memes', memeRoutes);
app.use('/bids', bidRoutes);

app.get('/', (req, res) => res.send("MemeHustle Backend Live "));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));