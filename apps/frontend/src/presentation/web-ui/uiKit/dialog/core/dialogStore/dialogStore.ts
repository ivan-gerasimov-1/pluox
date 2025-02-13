import type { IDialogStore } from '@root/presentation/web-ui/uiKit/dialog/core/dialogStore/types';

export class DialogStore<T extends { id: string }> implements IDialogStore<T> {
	private readonly store: Map<string, T>;

	#snapshot: T[];

	constructor() {
		this.store = new Map();
		this.#snapshot = [];
	}

	public get snapshot(): T[] {
		return this.#snapshot;
	}

	public add(item: T): T {
		this.store.set(item.id, item);

		this.updateSnapshot();

		return item;
	}

	public read(id: string): T | undefined {
		return this.store.get(id);
	}

	public update(id: string, payload: Partial<Omit<T, 'id'>>): T | undefined {
		let item = this.store.get(id);

		if (!item) {
			return;
		}

		let newItem = {
			...item,
			...payload,
		};

		this.store.set(id, newItem);

		this.updateSnapshot();

		return newItem;
	}

	public remove(id: string): boolean {
		let result = this.store.delete(id);

		this.updateSnapshot();

		return result;
	}

	public dispose(): void {
		this.store.clear();
		this.#snapshot = [];
	}

	private updateSnapshot(): void {
		this.#snapshot = Array.from(this.store.values());
	}
}
