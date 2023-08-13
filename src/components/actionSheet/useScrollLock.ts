import { useEffect } from 'react';

export function useScrollLock(isLocked: boolean) {
	useEffect(() => {
		if (isLocked) {
			document.body.style.height = '100%';
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.body.style.height = 'initial';
			document.body.style.overflow = 'initial';
		};
	}, [isLocked]);
}
