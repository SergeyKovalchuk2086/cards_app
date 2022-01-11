import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
const domain = 'https://api.instantwebtools.net/v1/passenger'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    all_cards: []
  },
  getters: {
    ALL_CARDS(state) {
      return state.all_cards
    }
  },
  mutations: {
    SET_CARDS: (state, cardsArray) => state.all_cards = cardsArray,
    REMOVE_IN_STATE: (state, id) => {
      return state.all_cards = state.all_cards.filter(item => item._id != id)
    }
  },
  actions: {
    GET_CARDS({ commit }) {
      return axios({
        url: `${domain}`,
        method: "GET",
        params: {
          page: 1,
          size: 8,
        }
      }).then((response) => {
        commit('SET_CARDS', response.data.data)
      })
    },

    DELETE_CARD({ commit }, id) {
      return axios({
        url: `${domain}/${id}`,
        method: "DELETE",
      })
      // .then((response) => {
      //   console.log(response.status);
      //   commit('REMOVE_IN_STATE', id)
      // })
    }
  },
  modules: {
  }
})
