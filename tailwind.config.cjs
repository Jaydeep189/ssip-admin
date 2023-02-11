/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				outfit: ['Outfit', 'sans-serif']
			},
			gridColumn: {
				'span-20': 'span 20 / span 20',
				'span-19': 'span 19 / span 19',
				'span-18': 'span 18 / span 18',
				'span-17': 'span 17 / span 17',
				'span-16': 'span 16 / span 16',
				'span-15': 'span 15 / span 15',
				'span-14': 'span 14 / span 14',
				'span-13': 'span 13 / span 13'
			},
			gridTemplateColumns: {
				24: 'repeat(24, minmax(0, 1fr))'
			}
		}
	},
	plugins: [require('@tailwindcss/forms')]
};
