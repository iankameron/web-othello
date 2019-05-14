<template>
    <Board class="board" msg="This is othello"/>
</template>

<script>
import Board from './components/Board.vue'

export default {
  name: 'app',
  components: {
    Board
  },
  created: function () {
    this.$store.dispatch("connect");
  }
}
</script>

<style>
.board {
  height:100vh;
  background-image: url("./assets/wood.jpg");
  padding: 0px;
  margin: 0px;
}
</style>
