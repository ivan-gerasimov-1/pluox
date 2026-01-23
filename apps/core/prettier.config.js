/** @type {import('prettier').Config */
const config = {
	plugins: [
		'@ianvs/prettier-plugin-sort-imports',
	],

	/** @ianvs/prettier-plugin-sort-imports */
	importOrder: [
		'<BUILTIN_MODULES>',
		'',
		'<THIRD_PARTY_MODULES>',
	],
};

export default config;
