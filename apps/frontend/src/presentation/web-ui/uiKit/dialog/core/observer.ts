import type { IDisposable } from '@root/presentation/web-ui/uiKit/dialog/core/types';

type TListener = () => void;

interface IDialogObserver extends IDisposable {
	subscribe(listener: TListener): () => void;
	notify(): void;
}

export class DialogObserver implements IDialogObserver {
	private readonly listeners: Set<TListener>;

	constructor() {
		this.listeners = new Set();
	}

	public subscribe(listener: TListener) {
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
