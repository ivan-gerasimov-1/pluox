import type { IContainer } from '@/core/infrastructure/serviceContainer/types';
import type { IUserInterface } from '@/presentation/shared/types';
import { createDevToolsConfig } from '@/presentation/web-ui/devtoolsConfig';
import { ReactUI } from '@/presentation/web-ui/reactUI';
import { createAppRouter } from '@/presentation/web-ui/router';
import type { IWindow } from '@/presentation/web-ui/types';
import { UIElement } from '@/presentation/web-ui/uiElement';
import { UILoader } from '@/presentation/web-ui/uiLoader';
import { QueryClient } from '@tanstack/react-query';

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
