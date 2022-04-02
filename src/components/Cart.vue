<template>
  <div class="relative z-30 text-gray-900">

    <button @click="toggleCart" class="dark:text-gray-100 relative z-50 mr-3 sm:mr-5">
      <span v-show="totalItem > 0" class="z-50 absolute -top-2 px-1 text-gray-200 font-medium text-xs rounded-full" style="background: hsl(26, 100%, 55%);">{{ totalItem }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    </button>

    <button @click="$emit('closeCart')" v-if="cartOpen" class="fixed w-full h-full z-20 inset-0 cursor-default"></button>

    <Transition name="cart-fade">
      <div v-if="cartOpen" class="absolute top-12 right-2 sm:right-5 py-6 px-4 bg-gray-50 rounded-md shadow-lg z-30 w-72 sm:w-88 md:w-96">
        <h1 class="text-lg font-bold">Cart</h1>
        <hr class="mt-3 -mb-2">
        <br>
        <div v-show="!cart.cart.length" class="text-center">
          No Item in cart!
        </div>
        <div v-show="cart.cart.length">
          <div class="flex justify-between items-center text-justify text-md  mb-1 " v-for="line in cart.cart" :key="line.id">
            <img :src="getImageUrl(line.product.image)" alt="" class="w-10 h-10 rounded-sm">
            <div class="">
              <p class="... text-gray-500">{{ line.product.name }}</p>
              <p>
                <span class="text-gray-500 mr-3">
                {{ Money(line.product.price) }} * {{ line.quantity }}</span>  
                <b>{{ Money(line.product.price * line.quantity) }}</b></p>
              </div>

              <button @click="remove(line)">
                <svg width="14" height="16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
              </button>
            </div>

            <br>

            <div class="text-center">
              <button @click="checkout" style="background: hsl(26, 100%, 55%)" class="text-gray-50 py-4 px-20 rounded-md shadow-xl inline mt-1">
                <router-link  to="/checkout">
                  Checkout
                </router-link>
              </button>
            </div>
          </div>

        </div>
      </Transition>
    </div>
  </template>


  <script>
    import { mapState, mapGetters, mapMutations } from 'vuex'

    export default {
      data() {
        return {
          isOpen: true
        }
      },
      emits: ['closeCart'],
      computed: {
        ...mapState({
          cart: state => state.cart,
          cartOpen: state => state.cartOpen,
        }),
        ...mapGetters({
          totalPrice: "cart/totalPrice",
          totalItem: 'cart/totalItem',
        }),
        Total(a,b) {
          return a * b
        }
      },

      methods: {
        checkout() {
         this.$emit('closeCart')
         this.isOpen = false
       },
       Money(price) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(price)
      },
      ...mapMutations({
        change: 'cart/changeQuantity', 
        remove: 'cart/removeProduct',
        toggleCart: 'toggleCart'
      }),
      handleQuantityChange(line, $event) {
        this.change({line, quantity: $event})
      },
      getImageUrl(img) {
        return require(`@/assets/${img}`) ?? require(`@/assets/image-product-1.jpg`)
      },
    }
  }
</script>


<style>
  .cart-fade-enter-active {
    transition: all 0.3s ease-in;
  }

  .cart-fade-leave-active {
    transition: all 0.2s ease-out;
  }

  .cart-fade-enter-from {
    transform: translateX(50px);
    opacity: 0;
  }

  .cart-fade-leave-to {
    transform: translateY(50px);
    opacity: 0;
  }
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
</style>