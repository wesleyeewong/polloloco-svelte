/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {},
	},
	plugins: [
    plugin(function({ addVariant }) {
      addVariant("hocus", ["&:hover", "&:focus"])
    }),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    ...require('@skeletonlabs/skeleton/tailwind/skeleton.cjs')()
  ],
}
