import { ReactUI } from '@root/create-ui';
import { registerServiceWorker } from '@root/service-worker';

async function main() {
	const ui = new ReactUI(window, {
		containerId: 'root',
	});

	registerServiceWorker();

	await ui.render();
}

main();
