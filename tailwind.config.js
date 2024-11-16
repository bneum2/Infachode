/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
		  colors: {
			primary: {
			  red: '#E74C3C',
			  blue: '#3C76E7',
			  purple: '#9B59B6',
			  green: '#2ECC71',
			  orange: '#E67E22',
			},
			surface: {
			  light: '#FFFFFF',
			  dim: '#F8FAFC',
			  dark: '#1E293B'
			}
		  }
		}
	  },

	plugins: []
};
