import type { OxlintConfig } from 'oxlint';
import { defineConfig } from 'oxlint';

export function extendConfig(...config: OxlintConfig[]) {
	return defineConfig({
		extends: config,
	});
}
