import type { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export type TDevToolsConfig = {
	reactScan: {
		scan: () => void;
	};
	reactQuery: {
		ReactQueryDevtools: typeof ReactQueryDevtools;
	};
};

export async function createDevToolsConfig(): Promise<TDevToolsConfig> {
	let isReactScanEnabled = import.meta.env.DEV_REACT_SCAN === 'true';
	let isReactQueryDevtoolsEnabled =
		import.meta.env.DEV_TANSTACK_QUERY_DEVTOOLS === 'true';

	let config: TDevToolsConfig = {
		reactScan: {
			scan: () => {
				//
			},
		},
		reactQuery: {
			ReactQueryDevtools: () => null,
		},
	};

	if (isReactScanEnabled) {
		let { scan } = await import('react-scan');

		config.reactScan.scan = scan;
	}

	if (isReactQueryDevtoolsEnabled) {
		let { ReactQueryDevtools } = await import('@tanstack/react-query-devtools');

		config.reactQuery.ReactQueryDevtools = ReactQueryDevtools;
	}

	return config;
}
