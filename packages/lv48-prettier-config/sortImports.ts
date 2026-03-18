interface SortImportsOptions {
	importOrder?: string[];
}

const BASE_IMPORT_ORDER = ['<BUILTIN_MODULES>', '', '<THIRD_PARTY_MODULES>'];

export function sortImports({ importOrder = [] }: SortImportsOptions = {}) {
	return {
		plugins: ['@ianvs/prettier-plugin-sort-imports'],
		importOrder:
			importOrder.length > 0
				? [...BASE_IMPORT_ORDER, '', ...importOrder]
				: BASE_IMPORT_ORDER,
	};
}
