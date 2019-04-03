const book = {
  state: {
    fileName: ''
  },
  mutations: {
    'SET_FILENAME': (state, fileName) => {
      state.fileName = fileName
    }
  },
  actions: {
    setFilename: ({
      commit
    }, fileName) => {
      return commit('SET_FILENAME', fileName)
    }
  }
}

export default book
