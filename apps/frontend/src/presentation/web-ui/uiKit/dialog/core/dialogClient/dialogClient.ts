import type { IDialogClient } from '@root/presentation/web-ui/uiKit/dialog/core/dialogClient/types';
import type { IDialogObserver } from '@root/presentation/web-ui/uiKit/dialog/core/dialogObserver/types';
import type { TDialog } from '@root/presentation/web-ui/uiKit/dialog/types';
import type { IDialogStore } from '@root/presentation/web-ui/uiKit/dialog/core/dialogStore/types';
import type { IIdGenerator } from '@root/presentation/web-ui/uiKit/dialog/core/types';

export class DialogClient implements IDialogClient {
	constructor(
		private readonly store: IDialogStore<TDialog>,
		private readonly observer: IDialogObserver,
		private readonly idGenerator: IIdGenerator,
	) {}

	public create(component: TDialog['component'], props?: TDialog['props']) {
		let id = this.idGenerator();

		let dialog: TDialog = {
			id,
			type: 'sheet',

			component,
			props,

			isOpen: true,

			close: () => this.close(id),
			unmount: () => this.remove(id),
		};

		this.store.add(dialog);

		this.notify();

		return dialog;
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

		this.store.update(item.id, {
			isOpen: true,
		});

		this.notify();

		return item;
	}

	public close(id: string) {
		let item = this.store.read(id);

		if (!item) {
			return;
		}

		this.store.update(item.id, {
			isOpen: false,
		});

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
