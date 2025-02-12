import { DialogObserver } from '@root/presentation/web-ui/modules/app/components/dialog/core/observer';
import { DialogClient } from '@root/presentation/web-ui/modules/app/components/dialog/core/client';
import { DialogStore } from '@root/presentation/web-ui/modules/app/components/dialog/core/store';
import { TDialog } from '@root/presentation/web-ui/modules/app/components/dialog/types';

export function createDialogClient() {
	let store = new DialogStore<TDialog>();
	let observer = new DialogObserver();

	return new DialogClient(store, observer);
}
