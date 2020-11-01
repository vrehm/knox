<template>
  <!--
    Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
    Read the documentation to get started: https://tailwindui.com/documentation
  -->
  <div class="bg-white shadow overflow-hidden sm:rounded-md">
    <ul>
      <li v-for="expense in expenses" :key="expense.id">
        <a
          href="#"
          class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
        >
          <div class="px-4 py-4 sm:px-6">
            <div class="flex items-center justify-between">
              <div
                class="text-sm leading-5 font-medium text-indigo-600 truncate"
              >
                {{ expense.label }}
              </div>
              <div class="ml-2 flex-shrink-0 flex">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="{
                    'bg-red-100 text-red-800': expense.amount < 0,
                    'bg-green-100 text-green-800': expense.amount >= 0,
                  }"
                >
                  {{ expense.amount }}€
                </span>
              </div>
            </div>
            <div class="mt-2 sm:flex sm:justify-between">
              <div class="sm:flex">
                <div
                  class="mr-6 flex items-center text-sm leading-5 text-gray-500"
                >
                  <!-- Heroicon name: chart-pie -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                  {{ expense.category }}
                </div>
                <div
                  class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0"
                >
                  <!-- Heroicon name: clock -->
                  <svg
                    v-if="expense.isRecurring"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="flex-shrink-0 mr-1.5 h-5 w-5 text-orange-400"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <!-- Heroicon name: exclamation circle -->
                  <svg
                    v-if="expense.isExceptional"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="flex-shrink-0 mr-1.5 h-5 w-5 text-orange-400"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div
                class="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mt-0"
              >
                <span
                  class="mr-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800"
                  >{{ expense.month }}</span
                >
                <!-- Heroicon name: calendar -->
                <svg
                  class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span>
                  <time :datetime="expense.dateOp">{{ expense.dateOp }}</time>
                </span>
              </div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    expenses: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      headers: [
        'label',
        // 'month',
        'amount',
        'dateOp',
        // 'dateVal',
        'tags',
        // 'isRecurring',
        'category',
      ],
    }
  },
  methods: {
    filteredProps(name) {
      const result = this.headers.filter((prop) => prop === name)
      return result
    },
  },
}
</script>
