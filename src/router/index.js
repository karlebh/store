    import { createRouter, createWebHistory } from 'vue-router'

    import store from '../store'

    import Home from '@/views/Home.vue'
    import About from '@/views/About.vue'
    import Login from '@/views/Login'
    import Search from '@/views/Search'
    import Checkout from '@/views/Checkout'
    import Admin from '@/views/Admin'

    import Product from '@/components/Admin/Product'
    import Thanks from '@/components/Thanks'
    // import Orders from '@/components/Admin/Orders'


    const auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : false

    const routes = [
    {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout
    },  
   {path: '/admin', component: Admin, 
    beforeEach(to, from, next) {
      auth ? next() : next('/login')
    },
    children: [
    {path: 'products', component: Product},
    // {path: 'orders', component: Orders},
    {path: '', component: Product},
    ],
  },
  
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter(to, from, next) {
      ! auth ? next() : next('/admin/products')
    }
  },  
  {
    path: '/',
    name: 'Home',
    component: Home
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
      next('/')
    }
  },
  {path: '/:catchAll(.*)', redirect: '/'},
  ]

  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

  export default router
