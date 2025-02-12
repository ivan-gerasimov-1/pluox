import type { IDisposable } from '@root/presentation/web-ui/uiKit/dialog/core/types';

export class DialogObserver implements IDisposable {
	private readonly listeners: Set<() => void>;

	constructor() {
		this.listeners = new Set();
	}

	public subscribe(listener: () => void) {
		if (!this.listeners.has(listener)) {
			this.listeners.add(listener);
		}

		return () => {
			this.listeners.delete(listener);
		};
	}

	public notify() {
		for (let listener of this.listeners) {
			listener();
		}
	}

	public dispose() {
		this.listeners.clear();
	}
}
