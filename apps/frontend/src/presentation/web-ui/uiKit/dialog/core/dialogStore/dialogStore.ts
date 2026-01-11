import type { IDialogStore } from '@/presentation/web-ui/uiKit/dialog/core/dialogStore/types';

export class DialogStore<T extends { id: string }> implements IDialogStore<T> {
	private readonly store: Map<string, T>;

	#snapshot: T[];

	constructor() {
		this.store = new Proxy(new Map(), {
			get: (target, property) => {
				let value = Reflect.get(target, property);

				if (typeof value === 'function') {
					return (...args: unknown[]) => {
						let result = Reflect.apply(value, target, args);

						if (['set', 'delete', 'clear'].includes(String(property))) {
							this.updateSnapshot();
						}

						return result;
					};
				}

				return value;
			},
		});

		this.#snapshot = [];
	}

	public get snapshot(): T[] {
		return this.#snapshot;
	}

	public add(item: T): T {
		this.store.set(item.id, item);

		return item;
	}

	public read(id: string): T | undefined {
		return this.store.get(id);
	}

	public update(id: string, payload: Partial<Omit<T, 'id'>>): T | undefined {
		let item = this.store.get(id);

		if (!item) {
			return undefined;
		}

		let newItem = {
			...item,
			...payload,
		};

		this.store.set(id, newItem);

		return newItem;
	}

	public remove(id: string): boolean {
		let result = this.store.delete(id);

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
