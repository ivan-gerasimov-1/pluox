import { DialogClient } from '@/presentation/web-ui/uiKit/dialog/core/dialogClient/dialogClient';
import type { IDialogClient } from '@/presentation/web-ui/uiKit/dialog/core/dialogClient/types';
import { DialogObserver } from '@/presentation/web-ui/uiKit/dialog/core/dialogObserver/dialogObserver';
import { DialogStore } from '@/presentation/web-ui/uiKit/dialog/core/dialogStore/dialogStore';
import type { TDialog } from '@/presentation/web-ui/uiKit/dialog/core/types';
import { nanoid } from 'nanoid';

export function createDialogClient(): IDialogClient {
	let store = new DialogStore<TDialog>();
	let observer = new DialogObserver();
	let idGenerator = nanoid;

	return new DialogClient(store, observer, idGenerator);
}
