import { nanoid } from 'nanoid';

import type { IDialogClient } from '@root/presentation/web-ui/uiKit/dialog/core/dialogClient/types';
import type { IDialogObserver } from '@root/presentation/web-ui/uiKit/dialog/core/dialogObserver/types';
import type { DialogStore } from '@root/presentation/web-ui/uiKit/dialog/core/store';
import type { TDialog } from '@root/presentation/web-ui/uiKit/dialog/types';

export class DialogClient implements IDialogClient {
	constructor(
		private readonly store: DialogStore<TDialog>,
		private readonly observer: IDialogObserver,
	) {}

	public create(component: TDialog['component'], props?: TDialog['props']) {
		let id = nanoid();

		let item: TDialog = {
			id,
			type: 'sheet',

			component,
			props,

			isOpen: true,

			close: () => this.close(id),
			unmount: () => this.remove(id),
		};

		let actionSheet = this.store.add(item);

		this.notify();

		return actionSheet;
	}

	public remove(id: string) {
		let result = this.store.remove(id);

		this.notify();

		return result;
	}

	public open(id: string) {
		let item = this.store.read(id);

		if (!item || item?.isOpen) {
			return;
		}

		item.isOpen = true;

		this.store.add(item);

		this.notify();

		return item;
	}

	public close(id: string) {
		let item = this.store.read(id);

		if (!item) {
			return;
		}

		item.isOpen = false;

		this.store.add(item);

		this.notify();

		return item;
	}

	public getSnapshot() {
		return this.store.snapshot;
	}

	public dispose() {
		this.store.dispose();
		this.observer.dispose();
	}

	public subscribe(listener: () => void) {
		return this.observer.subscribe(listener);
	}

	private notify() {
		this.observer.notify();
	}
}
