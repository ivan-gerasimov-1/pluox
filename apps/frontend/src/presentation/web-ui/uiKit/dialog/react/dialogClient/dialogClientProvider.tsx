import React, { createContext, useMemo } from 'react';

import { createDialogClient } from '@/presentation/web-ui/uiKit/dialog/core/dialogClient/dialogClientFactory';
import type { IDialogClient } from '@/presentation/web-ui/uiKit/dialog/core/dialogClient/types';

export const DialogClientContext = createContext<IDialogClient | null>(null);

type TDialogClientProviderProps = {
	client?: IDialogClient;
};

export function DialogClientProvider(
	props: React.PropsWithChildren<TDialogClientProviderProps>,
) {
	let client = useMemo(
		() => props.client ?? createDialogClient(),
		[props.client],
	);

	return (
		<DialogClientContext.Provider value={client}>
			{props.children}
		</DialogClientContext.Provider>
	);
}
