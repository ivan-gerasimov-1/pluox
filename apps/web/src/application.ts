import {
	EServiceToken,
	type IContainer,
} from '@pluox/core/src/infrastructure/serviceContainer/types';

import { createDIContainer } from '@/diContainer';
import { runMigrations } from '@/migrations';

import { createUI } from '@/web';
import type { IWindow } from '@/web/types';

import { initializeDemo } from '@/web/modules/previews/demoData';

export async function runApplication(window: IWindow): Promise<void> {
	let preview = import.meta.env.APP_PREVIEW === 'true';
	initializeDemo(window.localStorage, preview);

	let diContainer = createDIContainer({
		isGlobal: true,
		isDevelopment: import.meta.env.MODE === 'development',
	});

	if (!preview) runMigrations();

	await runCore(diContainer);
	await runUI(window, diContainer);
}

async function runCore(container: IContainer): Promise<void> {
	let launchControl = container.get(EServiceToken.LAUNCH_CONTROL);

	await launchControl.start();
}

async function runUI(window: IWindow, diContainer: IContainer): Promise<void> {
	const ui = await createUI(window, diContainer);

	await ui.start();
}
