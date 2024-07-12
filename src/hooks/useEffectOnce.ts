import { useRef, useEffect } from 'react';

export function useEffectOnce(callback: () => void): void {
	let isRun = useRef(false);

	useEffect(() => {
		if (isRun.current) {
			return;
		}

		isRun.current = true;

		callback();
	}, []);
}
