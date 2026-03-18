import { defineConfig, tailwind } from '@lv48/prettier-config';

// oxlint-disable import/no-default-export
export default defineConfig({
	plugins: [tailwind()],
	importOrder: [
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
});
