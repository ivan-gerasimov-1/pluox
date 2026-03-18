import { defineConfig, tailwind } from '@lv48/prettier-config';

// oxlint-disable import/no-default-export
export default defineConfig({
	plugins: [
		tailwind({
			tailwindStylesheet: './src/web/modules/app/components/app/tailwind.css',
		}),
	],
	importOrder: [
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
		'^@/web(?!/(constants|utils|hooks|modules|components))(.*)$',
		'',
		'^@/web/constants(.*)$',
		'',
		'^@/web/utils(.*)$',
		'',
		'^@/web/hooks(.*)$',
		'',
		'^@/web/modules(.*)$',
		'',
		'^@/web/components(.*)$',
		'',
		'^@kit(.*)$',
		'',
		'.css$',
	],
});
