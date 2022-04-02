
export default {
  state: {
    authenticated: false,
  },

  mutations: {
    setAuthenticated(state) {
      let authenticated = true
      localStorage.setItem('auth', JSON.stringify({authenticated}))
      let data = JSON.parse(localStorage.getItem('auth'))
      state.authenticated = data.authenticated
    },

    clearAuthenticated(state) {
      localStorage.removeItem('auth')
      state.authenticated = false
    },

    getAuthenticated(state) {
      let data = JSON.parse(localStorage.getItem('auth'))
      if (data) {
        state.authenticated = data.authenticated
      }
    }

  },

  actions: {
    async authenticate(context) {
      context.commit('setAuthenticated')
    },

    loadAuthentication(context) {
      context.commit('getAuthenticated')
    }


  }
}