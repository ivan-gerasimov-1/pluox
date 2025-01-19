import { StrictMode } from 'react';
import { RouterProvider } from 'react-router';

import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { useEffectOnce } from '@root/presentation/web-ui/hooks/useEffectOnce';
import { IRouter } from '@root/presentation/web-ui/router';

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
					<ReactQueryDevtools initialIsOpen={false} />
					<RouterProvider router={props.router} />
				</QueryClientProvider>
			</ContainerProvider>
		</StrictMode>
	);
}
