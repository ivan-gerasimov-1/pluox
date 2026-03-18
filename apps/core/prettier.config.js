import { defineConfig } from '@lv48/prettier-config';

// oxlint-disable import/no-default-export
export default defineConfig({
	importOrder: [
		'^@core/types(.*)$',
		'',
		'^@core/domain(.*)$',
		'',
		'^@core/infrastructure(.*)$',
		'',
		'^@core/modules(.*)$',
	],
});
