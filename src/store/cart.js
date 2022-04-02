
let cart = localStorage.getItem('cart')
let cartCount = localStorage.getItem('cartCount')


export default {
  namespaced: true,
  state: {
    cartCount: cartCount ? parseInt(cartCount) : 0,
    cart: cart ? JSON.parse(cart) : [],
  },
  getters: {
    totalItem: state => state.cart.length,

    itemCount: state => state.cart.reduce((total, line) => total + line.quantity, 0),

    totalPrice: state => state.cart.reduce((total, line) => total + (line.quantity * line.product.price), 0),

  },

  mutations: {
    addProduct(state, {product, quantity}) {
      let line = state.cart.find(line => line.product.id == product.id)
      
      if (line) {
        line.quantity++
      } else {
        state.cart.push({product: product, quantity: quantity})
      }
      state.cartCount++
      this.commit('cart/saveCart')
    },

    changeQuantity(state, update) {
      update.line.quantity = update.quantity
    },

    removeProduct(state, lineToRemove) {
      let index = state.cart.findIndex(line => line == lineToRemove)
      index > -1 && state.cart.splice(index, 1)
      this.commit('cart/saveCart')
    },

    saveCart(state) {
      localStorage.setItem('cart', JSON.stringify(state.cart))
      localStorage.setItem('cartCount', JSON.stringify(cartCount))
    },

    clearCart(state) {
      localStorage.setItem('cart', JSON.stringify([]))
      localStorage.setItem('cartCount', JSON.stringify(0))
      state.cart = []

    }
  }

}