import { DialogClient } from '@root/presentation/web-ui/uiKit/dialog/core/dialogClient/dialogClient';
import type { IDialogClient } from '@root/presentation/web-ui/uiKit/dialog/core/dialogClient/types';
import { DialogObserver } from '@root/presentation/web-ui/uiKit/dialog/core/dialogObserver/dialogObserver';
import { DialogStore } from '@root/presentation/web-ui/uiKit/dialog/core/store';
import type { TDialog } from '@root/presentation/web-ui/uiKit/dialog/types';

export function createDialogClient(): IDialogClient {
	let store = new DialogStore<TDialog>();
	let observer = new DialogObserver();

	return new DialogClient(store, observer);
}
