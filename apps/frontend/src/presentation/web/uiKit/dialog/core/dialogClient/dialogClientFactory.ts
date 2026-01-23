import { nanoid } from 'nanoid';

import { DialogClient } from '@/presentation/web/uiKit/dialog/core/dialogClient/dialogClient';
import type { IDialogClient } from '@/presentation/web/uiKit/dialog/core/dialogClient/types';
import { DialogObserver } from '@/presentation/web/uiKit/dialog/core/dialogObserver/dialogObserver';
import { DialogStore } from '@/presentation/web/uiKit/dialog/core/dialogStore/dialogStore';
import type { TDialog } from '@/presentation/web/uiKit/dialog/core/types';

export function createDialogClient(): IDialogClient {
	let store = new DialogStore<TDialog>();
	let observer = new DialogObserver();
	let idGenerator = nanoid;

	return new DialogClient(store, observer, idGenerator);
}
