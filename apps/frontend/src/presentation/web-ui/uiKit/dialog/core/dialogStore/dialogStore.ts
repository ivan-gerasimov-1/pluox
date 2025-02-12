import type { IDialogStore } from '@root/presentation/web-ui/uiKit/dialog/core/dialogStore/types';

export class DialogStore<T extends { id: string }> implements IDialogStore<T> {
	private readonly store: Map<string, T>;

	#snapshot: T[];

	constructor() {
		this.store = new Map();
		this.#snapshot = [];
	}

	public get snapshot() {
		return this.#snapshot;
	}

	public add(item: T) {
		this.store.set(item.id, item);

		this.updateShapshot();

		return item;
	}

	public read(id: string) {
		return this.store.get(id);
	}

	public remove(id: string) {
		let result = this.store.delete(id);

		this.updateShapshot();

		return result;
	}

	public dispose() {
		this.store.clear();
		this.#snapshot = [];
	}

	private updateShapshot() {
		this.#snapshot = Array.from(this.store.values());
	}
}
