import {
	EServiceToken,
	type IContainer,
} from '@/core/infrastructure/serviceContainer/types';
import { createDIContainer } from '@/diContainer';
import { runMigrations } from '@/migrations';
import { createUI } from '@/presentation/web-ui';
import type { IWindow } from '@/presentation/web-ui/types';

export async function app(window: IWindow): Promise<void> {
	let diContainer = createDIContainer({
		isGlobal: true,
		isDevelopment: import.meta.env.MODE === 'development',
	});

	runMigrations();

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
