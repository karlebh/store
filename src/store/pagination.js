

export default {
  state: {
    
  },
  getters: {
    getPageProducts(state, page) {
      let start, end
      let currPage = page
      let itemsPerPage = 10
      let totalItems = 499

      start = (currPage - 1) * itemsPerPage 
      end = totalItems

      if (itemsPerPage < totalItems) {
        end = itemsPerPage * currPage
        if (end > totalItems) {
          end = totalItems;
        }
      }
      state.pageProducts = state.products.slice(start - 1, end)
      return state.pageProducts
    },

  },

  mutations: {
    setPages(state, page) {
      state.start = page * 10
      state.end = page * 10 + 10
    },


  }

}