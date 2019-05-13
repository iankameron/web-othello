const app = require("./app");
// const db = require("./knex");
const socket = require("socket.io");
const initialGame = require("../src/utils/initialGame")
let gamesData = [];
const {makePlay} = require("../src/utils/gamelogic");

const PORT = process.env.PORT || 9000;

console.log("Starting express...");
const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

let io = socket(server);

io.on("connection", (socket) => {
  console.log("received connection from", socket.id);

  socket.on("initialize", () => {
    gamesData.push({...initialGame})
    io.sockets.emit("gameData", gamesData[0]);
  });
  
  socket.on("makePlay", (playData) => {
    gamesData[0].turn = makePlay(Number(playData.playRow), Number(playData.playColumn), gamesData[0].board, gamesData[0].turn);
    io.sockets.emit("gameData", gamesData[0]);
  })
});
