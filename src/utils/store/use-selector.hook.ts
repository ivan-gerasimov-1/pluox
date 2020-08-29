import { Store } from 'effector';
import { useStore } from 'effector-react';
import * as React from 'react';

export function useSelector<T extends { [key: string]: any }, K>(
  $store: Store<T>,
  selectorFn: Function,
  options?: {
    field: string;
    defaultValue: K;
  },
) {
  let store = useStore($store);
  let [result, setResult] = React.useState<K | undefined>(
    options?.defaultValue,
  );
  let dependency = options?.field ? store[options?.field] : store;

  React.useLayoutEffect(() => {
    let _result = selectorFn();

    setResult(_result);
  }, [dependency]);

  return result;
}
