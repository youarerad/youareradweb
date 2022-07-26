/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{ts,tsx}'],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: '#262626',
			white: '#ffffff',
			gray: {
				light: '#CBD5E1',
				DEFAULT: '#475569',
				dark: '#1E293B',
			},
			red: {
				light: '#FB7185',
				DEFAULT: '#E11D48',
				dark: '#BE123C',
			},
			green: {
				light: '#6ee7b7',
				DEFAULT: '#34d399',
				dark: '#10b981',
			},
			primary: {
				light: '#A78BFA',
				DEFAULT: '#8B5CF6',
				dark: '#7E22CE',
			},
			secondary: {
				light: '#60A5FA',
				DEFAULT: '#3B82F6',
				dark: '#1D4ED8',
			},
		},
		extend: {
			backgroundImage: {
				'pc-bg':
					"url('https://res.cloudinary.com/df23ubjbb/image/upload/v1658359463/Frame_5_er9l7p.svg')",
			},
			boxShadow: {
				deep: '0px 10px 0px 0px rgba(34, 24, 28, 1)',
				shallow: '0px 8px 0px 0px rgba(90, 103, 216, 1)',
				menu: 'rgb(101 119 134 / 20%) 0px 0px 15px, rgb(101 119 134 / 15%) 0px 0px 3px 1px',
			},
		},
	},
	plugins: [require('tailwindcss-fluid-type'), require('@tailwindcss/typography')],
}
