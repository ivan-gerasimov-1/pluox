import type { IContainer } from '@/core/infrastructure/serviceContainer/types';
import type { TDevToolsConfig } from '@/presentation/web-ui/devtoolsConfig';
import { useEffectOnce } from '@/presentation/web-ui/hooks/useEffectOnce';
import { ContainerProvider } from '@/presentation/web-ui/modules/serviceContainer/provider';
import { IRouter } from '@/presentation/web-ui/router';
import { Dialog } from '@/presentation/web-ui/uiKit/dialog/react/dialog/dialog';
import { DialogClientProvider } from '@/presentation/web-ui/uiKit/dialog/react/dialogClient/dialogClientProvider';
import { QueryClientProvider, type QueryClient } from '@tanstack/react-query';
import { RouterProvider } from 'react-router';

import '@/presentation/web-ui/modules/app/components/app/app.css';
import '@/presentation/web-ui/modules/app/components/app/tailwind.css';

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
