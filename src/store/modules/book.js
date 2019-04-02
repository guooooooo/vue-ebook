const book = {
  state: {
    value: 1
  },
  mutations: {
    'SET_STATE': (state, newState) => {
      state.value = newState
    }
  },
  actions: {
    setState: ({
      commit,
      state
    }, newState) => {
      return commit('SET_STATE', newState)
    }
  }
}

export default book
