
<template>
 <div class="max-w-6xl m-auto">
  <Loader v-if="loading"/>

  <TheHeader/>
  <br>
  <br class="hidden lg:block">

   <router-view class="mt-5" v-slot="slotProps">
    <Transition name="fade">
      <component :is="slotProps.Component"></component>
    </Transition>
  </router-view>
</div>
</template>


<script>
  import { mapState, mapActions, mapMutations } from 'vuex'

  import Loader from '@/components/Loader'
  import TheHeader from '@/components/TheHeader'
  
  export default {
    methods: {
      ...mapActions({getProducts: 'getProducts', loadAuth: 'loadAuthentication'}),
      ...mapMutations(['toggleCart', 'setOrders'])
    },

    computed: {
      ...mapState(['searchBoxOpen', 'cartOpen', 'loading'])
    },

    created() {
      this.getProducts(),
      this.loadAuth(),
      this.setOrders()
    },

    monuted() {
    },

    components: {
      TheHeader,
      Loader
    },
  }
</script>

<style>
  .route-enter-from,
  .route-enter-to {
    opacity: 0;
    transform: translateX(-30px);
  }

  .route-enter-active,
  .route-leave-active {
    transition:  all .15s ease-in;
  }

  .route-enter-to,
  .route-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
  .acc-fade-enter-active {
    transition: all 0.3s ease-in;
  }

  .acc-fade-leave-active {
    transition: all 0.2s ease-out;
  }

  .acc-fade-enter-from {
    transform: translateX(-50px);
    opacity: 0;
  }

  .acc-fade-leave-to {
    transform: translateX(50px);
    opacity: 0;
  }
  #navbar_1 {
    position: fixed; 
    top: 0; 
    transition: top 0.3s ease; 
  }

</style>

