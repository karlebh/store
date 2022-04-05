<template>
  <div class="">
    <img :id="product.id" :src="getImageUrl(product.image)"
    class="bigImage w-full max-h-72 md:max-h-96 object-cover md:max-w-sm md:rounded-lg object-fill">
    <div class="flex justify-between mt-3 mx-1 sm:mx-3 md:mx-0 overflow-x-auto">
      <img @click="changeBigImageSrc($event)" class="w-14 h-14 lg:w-20 lg:h-20 rounded-md thumbnail hover:opacity-60" src="@/assets/image-product-1.jpg" alt="">
      <img @click="changeBigImageSrc($event)" class="w-14 h-14 lg:w-20 lg:h-20 rounded-md thumbnail hover:opacity-60" src="@/assets/image-product-2.jpg" alt="">
      <img @click="changeBigImageSrc($event)" class="w-14 h-14 lg:w-20 lg:h-20 rounded-md thumbnail hover:opacity-60" src="@/assets/image-product-3.jpg" alt="">
      <img @click="changeBigImageSrc($event)" class="w-14 h-14 lg:w-20 lg:h-20 rounded-md thumbnail hover:opacity-60" src="@/assets/image-product-4.jpg" alt="">
    </div>
  </div>
</template>

<style scoped>
  .orange-border {
    border: 20px solid red !important;
  }
  .bla {
    opacity: 0 !important;
  }
</style>

<script>
  /*eslint-disable*/
  export default {
    props: ['product'],
  
    methods: {
      changeBigImageSrc(event) {
        const bigImage = document.getElementById(`${this.product.id}`)
        bigImage.src = event.target.src
      },

      getImageUrl(img) {
        return require(`../assets/${img}`) ?? require(`@/assets/image-product-1.jpg`)
      }
    }

  }
</script>