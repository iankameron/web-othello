import Vue from 'vue'
import App from './App.vue'
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    "socket": {},
    "socketId": "",
    "windowState": "signin",
    "gameData": {}
  },
  actions: {
    play (state, playData) {
      this.state.socket.emit("makePlay", playData);
    },
    connect () {
      let initSocket = io.connect();
      initSocket.on("gameData", (gameData) => {
        this.commit("storeGameData", gameData);
      });
      // receiving messages from the server
      initSocket.on("message", (message) => {
        alert(message);
      });
      // receiving the terminal's socket ID for self-identification
      initSocket.on("giveId", (id) => {
        this.commit("setSocketId", id);
      });
      this.commit('connect', initSocket); // save socket info to state

      this.state.socket.emit("initialize"); // "log in" to a game
    },
    resetGames () {
      this.state.socket.emit("resetGames");
    }
  },
  mutations: {
    connect (state, socket) {
      state.socket = socket;
    },
    storeGameData (state, gameData) {
      state.gameData = gameData;
    },
    setSocketId (state, id) {
      state.socketId = id;
    }
  }
});

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
