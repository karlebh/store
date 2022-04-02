<template>
  <div class="mt-10">
    <div class="flex flex-col items-center w-full">

      <div class="hello flex flex-col w-10/12 md:w-7/12">
        <label class="text-md pb-1">Name</label>
        <input type="text" v-model="v$.order.name.$model" class="text-gray-800 flex-grow px-2 border border-gray-400 rounded-md h-12 focus:outline-none">
        
        <div class="text-sm text-red-500" v-for="(error, index) of v$.order.name.$errors" :key="index">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <div class="mb-2 flex flex-col w-10/12 md:w-7/12">
        <label class="text-md pb-1">Email</label>
        <input type="email" v-model="v$.order.email.$model" class="text-gray-800 flex-grow px-2 border border-gray-400 rounded-md h-12 focus:outline-none">
        <div class="text-sm text-red-500" v-for="(error, index) of v$.order.email.$errors" :key="index">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <div class="mb-2 flex flex-col w-10/12 md:w-7/12">
        <label class="text-md pb-1">Address</label>
        <input type="text" v-model="v$.order.address.$model" class="text-gray-800 flex-grow px-2 border border-gray-400 rounded-md h-12 focus:outline-none">
        <div class="text-sm text-red-500" v-for="(error, index) of v$.order.address.$errors" :key="index">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <div class="mb-2 flex flex-col w-10/12 md:w-7/12">
        <label class="text-md pb-1">City</label>
        <input type="text" v-model="v$.order.city.$model" class="text-gray-800 flex-grow px-2 border border-gray-400 rounded-md h-12 focus:outline-none">
        <div class="text-sm text-red-500" v-for="(error, index) of v$.order.city.$errors" :key="index">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <div class="mb-2 flex flex-col w-10/12 md:w-7/12">
        <label class="text-md pb-1">Zip</label>
        <input type="number" v-model="v$.order.zip.$model" class="text-gray-800 flex-grow px-2 border border-gray-400 rounded-md h-12 focus:outline-none">
        <div class="text-sm text-red-500" v-for="(error, index) of v$.order.zip.$errors" :key="index">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <div class="flex mt-5">
        <router-link to="/" class="rounded-md px-4 py-2 bg-gray-700 text-gray-200 mr-7">Back</router-link>
        <button style="background: hsl(26, 100%, 55%);" @click="submitOrders" class="rounded-md px-4 py-2 text-gray-50 mr-1">Place Order</button>
      </div>

    </div>
  </div>
</template>

<script>

  import useVuelidate from '@vuelidate/core'
  import { required, email, minLength } from '@vuelidate/validators'
  import { mapMutations } from 'vuex'

  export default {
   setup () {
    return { v$: useVuelidate() }
  },

  data() {
    return {
      order: {
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        items: '',
      }
    }
  },

  validations() {
    return {
      order: {
        name: { required, min: minLength(2) },
        email: { required, email },
        address: { required },
        city: '',
        zip: ''
      }
    }
  },

  methods: {
    ...mapMutations({
      saveOrder: 'saveOrder', 
      clearCart: 'cart/clearCart'
    }),

    submitOrders() {
      this.v$.$touch()

      if(!this.v$.$invalid) {
        this.order.items = JSON.parse(JSON.stringify(this.$store.state.cart.cart[0]))
        this.saveOrder(this.order)
        this.clearCart()
        this.$router.push(`/thanks`)
      }
    }
  }


}
</script>