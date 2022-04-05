    import { createRouter, createWebHistory } from 'vue-router'

    import store from '../store'

    import Home from '@/views/Home.vue'
    import About from '@/views/About.vue'
    import Login from '@/views/Login'
    import Search from '@/views/Search'
    import Checkout from '@/views/Checkout'

    import Product from '@/components/Admin/Product'
    import Thanks from '@/components/Thanks'

    const routes = [
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout,    
    },  
    {
      path: '/admin/products', 
      component: Product,
      meta: {requiresAuth: true},
      beforeEnter(to, from, next) {
        JSON.parse(localStorage.getItem('auth')) && next()
        next('/login')
      },  
    },

    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter(to, from, next) {
        JSON.parse(localStorage.getItem('auth')) && next('/admin/products')
        next()
      } 
    },  
    {
      path: '/',
      name: 'Home',
      component: Home,    
    },  
    {
      path: '/about',
      name: 'About',
      component: About,    
    },
    {
      path: '/thanks',
      name: 'Thanks',
      component: Thanks,    
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      beforeEnter(to, from, next) {
        store.state.searchResults.length > 0 ? next() : next('/')
      }
    },
    {path: '/:catchAll(.*)', redirect: '/'},
    ]

    const router = createRouter({
      history: createWebHistory(process.env.BASE_URL),
      routes
    })

    export default router
