<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <notification-message
      v-if="error"
      type="yellow"
      :message="error"
      class="mb-8"
    />
    <notification-message
      v-if="success"
      type="green"
      :message="success"
      class="mb-8"
    />

    <client-only placeholder="Loading...">
      <vue-csv-import
        v-model="csv"
        :map-fields="mapFields"
        :auto-match-fields="true"
        :headers="true"
        :can-ignore="canIgnore"
        :input-class="inputClass"
        @input="handleSubmit"
      >
        <template slot="hasHeaders" slot-scope="{ headers, toggle }">
          <label>
            <input
              id="hasHeaders"
              type="checkbox"
              :value="headers"
              @change="toggle"
            />
            Headers?
          </label>
        </template>

        <template slot="error">File type is invalid</template>

        <template slot="thead">
          <tr>
            <th>My Fields</th>
            <th>Column</th>
          </tr>
        </template>

        <template slot="next" slot-scope="{ load }">
          <div class="mt-6">
            <button
              type="submit"
              class="group flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
              @click.prevent="load"
            >
              <span class="flex items-center pr-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </span>
              Upload expenses
            </button>
          </div>
        </template>

        <template slot="submit" slot-scope="{ submit }">
          <button @click.prevent="submit">send!</button>
        </template>
      </vue-csv-import>
    </client-only>
    <!-- <div>{{ csv }}</div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      csv: null,
      importUrl: `${this.$axios.defaults.baseURL}/expenses/`,
      success: null,
      error: null,
      mapFields: [
        'dateOp',
        'dateVal',
        'label',
        'category',
        'amount',
        'month',
        'isRecurring',
        'isExceptional',
        'owner',
      ],
      canIgnore: true,
      inputClass:
        'secondary-button hover:bg-indigo-50 focus:outline-none focus:border-indigo-300 focus:shadow-outline-indigo active:bg-indigo-200',
    }
  },
  methods: {
    async handleSubmit(event) {
      const data = event

      for (let index = 0; index < data.length; index++) {
        const el = data[index]

        try {
          await this.$axios.post(this.importUrl, el)
          this.error = null
          this.success = `New entry created`
        } catch (e) {
          this.error = e.response.data.message[0].messages[0].message
        }
      }
    },
  },
}
</script>

<style>
.secondary-button {
  @apply inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-indigo-700 bg-indigo-100 transition ease-in-out duration-150;
}
</style>
