import Vue from 'vue'
import Vuex from 'vuex'
import TableList from './table'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    TableList
  }
})

export default store