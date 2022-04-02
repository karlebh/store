

let orders = localStorage.getItem('orders')

export default {
  state: {
    orders: orders ? JSON.parse(orders) : [],
  },

  getters: {
    getState(state) {
      return state
    }
  },

  mutations: {
    setOrders(state) {
      localStorage.setItem('orders', JSON.stringify(state.orders))
    },

    saveOrder(state, payload) {
      state.orders.push(payload)
      localStorage.setItem('orders', JSON.stringify(state.orders))
      return state.orders
    },

    getOrders() {
    },

    updateOrder(context, payload) {
      context.commit('changeOrderShipped', payload)
    }

  }
}