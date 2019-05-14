const app = require("./app");
// const db = require("./knex");
const socket = require("socket.io");
const initialGame = require("../src/utils/initialGame")
let gamesData = {};
const {makePlay} = require("../src/utils/gamelogic");
const shortId = require("shortid");

const PORT = process.env.PORT || 9000;

console.log("Starting express...");
const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

let io = socket(server);

io.on("connection", (socket) => {
  // console.log("received connection from", socket.id);

  socket.on("initialize", () => {
    console.log("connection from", socket.id);
    let targetGameId = "";
    
    if(Object.keys(gamesData).length > 0) {
      // find a game with only one player
      for (let gameId of Object.keys(gamesData)) {
        if (gamesData[gameId].playerSockets.length === 1) {
          //console.log("checking game of ID", gameId);
          //console.log("that games sockets", gamesData[gameId].playerSockets);
          targetGameId = gameId;
        }
      }
    }
    if (targetGameId.length > 0) {
    // store second socket, set currentPlayer
      gamesData[targetGameId].playerSockets.push(socket.id);
      gamesData[targetGameId].currentPlayer = gamesData[targetGameId].playerSockets[0];
      //console.log("should have set currentPlayer to", gamesData[targetGameId].playerSockets[0]);
      io.to(socket.id).emit("message", "You will be black and white plays first.\nPlease wait for first play.");
      io.to(gamesData[targetGameId].playerSockets[0]).emit("message", "Second player has joined. Please begin!");
    } else { //no empty cames so create a new one.
      let newGameId = shortId.generate();
      const newGame = JSON.parse(JSON.stringify(initialGame));
      newGame.gameId = newGameId;
      targetGameId = newGameId;
      newGame.playerSockets.push(socket.id);
      gamesData[newGameId] = {...newGame};
      io.to(socket.id).emit("message", "You will be white.\nPlease wait for second player");
    }

    for (let socketId of gamesData[targetGameId].playerSockets) {
      io.to(socketId).emit("gameData", gamesData[targetGameId]);
    }
    io.to(socket.id).emit("giveId", socket.id);

    // console.log(`current games ${Object.keys(gamesData)}`)
    // console.log(gamesData[targetGameId]);
    
  });
  
  socket.on("makePlay", (playData) => {
    const {gameId, newPlay} = playData;
    if ( // check for game existence and if player is in that game
      gamesData[gameId] !== undefined &&
      gamesData[gameId].playerSockets.length === 2 &&
      gamesData[gameId].currentPlayer === socket.id
    ) {
      makePlay(newPlay.playRow, newPlay.playColumn, gamesData[gameId]);
      for (let socketId of gamesData[gameId].playerSockets) {
        io.to(socketId).emit("gameData", gamesData[gameId]);
      }
    }
    else {
      io.to(socket.id).emit("message", "It isn't your turn! \n(Or some other error)")
    }
    console.log(gamesData);
  });

  socket.on("resetGames", () => {
    gamesData = {};
    console.log(gamesData);
    io.sockets.emit("message", "Please refresh page to start again");
  })
});
