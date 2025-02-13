import type {
	IDialogObserver,
	TObserver,
} from '@root/presentation/web-ui/uiKit/dialog/core/dialogObserver/types';

export class DialogObserver implements IDialogObserver {
	private readonly observers: Set<TObserver>;

	constructor() {
		this.observers = new Set();
	}

	public subscribe(listener: TObserver): () => void {
		if (!this.observers.has(listener)) {
			this.observers.add(listener);
		}

		return () => {
			this.observers.delete(listener);
		};
	}

	public notify() {
		for (let observer of this.observers) {
			observer();
		}
	}

	public dispose() {
		this.observers.clear();
	}
}
