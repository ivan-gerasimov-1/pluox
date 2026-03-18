import { defineConfig } from '@lv48/prettier-config';

// oxlint-disable import/no-default-export
export default defineConfig({
	importOrder: ['^#app(.*)$'],
});
