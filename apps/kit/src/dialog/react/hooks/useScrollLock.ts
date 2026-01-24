import { useEffect } from 'react';

/** @deprecated */
export function useScrollLock(isLocked: boolean) {
	useEffect(() => {
		if (isLocked) {
			document.body.style.height = '100%';
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.height = 'auto';
			document.body.style.overflow = 'visible';
		}

		return () => {
			document.body.style.height = 'auto';
			document.body.style.overflow = 'visible';
		};
	}, [isLocked]);
}
