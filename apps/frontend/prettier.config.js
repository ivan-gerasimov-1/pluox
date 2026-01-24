/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
	plugins: [
		'@ianvs/prettier-plugin-sort-imports',
		'prettier-plugin-tailwindcss',
	],

	/** prettier-plugin-tailwindcss */
	tailwindFunctions: ['cn', 'cva'],
	tailwindStylesheet: './src/web/modules/app/components/app/app.css',

	/** @ianvs/prettier-plugin-sort-imports */
	importOrder: [
		'<BUILTIN_MODULES>',
		'',
		'<THIRD_PARTY_MODULES>',
		'',
		'^@core/types(.*)$',
		'',
		'^@core/domain(.*)$',
		'',
		'^@core/infrastructure(.*)$',
		'',
		'^@core/modules(.*)$',
		'',
		'^@/(?!web)(.*)$',
		'',
		'^@/web(?!/(constants|utils|hooks|modules|uiKit))(.*)$',
		'',
		'^@/web/constants(.*)$',
		'',
		'^@/web/utils(.*)$',
		'',
		'^@/web/hooks(.*)$',
		'',
		'^@/web/modules(.*)$',
		'',
		'^@kit(.*)$',
		'',
		'.css$',
	],
};

export default config;
