import { nanoid } from 'nanoid';

import { DialogClient } from '@/web/uiKit/dialog/core/dialogClient/dialogClient';
import type { IDialogClient } from '@/web/uiKit/dialog/core/dialogClient/types';
import { DialogObserver } from '@/web/uiKit/dialog/core/dialogObserver/dialogObserver';
import { DialogStore } from '@/web/uiKit/dialog/core/dialogStore/dialogStore';
import type { TDialog } from '@/web/uiKit/dialog/core/types';

export function createDialogClient(): IDialogClient {
	let store = new DialogStore<TDialog>();
	let observer = new DialogObserver();
	let idGenerator = nanoid;

	return new DialogClient(store, observer, idGenerator);
}
