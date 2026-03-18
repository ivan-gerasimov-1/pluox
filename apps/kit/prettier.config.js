/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
	plugins: [
		'@ianvs/prettier-plugin-sort-imports',
		'prettier-plugin-tailwindcss',
	],

	/** prettier-plugin-tailwindcss */
	tailwindFunctions: ['cn', 'cva'],
	// tailwindStylesheet: './src/web/modules/app/components/app/app.css',

	/** @ianvs/prettier-plugin-sort-imports */
	importOrder: [
		'<BUILTIN_MODULES>',
		'',
		'<THIRD_PARTY_MODULES>',
		'',
		'^@kit/types(.*)$',
		'',
		'^@kit/utils(.*)$',
		'',
		'^@kit/hooks(.*)$',
		'',
		'^@kit(.*)$',
		'',
		'.css$',
	],
};

// oxlint-disable-next-line import/no-default-export
export default config;
