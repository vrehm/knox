<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th
                  v-for="header in headers"
                  :key="header.id"
                  class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ header }}
                </th>
                <th class="px-6 py-3 bg-gray-50"></th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(expense, index) in expenses"
                :key="expense.id"
                :class="{
                  'bg-white': index % 2 === 0,
                  'bg-gray-50': index % 2 === 1,
                }"
                class="text-left"
              >
                <td
                  class="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                >
                  {{ expense.label }}
                </td>

                <!-- <td
                  class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
                >
                  {{ expense.month }}
                </td> -->

                <td
                  class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
                >
                  {{ expense.amount }}€
                </td>

                <td
                  class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
                >
                  {{ expense.dateOp }}
                </td>

                <!-- <td
                  class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
                >
                  {{ expense.dateVal }}
                </td> -->

                <td
                  class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
                >
                  {{ expense.isExceptional }} - {{ expense.isRecurring }}
                </td>

                <td
                  class="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500"
                >
                  {{ expense.category }}
                </td>

                <td
                  class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium"
                >
                  <a href="#" class="text-indigo-600 hover:text-indigo-900"
                    >Edit</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
