import Vue from 'vue'
import App from './App.vue'
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    "socket": {},
    "windowState": "signin",
    "gameData": {}
    // "numRows":8,
    // "numColumns":8,
    // "whiteMarker":"��",
    // "blackMarker":"��",
    // "turn":true,
    // "whiteScore":2,
    // "blackScore":2,
    // "board":
    //     [[null,null,null,null,null,null,null,null],
    //     [null,null,null,null,null,null,null,null],
    //     [null,null,null,null,null,null,null,null],
    //     [null,null,null,true,false,null,null,null],
    //     [null,null,null,false,true,null,null,null],
    //     [null,null,null,null,null,null,null,null],
    //     [null,null,null,null,null,null,null,null],
    //     [null,null,null,null,null,null,null,null]]
  },
  actions: {
    play (state, playData) {
      console.log("actions:", playData);
      this.state.socket.emit("makePlay", playData);
    },
    connect () {
      let tempsocket = io.connect();
      tempsocket.on("gameData", (gameData) => {
        this.commit("storeGameData", gameData);
      });
      this.commit('connect', tempsocket);
      this.state.socket.emit("initialize");
    }
  },
  mutations: {
    // makePlay (state, flips) {
    //   let flipPairCount = flips.length / 2;
    //   for (let flip = 0; flip < flipPairCount; flip++) {
    //     let flipRow = flips[flip*2];
    //     let flipColumn = flips[flip*2+1];
    //     state.gameData.board[flipRow][flipColumn] = state.turn;
    //   }
    //   state.gameData.turn = !state.turn;
    //   console.log(state.gameData.board, state.gameData.turn)
    // },
    connect (state, socket) {
      state.socket = socket;
    },
    storeGameData (state, gameData) {
      state.gameData = gameData;
    }
  }
});

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
