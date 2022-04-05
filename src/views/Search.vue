<template>
  <div class="mt-14">

    <h1 class="text-center mb-5 text-lg font-semibold dark:text-gray-300">
      {{ searchResults.length }} results for 

      "{{ searchTerm }}"
    </h1>

    <div v-for="product in pageProducts" :key="product.id" 
    class="md:flex md:justify-evenly md:mx-5 lg:mx-0 mb-7">

    <ProductImage :product="product"/>

    <div class="py-10 px-4 md:max-w-md">
      <p style="color: hsl(26, 100%, 70%);" class="text-xs uppercase font-bold tracking-wider">{{ product.category }} category</p>

      <h1 class="text-4xl font-bold my-5 text-gray-900 dark:text-gray-200">{{ product.name }}</h1>

      <p class="text-gray-400 mb-5 font-md">
        {{ product.description }}
      </p>

      <div class="flex justify-between items-center md:block">
        <div class="flex items-center">
          <span class="font-semibold text-2xl mr-4 text-gray-900 dark:text-gray-200">
            {{ Money(product.price) }}
          </span>

          <span style="background: hsl(26, 100%, 94%); color: hsl(26, 100%, 55%)" class="text-semibold px-1 rounded-md">
            {{ (product.discount * 10).toFixed(0) }}%
          </span>
        </div>

        <span class="line-through text-gray-400 text-sm">
          ${{ (product.price * product.discount).toFixed(2) }}
        </span>
      </div>

      <br>

      <AddProduct :product="product"/>
    </div>

  </div>
  <br>
  <Page v-if="searchResults.length > perPage"/>
    <br>


    <div id="alert" class="hidden rounded-md bg-green-500 text-white text-lg px-10 py-5 fixed z-50 right-3 top-3">Item Added Successfully!</div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  import AddProduct from '@/components/AddProduct'
  import ProductImage from '@/components/ProductImage'
  import Page from '@/components/Page'


  export default {
    components: {
      AddProduct,
      ProductImage,
      Page
    },

    methods: {
     Money(price) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(price)
    },
  },

  computed: {
    ...mapState([
      'searchResults', 
      'searchTerm',
      'perPage',
      'currentPage'
      ]),
    pageProducts() {
      let index = (this.currentPage - 1) * this.perPage;
      return this.searchResults.slice(index, index + this.perPage);
    },
  },
}
</script>