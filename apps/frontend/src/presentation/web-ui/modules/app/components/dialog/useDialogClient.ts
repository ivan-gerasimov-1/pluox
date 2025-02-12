import { useContext } from 'react';

import { DialogClientContext } from '@root/presentation/web-ui/modules/app/components/dialog/dialogClientProvider';

export function useDialogClient() {
	let client = useContext(DialogClientContext);

	if (!client) {
		throw new Error('useDialog must be used within DialogProvider');
	}

	return client;
}
