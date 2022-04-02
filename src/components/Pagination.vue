<!-- eslint-disable -->
<template>
  <div class="flex justify-center">
    <button :disabled="currentPage == 1"
    @click="setPage(currentPage - 1)"
    class="p-1 md:p-3 text-gray-500 rounded bg-gray-200 mx-2 shadow font-semibold">&lt;&lt;</button>

    <span v-if="currentPage > 4">
      <button @click="setPage(1)"
      class="p-1 md:p-3 text-gray-500 rounded bg-gray-200 mx-2 shadow font-semibold">1</button>
      <span class="h4">...</span>
    </span>
    <span class="mx-1">
      <button v-for="i in pageNumbers" :key="i"
     class="p-1 md:p-3 rounded bg-gray-200 mx-2 shadow font-semibold"
      :class="{'orange text-gray-100': i == currentPage, 'text-gray-500': i != currentPage }"
      @click="setPage(i)">{{ i }}</button>
    </span>
    <span v-if="currentPage <= pageCount - 4">
      <span class="h4">...</span>
      <button @click="setPage(pageCount)"
      class="p-1 md:p-3 text-gray-500 rounded bg-gray-200 mx-2 shadow font-semibold">{{ pageCount}}</button>
    </span>
    <button :disabled="currentPage == pageCount"
    @click="setPage(currentPage + 1)"
    class="p-1 md:p-3 text-gray-500 rounded bg-gray-200 mx-2 shadow font-semibold">&gt;&gt;</button>
  </div>
</template>

<style scoped>
  .orange {
    background: rgb(255, 125, 26);
  }
</style>

<script>

  import { mapState, mapMutations, mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapState(['currentPage']),
      ...mapGetters(['pageCount']),
      pageNumbers() {
        if (this.pageCount < 4) {
          return [...Array(this.pageCount + 1).keys()].slice(1);
        } else if (this.currentPage <= 4) {
          return [1, 2, 3, 4, 5];
        } else if (this.currentPage > this.pageCount - 4) {
          return [...Array(5).keys()].reverse()
          .map(v => this.pageCount - v);
        } else {
          return [this.currentPage -1, this.currentPage,
          this.currentPage + 1];
        }
      }
    },
    methods: {
      ...mapMutations(['setPages']),
      setPage(page) {
        this.setPages(page)
      },

    }

  }
</script>