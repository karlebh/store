  <template>
    <!-- ll -->
    <div @click="closeMenu" style="background: rgba(0, 0, 0, .7);" 
    class="overlay fixed z-50 inset-0 overflow-y-scroll overflow-x-hidden h-full w-full flex">
    <div class="grid w-2/3 md:w-7/12">
      <div class="px-3 py-3 bg-gray-50 dark:bg-gray-900 h-full">
        <div class="flex justify-between items-center mb-2">
          <button @click="toggleMenu" class="dark:text-gray-100">
            <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
              <path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#69707D" fill-rule="evenodd"/></svg>
            </button>
            <DarkMode class="md:hidden ml-10 mt-2"/>
          </div>

          <input autocomplete="off" id="search" type="text" v-model="searchTerm" @keydown.enter="doSearch"
          class="w-10/12 md:hidden rounded-md focus:bg-gray-100 border sm:border-r-0 border-gray-300 focus:outline-none h-12 flex-grow px-4 text-gray-900 dark:bg-gray-200" 
          placeholder="Enter Search Term">
          <button 
          v-for="category in getCategories" 
          :key="category.id" 
          @click="getProducts(category)"
          class="block text-xl mt-5 font-semibold"
          :class="{'text-red-500': category == categoryName, 'text-gray-800 dark:text-gray-200': category != categoryName}"
          >
          {{ category }}
        </button>
      </div>
    </div>
  </div>
</template>

<style>
  .text-orange {
    color: hsl(26, 100%, 55%);
  }
</style>

<script>

  import { 
    mapMutations, 
    mapGetters,
    mapState
  } from 'vuex'

  import DarkMode from '@/components/DarkMode'

  const URL = window.location.origin

  export default {
    data() {
      return {
        categoryName: 'All',
        items: [],
        searchTerm: ''
      }
    },

    components: {
      DarkMode,
    },

    computed: {
      ...mapGetters(['getCategories']),
      ...mapState(['allProducts', 'products'])
    },

    methods: {
      ...mapMutations([
        'toggleMenu', 
        'changeProducts', 
        'toggleSearchBox', 
        'setSearchTerm', 
        'setSearchResults'
        ]),

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
        this.toggleMenu()
      },

      doSearch() {
        let results = JSON.parse(JSON.stringify(this.products))
        .filter(item => item.name.toLowerCase().includes(this.searchTerm.toLowerCase()))

        this.setSearchTerm(this.searchTerm)

        if(results.length > 0) {
          this.setSearchResults(results)
          this.toggleSearchBox()
          this.toggleMenu()
          this.$router.push('/search')
        } else {
          alert("No results")
        }
      },

      closeMenu($event) {
        $event.target.classList.contains('overlay') && this.toggleMenu()
      }
    }
  }
</script>