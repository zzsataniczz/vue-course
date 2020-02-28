import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import * as types from '../constants/mutation-types'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        quotes: {}
    },
    actions: {
        async getQuotePairs({commit}, params) {
            axios('/getDataByBaseQuote', {
                method: 'GET',
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    selectedQuotes: params.quotSelect
                }
            }).then((response) => {
                commit(types.GET_QUOTE_PAIRS, response.data);
            });
        }
    },
    mutations: {
        [types.GET_QUOTE_PAIRS](state, results) {
            state.quotes = results;
        }
    },
    getters: {
        getQuotePairs: (state) => state.quotes
    }
})