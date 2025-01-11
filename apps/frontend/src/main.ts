import { createDIContainer } from '@root/diContainer';
import { createUI } from '@root/presentation/web-ui';
import { runMigrations } from '@root/migrations';
import { runMockServiceWorker } from '@root/mockServiceWorker/run';
import { registerServiceWorker } from '@root/serviceWorker';

import {
	EServiceToken,
	type IContainer,
} from '@root/core/infrastructure/serviceContainer/types';

export async function main(): Promise<void> {
	let diContainer = createDIContainer({
		isGlobal: true,
		isDevelopment: process.env.NODE_ENV === 'development',
	});

	runMigrations();

	await runCore(diContainer);
	await runUI(diContainer);
}

async function runCore(container: IContainer): Promise<void> {
	await runMockServiceWorker();

	let launchControl = container.get(EServiceToken.LAUNCH_CONTROL);

	await launchControl.start();
}

async function runUI(diContainer: IContainer): Promise<void> {
	const ui = createUI(diContainer);

	registerServiceWorker();

	await ui.start();
}
