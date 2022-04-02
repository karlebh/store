<template>
  <tr class="border border-gray-300">
    <td class="border border-gray-300 px-0 py-0 md:px-12 md:py-2">
      <input max="1000" class="bg-gray-300 p-4 focus:outline-none focus:border-1 focus:border-blue-300 w-36" type="number" :value="qValue" @input="sendChangeEvent">
    </td>

    <td class="border border-gray-300 px-0 py-0 md:px-12 md:py-2">{{ line.product.name }}</td>

    <td class="border border-gray-300 px-0 py-0 md:px-12 md:py-2">{{ line.product.price | currency }}</td>

    <td class="border border-gray-300 px-0 py-0 md:px-12 md:py-2">{{ (line.quantity * line.product.price) | currency }}</td>

    <td class="border border-gray-300 px-0 py-0 md:px-12 md:py-2">
      <button 
      class="rounded-md px-4 py-2 text-gray-200 bg-red-500 mr-1" 
      @click="sendRemoveEvent">Remove</button>
    </td>
  </tr>
</template>

<script>
  export default {
    props: ['line'],

    data() {
      return {
        qValue: this.line.quantity,
      }
    },

    watch: {
      qValue(newValue) {
        if (newValue > 1000) { 
          this.qValue = 1000
          alert('You can\'t purchase more than 1000 units!')
        }
      }
    },

    methods: {
      sendChangeEvent($event) {
        if ($event.target.value > 0) {
          this.$emit('quantity', Number($event.target.value))
          this.qValue = $event.target.value
        } else {
          this.$emit('quantity', 1)
          this.qValue = 1
          $event.target.value = this.qValue
        }
      },

      sendRemoveEvent() {
        this.$emit('remove', this.line)
      }
    }
  }
</script>