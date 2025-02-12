import React, { createContext, useMemo } from 'react';

import { createDialogClient } from '@root/presentation/web-ui/uiKit/dialog/core/dialogClient/dialogClientFactory';
import type { IDialogClient } from '@root/presentation/web-ui/uiKit/dialog/core/dialogClient/types';

export const DialogClientContext = createContext<IDialogClient | null>(null);

type TDialogClientProviderProps = {
	client?: IDialogClient;
	children: React.ReactNode;
};

export function DialogClientProvider(props: TDialogClientProviderProps) {
	let client = useMemo(() => props.client ?? createDialogClient(), []);

	return (
		<DialogClientContext.Provider value={client}>
			{props.children}
		</DialogClientContext.Provider>
	);
}
