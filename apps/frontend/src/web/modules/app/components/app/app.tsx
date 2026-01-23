import { QueryClientProvider, type QueryClient } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';

import type { IContainer } from '@/core/infrastructure/serviceContainer/types';

import type { TDevToolsConfig } from '@/web/devtoolsConfig';
import { useEffectOnce } from '@/web/hooks/useEffectOnce';
import { ContainerProvider } from '@/web/modules/serviceContainer/provider';
import { IRouter } from '@/web/router';
import { Dialog } from '@/web/uiKit/dialog/react/dialog/dialog';
import { DialogClientProvider } from '@/web/uiKit/dialog/react/dialogClient/dialogClientProvider';

import '@/web/modules/app/components/app/app.css';
import '@/web/modules/app/components/app/tailwind.css';

type IAppProps = {
	queryClient: QueryClient;
	router: IRouter;
	diContainer: IContainer;
	devtoolsConfig: TDevToolsConfig;

	onRendered?(): void;
};

export function App(props: IAppProps) {
	let { ReactQueryDevtools } = props.devtoolsConfig.reactQuery;

	useEffectOnce(() => {
		props.devtoolsConfig.reactScan.scan();

		if (!props.onRendered) {
			return;
		}

		props.onRendered();
	});

	return (
		<ContainerProvider container={props.diContainer}>
			<QueryClientProvider client={props.queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />

				<DialogClientProvider>
					<RouterProvider router={props.router} />

					<Dialog />
				</DialogClientProvider>
			</QueryClientProvider>
		</ContainerProvider>
	);
}
