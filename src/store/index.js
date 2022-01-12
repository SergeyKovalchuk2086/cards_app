import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
const domain = 'https://api.instantwebtools.net/v1/passenger';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    all_cards: [],
  },
  getters: {
    ALL_CARDS(state) {
      return state.all_cards;
    },
  },
  mutations: {
    SET_CARDS: (state, cardsArray) => (state.all_cards = state.all_cards.concat(cardsArray)),
    REMOVE_IN_STATE: (state, id) => {
      return (state.all_cards = state.all_cards.filter((item) => item._id != id));
    },
  },
  actions: {
    GET_CARDS({ commit }, page) {
      return axios({
        url: `${domain}`,
        method: 'GET',
        params: {
          page: page,
          size: 5,
        },
      })
        .then((response) => {
          commit('SET_CARDS', response.data.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    DELETE_CARD({ commit }, id) {
      return axios({
        url: `${domain}/${id}`,
        method: 'DELETE',
      });
    },
  },
  modules: {},
});
