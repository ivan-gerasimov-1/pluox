import { ReactUI, type IUserInterface } from '@root/create-ui';
import { registerServiceWorker } from '@root/service-worker';

async function main() {
	const ui: IUserInterface = new ReactUI(window, {
		containerId: 'root',
	});

	registerServiceWorker();

	await ui.mount();
}

main();
