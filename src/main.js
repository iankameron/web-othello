import Vue from 'vue'
import App from './App.vue'
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    "numRows":8,
    "numColumns":8,
    "whiteMarker":"��",
    "blackMarker":"��",
    "turn":true,
    "whiteScore":2,
    "blackScore":2,
    "board":
        [[null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,true,false,null,null,null],
        [null,null,null,false,true,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null],
        [null,null,null,null,null,null,null,null]]
  },
  mutations: {
    makePlay (state, flips) {
      let flipPairCount = flips.length / 2;
      for (let flip = 0; flip < flipPairCount; flip++) {
        let flipRow = flips[flip*2];
        let flipColumn = flips[flip*2+1];
        state.board[flipRow][flipColumn] = state.turn;
      }
      state.turn = !state.turn;
      console.log(state.board, state.turn)
    }
  }
});

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
