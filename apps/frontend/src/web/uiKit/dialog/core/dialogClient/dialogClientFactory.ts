import { nanoid } from 'nanoid';

import { DialogClient } from '@kit/dialog/core/dialogClient/dialogClient';
import type { IDialogClient } from '@kit/dialog/core/dialogClient/types';
import { DialogObserver } from '@kit/dialog/core/dialogObserver/dialogObserver';
import { DialogStore } from '@kit/dialog/core/dialogStore/dialogStore';
import type { TDialog } from '@kit/dialog/core/types';

export function createDialogClient(): IDialogClient {
	let store = new DialogStore<TDialog>();
	let observer = new DialogObserver();
	let idGenerator = nanoid;

	return new DialogClient(store, observer, idGenerator);
}
