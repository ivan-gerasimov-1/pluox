import { createDIContainer } from '@root/diContainer';
import { createUI } from '@root/presentation/web-ui';
import { runMigrations } from '@root/migrations';
import { runMockServiceWorker } from '@root/mockServiceWorker/run';
import { registerServiceWorker } from '@root/serviceWorker';

import {
	EServiceToken,
	type IContainer,
} from '@root/core/infrastructure/serviceContainer/types';

async function main(): Promise<void> {
	let diContainer = await runCore();

	await runUI(diContainer);
}

main();

async function runCore(): Promise<IContainer> {
	await runMockServiceWorker();

	let diContainer = createDIContainer({
		isGlobal: true,
	});

	let launchControl = diContainer.get(EServiceToken.LAUNCH_CONTROL);

	runMigrations();

	await launchControl.start();

	return diContainer;
}

async function runUI(diContainer: IContainer): Promise<void> {
	const ui = createUI(diContainer);

	registerServiceWorker();

	await ui.start();
}
