import { nanoid } from 'nanoid';

import type { DialogObserver } from '@root/presentation/web-ui/uiKit/dialog/core/dialogObserver/dialogObserver';
import type { DialogStore } from '@root/presentation/web-ui/uiKit/dialog/core/store';
import type { TDialog } from '@root/presentation/web-ui/uiKit/dialog/types';

import type { IDisposable } from '@root/presentation/web-ui/uiKit/dialog/core/types';

export class DialogClient implements IDisposable {
	constructor(
		private readonly store: DialogStore<TDialog>,
		private readonly observer: DialogObserver,
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

	public remove(id: string) {
		let result = this.store.remove(id);

		this.notify();

		return result;
	}

	private notify() {
		this.observer.notify();
	}

	public subscribe(callback: () => void) {
		return this.observer.subscribe(callback);
	}

	public getSnapshot() {
		return this.store.snapshot;
	}

	public dispose() {
		this.store.dispose();
		this.observer.dispose();
	}
}
