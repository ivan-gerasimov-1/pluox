import type { Config } from 'prettier';

import { mergeConfig } from './mergeConfig.ts';
import { sortImports } from './sortImports.ts';

type DefineConfigOptions = {
	importOrder?: string[];
	plugins?: Config[];
};

export function defineConfig({
	importOrder,
	plugins = [],
}: DefineConfigOptions = {}) {
	return mergeConfig(sortImports({ importOrder }), ...plugins);
}
