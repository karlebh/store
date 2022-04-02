<template>
  <div class="max-w-6xl m-auto">

    <div class="" v-if="!loading">
      <Carousel/>

      <ProductList class="pb-5"/>  
    </div>

    <br>
    <br>

  </div>
</template>

<script>
  // import gsap from 'gsap'
  import { mapState } from 'vuex'

  import Carousel from '@/components/Carousel'
  import ProductList from '@/components/ProductList'

  export default {

    computed: {
      ...mapState(['loading', 'products']),
    },

    components: {
      ProductList,
      Carousel,
    },

    data() {
      return {
        data: [],
        pageOfItems: []
      }
    },
  }

  
</script>
