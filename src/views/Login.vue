<template>
  <div class="m-2 mt-20">
    <h4 class="text-gray-700 dark:text-gray-200 text-center p-4 text-xl md:text-3xl">
      Sneakers Store Administration
    </h4>
    <h4 v-if="showFailureMessage" id="validatonError" class="text-red-500 text-white text-center p-4 my-2">
      Authentication Failed. Please try again.
    </h4>

    <div class="flex flex-col items-center">
      <div class="flex items-center w-11/12 md:w-7/12 mt-4 dark:text-gray-100">
        <svg class="w-6 h-6 mr-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <input type="text" v-model="v$.username.$model" class="flex-grow px-2 border border-gray-400 rounded-md h-12 dark:text-gray-900 focus:outline-none">
        <div class="text-sm text-red-500" v-for="(error, index) of v$.username.$errors" :key="index">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <div class="flex items-center w-11/12 md:w-7/12 mt-4 dark:text-gray-100">
        <svg class="w-6 h-6 mr-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
        <input type="password" class="flex-grow px-2 border border-gray-400 rounded-md h-12 dark:text-gray-900 focus:outline-none" v-model="v$.password.$model">
        <div class="text-sm text-red-500" v-for="(error, index) of v$.password.$errors" :key="index">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <div class="text-center">
        <button style="background: hsl(26, 100%, 55%);" class="rounded-md px-4 py-2 text-gray-100 mt-7 mr-4 focus:outline-none focus:border" v-on:click="handleAuth">Log In</button>
        <router-link to="/" class="bg-gray-500 rounded-md px-4 py-2 text-gray-100 mt-7 mr-4 focus:outline-none focus:border">Back</router-link>
      </div>

    </div>
  </div>
</template>

<script>
 import useVuelidate from '@vuelidate/core'
 import { required } from '@vuelidate/validators'
 import { mapActions, mapState } from 'vuex'

 export default {
  setup () {
    return { v$: useVuelidate() }
  },

  data() {
    return {
      username: 'admin',
      password: 'secret',
      showFailureMessage: false
    }
  },

  validations() {
    return {
      username: {required},
      password: {required},
    }
  },

  computed: {
    ...mapState({authenticated: state => state.auth.authenticated})
  },

    methods: {
      ...mapActions(['authenticate']),

      async handleAuth() {
        this.v$.$touch()

        
        if (this.username !== 'admin' || this.password !== 'secret') {
          this.showFailureMessage = true

          let error = document.getElementById('validatonError')
          setTimeout(() => {
            error.classList.add('hidden')
          }, 1000)

          return
        }
        
        await this.authenticate({
          name: this.username,
          password: this.password
        })

        this.authenticated 
        ? this.$router.push('/') 
        : this.showFailureMessage = true 

      }
    },

      // components: {
      //   ValidationError
      // }

    }
  </script>