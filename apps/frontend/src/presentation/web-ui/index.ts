import { QueryClient } from '@tanstack/react-query';

import type { IContainer } from '@root/core/infrastructure/serviceContainer/types';
import type { IUserInterface } from '@root/presentation/shared/types';
import { ReactUI } from '@root/presentation/web-ui/reactUI';
import { createAppRouter } from '@root/presentation/web-ui/router';

export function createUI(diContainer: IContainer): IUserInterface {
	let queryClient = new QueryClient();
	let appRouter = createAppRouter();

	const ui: IUserInterface = new ReactUI(
		window,
		queryClient,
		appRouter,
		diContainer,
		{
			containerId: 'saveeRoot',
		},
	);

	return ui;
}
