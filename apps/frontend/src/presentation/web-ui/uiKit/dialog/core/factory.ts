import { DialogObserver } from '@root/presentation/web-ui/uiKit/dialog/core/observer';
import { DialogClient } from '@root/presentation/web-ui/uiKit/dialog/core/client';
import { DialogStore } from '@root/presentation/web-ui/uiKit/dialog/core/store';
import { TDialog } from '@root/presentation/web-ui/uiKit/dialog/types';

export function createDialogClient() {
	let store = new DialogStore<TDialog>();
	let observer = new DialogObserver();

	return new DialogClient(store, observer);
}
