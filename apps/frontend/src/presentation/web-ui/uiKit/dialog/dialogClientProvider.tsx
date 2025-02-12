import React, { createContext, useMemo } from 'react';

import { createDialogClient } from '@root/presentation/web-ui/uiKit/dialog/core/factory';
import { DialogClient } from '@root/presentation/web-ui/uiKit/dialog/core/client';

export const DialogClientContext = createContext<DialogClient | null>(null);

type TDialogClientProviderProps = {
	children: React.ReactNode;
	client?: DialogClient;
};

export function DialogClientProvider(props: TDialogClientProviderProps) {
	let client = useMemo(() => props.client ?? createDialogClient(), []);

	return (
		<DialogClientContext.Provider value={client}>
			{props.children}
		</DialogClientContext.Provider>
	);
}
