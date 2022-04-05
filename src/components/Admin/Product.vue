
<template>
  <br>
  <br>
	<div class="mx-2">

		<div class="flex items-center justify-center">
			<div class="overflow-x-auto">
				<table class="border-collapse text-gray-700 dark:text-gray-300">
					<thead>
						<th class="px-4 py-2">ID</th>
						<th class="md:px-12 md:py-2">Name</th>
						<th class="md:px-12 md:py-2">Category</th>
						<th class="md:px-12 md:py-2">Price</th>
						<th class="md:px-12 md:py-2">Action</th>
					</thead>

					<tbody>
						<tr v-for="product in products" :key="product.id">
							<td class="border border-gray-300 px-4 py-2">{{ product.id }}</td>
							<td class="border border-gray-300 px-2 md:px-12 md:py-2">{{ product.name }}</td>
							<td class="border border-gray-300 px-2 md:px-12 md:py-2">{{ product.category }}</td>
							<td class="border border-gray-300 px-2 md:px-12 md:py-2">${{ product.price }}</td>
							<td class="border border-gray-300 px-2 md:px-12 md:py-2">
								<button :disabled="true" 
								class="mx-2 rounded-md px-2 py-1 my-1 md:px-4 md:py-2 text-gray-100 bg-yellow-400 mr-1">
               Edit
             </button>
           </td>
         </tr>
       </tbody>
     </table>
   </div>
 </div>
 <br>
 <Pagination />
 <br>
</div>
</template>

<style scoped>
	table, th, td {
		border: .5px solid hsla(26, 100%, 55%, 0.24);
	}
	table {
		background: hsla(25, 100%, 94%, 0.15);
	}
</style>

<script>
	import Pagination from '@/components/Pagination'
	import { mapState, mapGetters } from 'vuex'

	export default {
		computed: {
			...mapState(['products']),
      ...mapGetters({products: 'pageProducts'})
    },
    components: {
      Pagination
    }
  }
</script>