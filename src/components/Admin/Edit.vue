<template>
  <div class="m-2">
    <h4 class="my-5 text-center text-2xl text-gray-700">Update Product</h4>
    
    <div class="flex flex-col items-center">
      <div class="flex flex-col w-7/12 mt-4">
        <label class="text-xl pb-1">Name</label>
        <input type="text" v-model="$v.product.name.$model" class="px-2 border border-gray-400 rounded-md h-12 focus:outline-none">
        <validation-error :validation="$v.product.name" />
      </div>

      <div class="flex flex-col w-7/12 mt-4">
        <label class="text-xl pb-1">Description</label>
        <textarea v-model="$v.product.description.$model" class="h-56 px-2 border border-gray-400 rounded-md h-12 focus:outline-none"></textarea>
        <validation-error v-bind:validation="$v.product.description" />
      </div>

      <div class="flex flex-col w-7/12 mt-4">
        <label class="text-xl pb-1">Category</label>
        <select class="px-2 border border-gray-400 rounded-md h-12 focus:outline-none" v-model="$v.product.category.$model">
          <option v-for="category in categories" :key="category">
            {{ category }}
          </option>
        </select>
        <validation-error v-bind:validation="$v.product.category" />
      </div>

      <div class="flex flex-col w-7/12 mt-4">
        <label class="text-xl pb-1">Description</label>
        <input type="number" v-model="$v.product.price.$model" 
        class="px-2 border border-gray-400 rounded-md h-12 focus:outline-none" >
        <validation-error v-bind:validation="$v.product.price" />
      </div>

      <div class="text-center mb-20">
        <router-link to="/admin/products" 
        class="inline-block rounded-md px-4 py-3 bg-gray-600 text-gray-200 mt-4 mr-5 focus:outline-none focus:border focus:border-blue-500">Cancel</router-link>
        <button @click="handleSave" style="background: hsl(26, 100%, 55%)" class="rounded-md px-4 py-3 bg-blue-600 text-gray-200 mt-4 mr-1 focus:outline-none focus:border focus:border-blue-500">Update Product</button>
      </div>
    </div>
</div>
</template>


<script>
  import { mapState, mapActions } from 'vuex'
  import { required } from "vuelidate/lib/validators"
  import ValidationError from '@/components/ValidationError'

  export default {
    data: function() {
      return {
        product: {
          id: null,
          name: null,
          description: null,
          category: null,
          price: null
        }
      }
    },
    computed: {
      ...mapState({
        pages: state => state.pages,
        currentPage: state => state.currentPage,
        categories: state => state.categoriesData
      }),
    },
    components: {
      ValidationError
    },
    validations: {
      product: {
        name: { required },
        description: { required },
        category: { required },
        price: { required }
      }
    },
    methods: {
      ...mapActions(["updateProduct"]),
      async handleSave() {
        this.$v.$touch();
        if (! this.$v.$invalid) {
          await this.updateProduct(this.product);
          this.$router.push("/admin/products");
        }
      }
    },
    created() {
      Object.assign(this.product,
        this.$store.getters.getProductById(this.$route.params["id"]))
    }
  }
</script>