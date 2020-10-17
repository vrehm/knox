<template>
  <!--
  Tailwind UI components require Tailwind CSS v1.8 and the @tailwindcss/ui plugin.
  Read the documentation to get started: https://tailwindui.com/documentation
-->
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full">
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
      <div>
        <img
          class="mx-auto h-12 w-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
          alt="Workflow"
        />
        <h2
          class="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900"
        >
          Reset your password account
        </h2>
        <p class="mt-2 text-center text-sm leading-5 text-gray-600">
          Or
          <nuxt-link
            to="/login"
            class="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            login
          </nuxt-link>
        </p>
      </div>
      <form
        v-if="!success"
        class="mt-8"
        method="POST"
        @submit.prevent="resetPassword"
      >
        <div class="rounded-md shadow-sm">
          <div>
            <input
              v-model="password1"
              aria-label="password 1"
              name="password1"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="New password"
            />
          </div>
        </div>

        <div class="rounded-md shadow-sm">
          <div class="-mt-px">
            <input
              v-model="password2"
              aria-label="password 2"
              name="password2"
              type="password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
              placeholder="Confirm new password"
            />
          </div>
        </div>

        <div class="mt-6">
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            Reset password
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  asyncData(context) {
    if (!context.route.query.code) context.redirect('/forgot-password')
    else
      return {
        code: context.route.query.code,
      }
  },
  data() {
    return {
      password1: '',
      password2: '',
      success: null,
      error: null,
    }
  },
  methods: {
    async resetPassword() {
      this.error = null
      if (this.password1 !== this.password2) {
        this.error = 'Passwords do not match.'
        return
      }
      try {
        await this.$axios.post('auth/reset-password', {
          code: this.code,
          password: this.password1,
          passwordConfirmation: this.password2,
        })
        this.success =
          'Password updated successfully. You can now use it to log in to your account.'
      } catch (e) {
        this.error = e.response.data.message[0].messages[0].message
      }
    },
  },
}
</script>
