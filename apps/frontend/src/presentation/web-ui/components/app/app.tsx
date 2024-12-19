import { StrictMode } from 'react';
import { RouterProvider } from 'react-router';
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { IRouter } from '@root/presentation/web-ui/router';
import { useEffectOnce } from '@root/presentation/web-ui/hooks/useEffectOnce';

import type { IContainer } from '@root/core/infrastructure/serviceContainer/types';
import { ContainerProvider } from '@root/presentation/web-ui/modules/serviceContainer/provider';

import '@root/presentation/web-ui/root.css';

type IAppProps = {
	queryClient: QueryClient;
	router: IRouter;
	diContainer: IContainer;

	onRendered?(): void;
};

export function App(props: IAppProps) {
	useEffectOnce(() => {
		if (!props.onRendered) {
			return;
		}

		props.onRendered();
	});

	return (
		<StrictMode>
			<ContainerProvider container={props.diContainer}>
				<QueryClientProvider client={props.queryClient}>
					<RouterProvider router={props.router} />
				</QueryClientProvider>
			</ContainerProvider>
		</StrictMode>
	);
}
