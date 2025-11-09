/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
	trailingComma: 'all',

	/** TailwindCSS */
	plugins: ['prettier-plugin-tailwindcss'],
	tailwindFunctions: ['clsx'],
	tailwindStylesheet:
		'./src/presentation/web-ui/modules/app/components/root/root.css',
};

export default config;
