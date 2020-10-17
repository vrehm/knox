// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  plugins: [require('@tailwindcss/ui')],
  // These options are passed through directly to PurgeCSS
  // options: {
  //   whitelist: [
  //     'text-green-400',
  //     'text-green-700',
  //     'text-green-800',
  //     'text-yellow-400',
  //     'text-yellow-700',
  //     'text-yellow-800',
  //     'bg-green-50',
  //     'bg-yellow-50',
  //   ],
  // },
}
