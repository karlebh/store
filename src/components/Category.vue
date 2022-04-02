<template>
  <div>
    <button 
    v-for="category in getCategories" 
    :key="category.id" 
    @click="getProducts(category)"
    class="inline mr-4 text-sm text-gray-500 font-semibold py-7 dark:text-gray-200"
    :class="{'border-orange-light' : category == categoryName}"
    >
    {{ category }}
  </button>
</div>
</template>

<style>
  .border-orange-light {
    border-bottom: 3.5px solid hsl(25, 100%, 55%);
  }
</style>

<script>
  import { mapGetters, mapMutations } from 'vuex'

  const URL = window.location.origin

  export default {
    data() {
      return {
        categoryName: 'All',
        items: []
      }
    },
    
    computed: {
      ...mapGetters(['getCategories']),
    },

    methods: {
      ...mapMutations(['toggleMenu', 'changeProducts']),

      async getProducts(category) {
        await fetch(`${URL}/store.json`)
        .then(response => response.json())
        .then(data => {
          if (category === 'All') {
            this.changeProducts(data.products)
          } else {
            this.items = data.products.filter(item => item.category == category)
            this.changeProducts(this.items)
          }
          this.categoryName = category
        })
      },
    }
  }
</script>