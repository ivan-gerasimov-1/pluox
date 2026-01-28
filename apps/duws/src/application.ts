import { createUI } from '@/web';
import type { IWindow } from '@/web/types';

import { runMigrations } from './web/modules/main/migrations';

export async function runApplication(window: IWindow): Promise<void> {
	// let diContainer = createDIContainer({
	// 	isGlobal: true,
	// 	isDevelopment: import.meta.env.MODE === 'development',
	// });

	await runMigrations();

	// await runCore(diContainer);
	await runUI(window /** diContainer */);
}

// async function runCore(container: IContainer): Promise<void> {
// 	let launchControl = container.get(EServiceToken.LAUNCH_CONTROL);

// 	await launchControl.start();
// }

async function runUI(
	window: IWindow /**, diContainer: IContainer */,
): Promise<void> {
	const ui = await createUI(window /**, diContainer  */);

	await ui.start();
}
