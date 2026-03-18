import type { Config } from 'prettier';

export function mergeConfig(...configs: Config[]): Config {
	return {
		...Object.assign({}, ...configs),
		plugins: configs.flatMap((c) => c.plugins ?? []),
	};
}
