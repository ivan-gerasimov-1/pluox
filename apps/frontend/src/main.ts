import '@formatjs/intl-getcanonicallocales/polyfill';
import '@formatjs/intl-locale/polyfill';
import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/ru';
import '@formatjs/intl-numberformat/polyfill';
import '@formatjs/intl-numberformat/locale-data/en';
import '@formatjs/intl-numberformat/locale-data/ru';

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
	let diContainer = createDIContainer({
		isGlobal: true,
		isDevelopment: process.env.NODE_ENV === 'development',
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
	const ui = createUI(window, diContainer);

	registerServiceWorker();

	await ui.start();
}
