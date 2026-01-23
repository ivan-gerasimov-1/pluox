import { QueryClient } from '@tanstack/react-query';

import type { IContainer } from '@/core/infrastructure/serviceContainer/types';

import { createDevToolsConfig } from '@/web/devtoolsConfig';
import { ReactUI } from '@/web/reactUI';
import { createAppRouter } from '@/web/router';
import type { IUserInterface, IWindow } from '@/web/types';
import { UIElement } from '@/web/uiElement';
import { UILoader } from '@/web/uiLoader';

export async function createUI(
	window: IWindow,
	diContainer: IContainer,
): Promise<IUserInterface> {
	let queryClient = new QueryClient();
	let appRouter = createAppRouter();
	let devtoolsConfig = await createDevToolsConfig();

	let appElement = new UIElement(window.document, {
		id: 'pluoxRoot',
	});
	let loaderElement = new UIElement(window.document, {
		id: 'loader',
	});
	let loader = new UILoader(loaderElement);

	let ui: IUserInterface = new ReactUI(
		appElement,
		loader,
		queryClient,
		appRouter,
		devtoolsConfig,
		diContainer,
	);

	return ui;
}
