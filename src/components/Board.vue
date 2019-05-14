<template>
  <div>
    <div id="left-pane">
      <div>
        <div class="game-title">Othello</div>
        <div class="game-info">Whose turn is it:<br />
        <span v-if="this.socketId !== this.currentPlayer">Not </span>Yours</div>
        <button class="generic-button" @click="() => resetGames()">Reset game</button>
      </div>
    </div>
    <div id="right-pane">
      <div class="green-felt">
        <div id="board-container">
          <div v-for="(row, rindex) in this.board"  class="board-row">
            <div v-for="(square, cindex) in row" class="board-square" v-bind:id="rindex + '_' + cindex" v-on:click="clickSquare">
              <div v-bind:class="pieceClass(square)" v-bind:id="rindex + '_' + cindex"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Board',
  computed: mapState ({
    board: state => state.gameData.board,
    turn: state => state.gameData.turn,
    gameId: state => state.gameData.gameId,
    socketId: state => state.socketId,
    currentPlayer: state => state.gameData.currentPlayer
  }),
  methods: {
    clickSquare (event) {
      console.log(event.target.id);
      let rowCol = event.target.id.split("_");
      let playRow = parseInt(rowCol[0]);
      let playColumn = parseInt(rowCol[1]);
      this.$store.dispatch(
        "play", 
        {
          gameId: this.gameId,
          newPlay: {
            playRow, 
            playColumn
          }
        });
    },
    resetGames () {
      this.$store.dispatch("resetGames");
    },
    pieceClass (value) {
      if (value !== null) {
        if (value) {
          return "white piece";
        } else {
          return "black piece";
        }
      } else {
        return "transparent piece";
      }
    },
    pointTo (value) {
      return value ? "<" : ">";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#left-pane {
  display: inline-block;
  width:20%;
  height:100%;
  text-align: center;
  vertical-align:middle;
}
.game-title {
  font-size: 2em;
  color: #ccc;
  text-shadow: 2px 2px 5px #000;
}
.game-info {
  font-size: 1em;
  color: #ccc;
  text-shadow: 2px 2px 5px #000;
  padding-bottom: 4em;
}
.generic-button {
  font-size: 1em;
  background-color: #ccc;
  text-shadow: 1px 1px 3px #666;

}
#right-pane {
  display: inline-block;
  padding: 0px;
  height:100%;
  vertical-align: middle;
}
.green-felt {
  background-color: #060;
  padding: 20px;
}

#board-container {
  display: inline-block;
}
.board-row {
  font-size: 0;
  margin: 0;
  padding: 0;
}
.board-square {
  display: inline-block;
  padding: 3px;
  margin: -.5px;
  border: 1px solid #030;
}
.piece {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: -1px;
}
.white {
  box-shadow: 2px 2px 5px #222;
  background-color: white;
  border: 1px solid black;
}
.black {
  box-shadow: 2px 2px 5px #222;
  background-color: black;
  border: 1px solid black;
}
.transparent {
  background-color: none;
  border: 1px solid rgba(0,0,0,0);
}

table {
	font-size: 20pt;
  color: white;
  line-height: 16pt;
}
td {
	border: 1px solid white;
    background-color: black;
    text-align: center;
    padding: 5px;
    vertical-align: bottom;
}
tr {
	height: 40px;
}

</style>
