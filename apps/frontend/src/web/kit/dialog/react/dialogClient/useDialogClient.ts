import { useContext } from 'react';

import { DialogClientContext } from '@kit/dialog/react/dialogClient/dialogClientProvider';

export function useDialogClient() {
	let client = useContext(DialogClientContext);

	if (!client) {
		throw new Error('useDialog must be used within DialogProvider');
	}

	return client;
}
