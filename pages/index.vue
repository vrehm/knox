<template>
  <div class="container">
    <div v-if="isAuthenticated" class="w-full">
      <div class="text-xl w-full pb-12">
        {{ count }} dépenses comptabilisées.
      </div>
      <expenses-table
        v-if="count > 0"
        class="w-full mb-12"
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

    <div v-else>
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
        alt="Workflow"
      />
      <h2
        class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900"
      >
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm leading-5 text-gray-600">
        Or
        <nuxt-link
          to="/register"
          class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
        >
          sign up
        </nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async asyncData({ $axios }) {
    const {
      defaults: { baseURL },
    } = $axios
    const count = await $axios.$get(baseURL + '/expenses/count/')
    const limit = Math.round(count / 10)
    const data = await $axios.$get(baseURL + '/expenses?_limit=' + limit)
    const expenses = []

    for (const value of Object.values(data)) {
      const expense = {
        label: value.label,
        amount: value.amount,
        dateOp: value.dateOp,
        isExceptional: value.isExceptional,
        isRecurring: value.isRecurring,
        category: value.category.name,
        month: value.month,
      }
      expenses.push(expense)
    }

    return { count, limit, expenses }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  created() {
    this.$nuxt.$on('logout', () => {
      this.expenses = []
      this.count = 0
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('logout')
  },
}
</script>

<style>
.container {
  @apply min-h-screen w-full flex flex-1 flex-wrap justify-center items-center text-center mx-auto pt-24;
}
</style>
