export const TABLE_LIST = 'TABLE_LIST'
export default {
  state: {
    tableList: []
  },
  mutations: {
    [TABLE_LIST](state, tableList) {
      state.tableList = tableList
    }
  },
  actions: {
    [TABLE_LIST]({commit}, tableList) {
      commit(TABLE_LIST, tableList)
    }
  }
}