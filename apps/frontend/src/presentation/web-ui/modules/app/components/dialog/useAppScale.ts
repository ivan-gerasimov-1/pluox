import { useEffect } from 'react';

export function useAppScale(isScaled: boolean): void {
	useEffect(() => {
		let appRoot = window.document.getElementById('saveeRoot');

		requestAnimationFrame(() => {
			if (isScaled) {
				appRoot?.classList.add('savee-action-sheet-open');
			} else {
				appRoot?.classList.add('savee-action-sheet-before-close');
			}
		});

		return () => {
			requestAnimationFrame(() => {
				appRoot?.classList.remove(
					'savee-action-sheet-open',
					'savee-action-sheet-before-close',
				);
			});
		};
	}, [isScaled]);
}
