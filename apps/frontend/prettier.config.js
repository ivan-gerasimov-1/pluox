/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
	plugins: [
		'@ianvs/prettier-plugin-sort-imports',
		'prettier-plugin-tailwindcss',
	],

	/** prettier-plugin-tailwindcss */
	tailwindFunctions: ['clsx'],
	tailwindStylesheet:
		'./src/presentation/web/modules/app/components/app/app.css',

	/** @ianvs/prettier-plugin-sort-imports */
	importOrder: [
		'<BUILTIN_MODULES>',
		'',
		'<THIRD_PARTY_MODULES>',
		'',
		'^@/core/domain/(.*)$',
		'',
		'^@/core/infrastructure/(.*)$',
		'',
		'^@/core/modules/(.*)$',
		'',
		'^@/presentation/shared/(.*)$',
		'',
		'^@/presentation/web(.*)$',
		'',
		'.css$',
	],
};

export default config;
