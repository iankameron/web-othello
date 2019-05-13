<template>
  <div id="app">
    <Board msg="This is othello"/>
  </div>
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

</style>
