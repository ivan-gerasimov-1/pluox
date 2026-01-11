import { DialogClientContext } from '@/presentation/web-ui/uiKit/dialog/react/dialogClient/dialogClientProvider';
import { useContext } from 'react';

export function useDialogClient() {
	let client = useContext(DialogClientContext);

	if (!client) {
		throw new Error('useDialog must be used within DialogProvider');
	}

	return client;
}
