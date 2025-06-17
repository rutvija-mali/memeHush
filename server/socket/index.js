let ioRef;

function initSocket(io) {
  ioRef = io;
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on('disconnect', () => console.log(`User disconnected: ${socket.id}`));
  });
}

function broadcastBidUpdate(bid) {
  if (ioRef) ioRef.emit('newBid', bid);
}

function broadcastVoteUpdate(memeId, upvotes) {
  if (ioRef) ioRef.emit('voteUpdate', { memeId, upvotes });
}

module.exports = initSocket;
module.exports.broadcastBidUpdate = broadcastBidUpdate;
module.exports.broadcastVoteUpdate = broadcastVoteUpdate;