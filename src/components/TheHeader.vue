<template>
  <header v-show="! $route.path.startsWith('/thanks')" 
  id="navbar"
  class="w-full max-w-6xl bg-white dark:bg-gray-900 shadow-lg lg:shadow-none relative z-40"
  >
  <div  class="flex justify-between items-baseline py-2 px-2" >
    <div class="flex items-baseline">
      <button @click="toggleMenu" class="dark:text-gray-100 lg:hidden relative top-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <router-link class="text-3xl text-gray-900 dark:text-gray-100 font-bold mr-8" to="/">sneakers</router-link>

      <Category class="hidden lg:block"/>
    </div>

    <div class="flex">
      <div class="text-orange font-semibold hidden md:block mr-5">
        {{ Money(totalPrice) }} 
      </div>

      <DarkMode class="mr-3 sm:mr-5 hidden md:block"/>

      <Cart class="" :class="{'mr-3 lg:mr-2': authenticated}" @close-cart="toggleCart"/>

      <button class="dark:text-gray-100 mr-5 hidden md:block mb-3" @click="toggleSearchBox">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      <div>
        <router-link v-show="! authenticated" to="/login" class="dark:text-gray-100 text-gray-500 mr-3 sm:mr-5 mb-3">login</router-link>
      </div>

      <div class="mr-1 relative" v-if="authenticated">
        <button @click="toggleAccount" style="border: 2.5px solid hsl(26, 100%, 55%);" 
        class="rounded-full h-6 w-6 overflow-hidden shadow-xl">
        <img class="w-full h-full object-cover" src="@/assets/builder.png" alt="">
      </button>

      <button v-if="accountInfoOpen" @click="setAccount(false)" class="fixed w-full h-full opacity-10 inset-0 bg-transparent cursor-default"></button>

      <transition name="slide-fade">
        <div v-if="accountInfoOpen" @click="setAccount(false)" style="border-radius: 5px 10px;" class="absolute bg-gray-200 right-0 top-12 w-56 z-50 text-center flex flex-col overflow-hidden shadow-xl">
          <router-link style="border-bottom: 1.5px dashed hsl(26, 100%, 55%);" to="/admin/products" class="block text-gray-600 font-semibold tracking-wide pt-3 pb-4 hover:bg-red-100">admin</router-link>
          <!-- <router-link style="border-bottom: 1.5px dashed hsl(26, 100%, 55%);" to="/admin/orders" class="block text-gray-600 font-semibold tracking-wide pt-3 pb-4 hover:bg-red-100">orders</router-link> -->
          <button @click="handleLogout" class="inline-block font-semibold tracking-wide text-red-600 pt-3 pb-4 hover:bg-red-100">logout</button>      
        </div>
      </transition>    
    </div>

  </div>
</div>

<Transition name="slide-fade">
  <Search v-if="searchBoxOpen"/>
</Transition>
</header>




<Transition name="fade">
  <keep-alive>
    <CurtainMenu v-if="curtainMenuOpen"/>
  </keep-alive>
</Transition>

</template>

<script>
  import { mapMutations, mapState, mapGetters } from 'vuex'

  import CurtainMenu from '@/components/CurtainMenu'
  import DarkMode from '@/components/DarkMode'
  import Search from '@/components/Search'
  import Cart from '@/components/Cart'
  import Category from '@/components/Category'

  export default {
    data() {
      return {
        isOpen: false,
      }
    },

    computed: {
      ...mapGetters({
        totalItem: 'cart/totalItem',
        totalPrice: 'cart/totalPrice',
      }),
      ...mapState({
        authenticated: state => state.auth.authenticated,
      }),
      ...mapState([
        'curtainMenuOpen', 
        'cartOpen', 
        'searchBoxOpen',
        'accountInfoOpen'
        ]),
    },


    methods: {
      Money(price) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(price)
      },
      ...mapMutations([
        'clearAuthenticated',
        'toggleSearchBox',
        'toggleMenu',
        'toggleCart',
        'toggleAccount',
        'setAccount'
        ]),
      handleLogout() {
        this.clearAuthenticated()
        this.$router.push('/')
      },
    },

    components: {
      DarkMode,
      CurtainMenu,
      Cart,
      Search,
      Category
    },
    mounted() {
      let prevScrollpos = window.pageYOffset;
      window.onscroll = () => {
       this.cartOpen && this.toggleCart()
       this.searchBoxOpen && this.toggleSearchBox()
       this.accountInfoOpen && this.setAccount(false)

       let currentScrollPos = window.pageYOffset;
       if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
      } else {
        document.getElementById("navbar").style.top = "-150px";
      }
      prevScrollpos = currentScrollPos;
    }
  },
}

</script>


<style>
  #navbar {
    position: fixed; 
    top: 0; 
    transition: top 0.3s ease; 
  }
  .navbar {
    position: fixed; 
    top: 0; 
    transition: top 0.3s ease; 
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }
</style>
