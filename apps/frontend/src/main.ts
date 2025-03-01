import { initializeSentry } from '@root/sentry';

import { createDIContainer } from '@root/diContainer';
import { createUI } from '@root/presentation/web-ui';
import { runMigrations } from '@root/migrations';
import { runMockServiceWorker } from '@root/mockServiceWorker/run';
import { registerServiceWorker } from '@root/serviceWorker';

import {
	EServiceToken,
	type IContainer,
} from '@root/core/infrastructure/serviceContainer/types';
import type { IWindow } from '@root/presentation/web-ui/types';

export async function main(window: IWindow): Promise<void> {
	initializeSentry();

	registerServiceWorker();

	let diContainer = createDIContainer({
		isGlobal: true,
		isDevelopment: import.meta.env.MODE === 'development',
	});

	runMigrations();

	await runCore(diContainer);
	await runUI(window, diContainer);
}

async function runCore(container: IContainer): Promise<void> {
	await runMockServiceWorker();

	let launchControl = container.get(EServiceToken.LAUNCH_CONTROL);

	await launchControl.start();
}

async function runUI(window: IWindow, diContainer: IContainer): Promise<void> {
	const ui = await createUI(window, diContainer);

	await ui.start();
}
