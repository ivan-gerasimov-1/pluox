import { logGroup } from '@utils/log-group';
import { createEvent, Store } from 'effector';

export function withPersist<State>(
  store: Store<State> /* , config: PersistConfig = defaultConfig */,
) {
  logGroup(`WithPersist :: ${store.shortName}`);

  let name = store.shortName;
  // let { key, expire } = config;
  let persistKey = `@savee/store/${name}`;
  let rehydrate = createEvent('@persist/rehydrate');

  // if (expire && isExpired(expire)) {
  //   localStorage.removeItem(persistKey);
  // }

  let snapshot = localStorage.getItem(persistKey);

  if (snapshot) {
    store.on(rehydrate, () => {
      return JSON.parse(snapshot as string);
    });

    rehydrate();
  }

  store.updates.watch((state) => {
    let persistValue = JSON.stringify(state);

    localStorage.setItem(persistKey, persistValue);
  });

  return store;
}
