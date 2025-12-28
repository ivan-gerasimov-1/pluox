import { QueryClient } from '@tanstack/react-query';

import type { IContainer } from '@root/core/infrastructure/serviceContainer/types';

import type { IUserInterface } from '@root/presentation/shared/types';

import { createDevToolsConfig } from '@root/presentation/web-ui/devtoolsConfig';
import { ReactUI } from '@root/presentation/web-ui/reactUI';
import { createAppRouter } from '@root/presentation/web-ui/router';
import type { IWindow } from '@root/presentation/web-ui/types';
import { UIElement } from '@root/presentation/web-ui/uiElement';
import { UILoader } from '@root/presentation/web-ui/uiLoader';

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
