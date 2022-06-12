import { createUI } from '@root/create-ui';
import { registerServiceWorker } from '@root/service-worker';

function main() {
	registerServiceWorker();
	createUI();
}

main();
