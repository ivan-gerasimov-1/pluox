import type {
	IDialogObserver,
	TObserver,
} from '@kit/dialog/core/dialogObserver/types';

export class DialogObserver implements IDialogObserver {
	private readonly observers: Set<TObserver>;

	constructor() {
		this.observers = new Set();
	}

	public subscribe(listener: TObserver): () => void {
		this.observers.add(listener);

		return () => {
			this.observers.delete(listener);
		};
	}

	public notify(): void {
		for (let observer of this.observers) {
			observer();
		}
	}

	public dispose(): void {
		this.observers.clear();
	}
}
