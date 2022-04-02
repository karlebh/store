
<template>
  <div class="flex justify-center">
    <div class="hidden md:flex w-6/12 mb-3 mt-0 items-center justify-center font-medium relative">

      <input autocomplete="off" id="search" type="text" v-model="searchTerm" @keydown.enter="doSearch"
      class="sm:rounded-l-md focus:bg-gray-100 border sm:border-r-0 border-gray-300 focus:outline-none h-12 flex-grow px-4 text-gray-900 dark:bg-gray-200" 
      placeholder="Enter Search Term">

      <button v-show="searchTerm.length > 0" class="absolute right-16 dark:text-gray-400 hidden md:block rounded-md" @click="searchTerm = ''">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 dark:fill-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
        </svg>
      </button>

      <button :disabled="searchTerm < 1" @click="doSearch" class="h-12 bg-gray-300 dark:bg-gray-400 rounded-r-md px-3 flex-shrink-0 hidden sm:block">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'

  export default {
    data() {
      return {
        searchTerm: '',
      }
    },

    computed: {
      ...mapState(['showSearch', 'products', 'searchResults'])
    },

    methods: {
      ...mapMutations(['setSearchResults', 'toggleSearchBox', 'setSearchTerm']),
      doSearch() {
        let results = JSON.parse(JSON.stringify(this.products))
        .filter(item => item.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
        this.setSearchTerm(this.searchTerm)

        if(results.length > 0) {
          this.setSearchResults(results)
          this.toggleSearchBox()
          this.$router.push('/search')
        } else {
          alert("No results")
        }
      },
    }
  }
</script>