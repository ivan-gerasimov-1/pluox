import { QueryClient } from '@tanstack/react-query';

import { createDevToolsConfig } from '@/web/devtoolsConfig';
import { ReactUI } from '@/web/reactUI';
import { createAppRouter } from '@/web/router';
import type { IUserInterface, IWindow } from '@/web/types';
import { UIElement } from '@/web/uiElement';

export async function createUI(
	window: IWindow,
	// diContainer: IContainer,
): Promise<IUserInterface> {
	let queryClient = new QueryClient();
	let appRouter = createAppRouter();
	let devtoolsConfig = await createDevToolsConfig();

	let appElement = new UIElement(window.document, {
		id: 'pluoxRoot',
	});

	let ui: IUserInterface = new ReactUI(
		appElement,
		queryClient,
		appRouter,
		devtoolsConfig,
	);

	return ui;
}
