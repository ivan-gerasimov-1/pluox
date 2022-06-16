import { Store } from 'effector';
import { useStore } from 'effector-react';
import { useEffect, useState } from 'react';

export function useSelector<T extends Record<string, unknown>, K>(
	$store: Store<T>,
	selectorFn: Function,
	options?: {
		field: string;
		defaultValue: K;
	}
) {
	let store = useStore($store);
	let [result, setResult] = useState<K | undefined>(options?.defaultValue);
	let dependency = options?.field ? store[options?.field] : store;

	useEffect(() => {
		let _result = selectorFn();

		setResult(_result);
	}, [dependency]);

	return result;
}
