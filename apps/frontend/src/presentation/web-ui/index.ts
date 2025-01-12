import { QueryClient } from '@tanstack/react-query';

import type { IContainer } from '@root/core/infrastructure/serviceContainer/types';
import type { IUserInterface } from '@root/presentation/shared/types';
import { ReactUI } from '@root/presentation/web-ui/reactUI';
import { createAppRouter } from '@root/presentation/web-ui/router';
import { UILoader } from '@root/presentation/web-ui/uiLoader';
import { UIElement } from '@root/presentation/web-ui/uiElement';
import type { IWindow } from '@root/presentation/web-ui/types';

export function createUI(
	window: IWindow,
	diContainer: IContainer,
): IUserInterface {
	let queryClient = new QueryClient();
	let appRouter = createAppRouter();

	let appElement = new UIElement(window.document, {
		id: 'saveeRoot',
	});
	let uiElement = new UIElement(window.document, {
		id: 'loader',
	});
	let uiLoader = new UILoader(uiElement);

	let ui: IUserInterface = new ReactUI(
		appElement,
		uiLoader,
		queryClient,
		appRouter,
		diContainer,
	);

	return ui;
}
