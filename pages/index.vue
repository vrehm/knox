<template>
  <div class="container">
    <div class="text-xl w-full pb-12">{{ count }} dépenses comptabilisées.</div>
    <expenses-table
      v-if="count > 0"
      class="w-full pb-12"
      :expenses="expenses"
    />

    <div v-else>
      <nuxt-link to="/import/csv/">
        <span class="rounded-md shadow-sm">
          <button
            type="button"
            class="relative inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-600 active:bg-indigo-600 transition duration-150 ease-in-out"
          >
            <!-- Heroicon name: plus -->
            <svg
              class="-ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Import expenses with CSV</span>
          </button>
        </span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const {
      defaults: { baseURL },
    } = $axios
    const count = await $axios.$get(baseURL + '/expenses/count/')
    const expenses = await $axios.$get(baseURL + '/expenses?_limit=-1')
    return { count, expenses }
  },
}
</script>

<style>
.container {
  @apply h-screen w-full flex flex-1 flex-wrap justify-center items-center text-center mx-auto pt-24;
}
</style>
