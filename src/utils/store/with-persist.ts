import { logger } from '@utils/log-group';
import { createEvent, Store } from 'effector';

export function withPersist<TState>(store: Store<TState>) {
	logger.group(`WithPersist`, store.shortName);

	let persistKey = getPersistKey(store.shortName);
	let rehydrateEvent = createEvent('@persist/rehydrate');

	let storeSnapshot = localStorage.getItem(persistKey);

	if (storeSnapshot) {
		store.on(rehydrateEvent, () => {
			return JSON.parse(storeSnapshot as string);
		});

		rehydrateEvent();
	}

	store.updates.watch((state) => {
		let persistValue = JSON.stringify(state);

		localStorage.setItem(persistKey, persistValue);
	});

	return store;
}

function getPersistKey(storeName: string): string {
	return `@savee/store/${storeName}`;
}
