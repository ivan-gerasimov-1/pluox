import { QueryClient } from '@tanstack/react-query';

import type { IContainer } from '@root/core/infrastructure/serviceContainer/types';
import type { IUserInterface } from '@root/presentation/shared/types';
import { ReactUI } from '@root/presentation/web-ui/reactUI';
import { createAppRouter } from '@root/presentation/web-ui/router';
import { UILoader } from '@root/presentation/web-ui/uiLoader';

export function createUI(diContainer: IContainer): IUserInterface {
	let queryClient = new QueryClient();
	let appRouter = createAppRouter();
	let uiLoader = new UILoader(window.document, {
		containerId: 'loader',
	});

	let ui: IUserInterface = new ReactUI(
		window,
		uiLoader,
		queryClient,
		appRouter,
		diContainer,
		{
			containerId: 'saveeRoot',
		},
	);

	return ui;
}
