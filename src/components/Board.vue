<template>
  <div>
    <table style="width:50%">
      <tr><td>Whose turn is it:</td></tr>
      <tr><td><span v-if="this.socketId !== this.currentPlayer">Not </span>Yours</td></tr>  
      <tr><td><button @click="() => resetGames()">Reset</button></td></tr>
    </table>
    <h3 id="misplay"></h3>
    <div id="board-container">
      <div v-for="(row, rindex) in this.board"  class="board-row">
        <div v-for="(square, cindex) in row" class="board-square" v-bind:id="rindex + '_' + cindex" v-on:click="clickSquare">
          <div v-bind:class="pieceClass(square)" v-bind:id="rindex + '_' + cindex"></div>
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
      // let check = makePlay(event.target, this.board, this.turn);
      // console.log(check);
      // if (check.valid) {
      //   this.$store.commit("makePlay", check.flips);
      // }
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
          return "white-piece";
        } else {
          return "black-piece";
        }
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
#board-container {
  width: 25em;
  border: 1px solid black;
}
.board-row {
  display: inline-block;
}
.board-square {
  display: inline-block;
  align-items: center;
  width: 3em;
  height: 3em;
  border: 1px solid black;
  margin: 0px;
}
.white-piece {
  display: inline-block;
  width: 2em;
  height: 2em;
  border: 1px solid black;
  border-radius: 1em;
  background-color: white;
}
.black-piece {
  display: inline-block;
  width: 2em;
  height: 2em;
  border: 1px solid black;
  border-radius: 1em;
  background-color: black;
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
    width: 30px;
}
tr {
	height: 40px;
}

</style>
