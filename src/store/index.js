import { createStore } from 'vuex'

import cart from './cart'
import auth from './auth'
import order from './order'
import pagination from './pagination'

const URL = window.location.origin

export default createStore({

  state: {
    categories: [],
    currentPage: 1,
    pageSize: 4,
    currentCategory: 'All',
    products: [],
    pageCount: 0,
    allProducts: [],
    pageProducts: [],
    serverPageCount: 0,
    showSearch: false,
    cartOpen: false,
    curtainMenuOpen: false,
    searchBoxOpen: false,
    accountInfoOpen: false,
    loading: false,
    searchResults: [],
    searchTerm: '',
    perPage: 10,
    totalItems: '',
  },
  getters: {
    getProducts: state => state.products,
    getCategories: state => ['All', ...state.categories],
    pageProducts: state => {
      let index = (state.currentPage - 1) * state.perPage;
      return state.products.slice(index, index + state.perPage);
    },
    pageCount: state => Math.ceil(state.products.length / state.perPage)
  },

  mutations: {
    setPages(state, page) {
      state.currentPage = page
    },

    toggleCart(state) {
      state.cartOpen = !state.cartOpen
    },

    toggleAccount(state) {
      state.accountInfoOpen = !state.accountInfoOpen
    },

    setAccount(state, payload) {
      state.accountInfoOpen = payload
    },

    toggleMenu(state) {
      state.curtainMenuOpen = !state.curtainMenuOpen
    },

    toggleSearchBox(state) {
      state.searchBoxOpen = !state.searchBoxOpen
    },

    setSearchResults(state, payload) {
      state.searchResults = payload
    },

    setSearchTerm(state, payload) {
      state.searchTerm = payload
    },

    loadProducts(state, payload) {
      state.allProducts = payload
      state.products = state.allProducts
    },

    changeProducts(state, payload) {
      state.products = payload
      state.pageCount = Math.ceil(state.products / 10)
    },

    loadCategories(state, payload) {
      state.categories = payload
    },

    setOrders(state) {
      localStorage.setItem('orders', "[]")
      state.orders = JSON.parse(localStorage.getItem('orders'))
    },

    setPageProducts(state, page) {
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
  actions: {
    async getProducts({ commit, state }) {
      state.loading = true
      await fetch(`${URL}/store.json`)
      .then(response => response.json())
      .then(data => {
        commit('loadProducts', data.products)
        commit('loadCategories', data.categories)
        state.loading = false
      })
    },
  },
  modules: {
    cart,
    auth,
    order,
    pagination
  }
})



