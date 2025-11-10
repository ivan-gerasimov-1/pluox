/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
	plugins: [
		'@ianvs/prettier-plugin-sort-imports',
		'prettier-plugin-tailwindcss',
	],

	/** prettier-plugin-tailwindcss */
	tailwindFunctions: ['clsx'],
	tailwindStylesheet:
		'./src/presentation/web-ui/modules/app/components/root/root.css',

	/** @ianvs/prettier-plugin-sort-imports */
	importOrder: [
		'<BUILTIN_MODULES>',
		'',
		'<THIRD_PARTY_MODULES>',
		'',
		'^@root/core/domain/(.*)$',
		'',
		'^@root/core/infrastructure/(.*)$',
		'',
		'^@root/core/modules/(.*)$',
		'',
		'^@root/presentation/shared/(.*)$',
		'',
		'^@root/presentation/web-ui(.*)$',
		'',
		'.css$',
	],
};

export default config;
