<template>
  <div class="md:flex">
    <div class="flex justify-between bg-gray-100 mb-3 rounded-md py-3 md:mr-3 md:w-2/4">
      <button class="px-5" @click="decrementItemVolume">
        <svg width="12" height="4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z" id="a"/></defs><use fill="#FF7E1B" fill-rule="nonzero" xlink:href="#a"/></svg></button>

        <input type="number" @input="itemVolumeLimit" v-model="itemVolume" min="0" class="w-1/2 text-center dark:text-gray-900 bg-gray-100 focus:outline-none font-bold">

        <button class="px-5" @click="incrementItemVolume">
          <svg class="inline" width="12" height="12" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z" id="b"/></defs><use fill="#FF7E1B" fill-rule="nonzero" xlink:href="#b"/></svg></button>
        </div>

        <div class="md:w-3/4">
          <button
          style="background: hsl(26, 100%, 55%)"
          class="text-gray-100 text-lg text-center font-medium w-full py-3 rounded-md shadow-xl flex justify-center shadow-orange-600"
          @click="handleAddProduct(product)"
          >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>
            Add to cart
          </span>

        </button>
      </div>

    </div>
  </template>

  <script>

    import gsap from 'gsap'
    import { mapMutations } from 'vuex'

    export default {
      props: ['product'],

      data() {
        return {
          itemVolume: 1
        }
      },
      methods: {
        ...mapMutations({addProduct: "cart/addProduct"}),
        handleAddProduct(product) {
          this.addProduct({product: product, quantity: this.itemVolume})
          let alert = document.getElementById('alert')
          alert.classList.replace('hidden', 'block')
          gsap.from('#alert', {y: -10})
          setTimeout(() => {
            alert.classList.replace('block', 'hidden')
          }, 1000)
        },
        decrementItemVolume() {
          if (this.itemVolume < 2) {
            return 
          }
          this.itemVolume--
        },
        incrementItemVolume() {
          if (this.itemVolume >= 1000) {
            return
          }
          this.itemVolume++
        },
        itemVolumeLimit($event) {
          if ($event.target.value >= 999) {
            this.itemVolume = 1000
            return
          }
          if ($event.target.value <= 1) {
            this.itemVolume = 1
            return
          }
        }
      }
    }
  </script>

  <style scoped>
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    input[type=number] {
      -moz-appearance: none;
    }

  </style>