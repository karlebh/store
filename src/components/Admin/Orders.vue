<!-- <template>

  <div v-for="i in order.orders" :key="i">
    {{ i }}
  </div>

</template> -->


<template>
  <div class="mx-2">

    <div class="flex items-center justify-center">
      <div class="overflow-x-auto lg:overflow-hidden">
        <table class="border-collapse text-gray-700 dark:text-gray-300">
          <thead>
            <th class="px-4 py-2">ID</th>
            <th class="md:px-12 md:py-2">Name</th>
            <th class="md:px-12 md:py-2">Address</th>
            <th class="md:px-12 md:py-2">City</th>
            <th class="md:px-12 md:py-2">Items</th>
          </thead>

          <tbody>
            <tr v-for="order in order.orders" :key="order.id">
              <td class="border border-gray-300 px-4 py-2">{{ order.name }}</td>
              <td class="border border-gray-300 px-2 md:px-12 md:py-2">{{ order.address }}</td>
              <td class="border border-gray-300 px-2 md:px-12 md:py-2">{{ order.city }}</td>
              <td class="border border-gray-300 px-2 md:px-12 md:py-2">${{ order.email }}</td>
              <template v-for="item in order.items" :key="item">
                <td  class="border border-gray-300 px-2 md:px-12 md:py-2 hover:bg-gray-200 cursor-pointer">
                  {{ item.price }}
                </td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- <Pagination class="mt-5 md:-mx-0" /> -->

  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        isOpen: false
      }
    },

    computed: {
      ...mapState(['order'])
    }
  }
</script>