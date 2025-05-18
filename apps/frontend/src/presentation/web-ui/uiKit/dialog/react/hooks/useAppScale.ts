import { useEffect } from 'react';

export function useAppScale(isScaled: boolean): void {
	useEffect(() => {
		let appRoot = window.document.getElementById('pluoxRoot');

		let animationFrame = requestAnimationFrame(() => {
			if (isScaled) {
				appRoot?.classList.add('action-sheet-open');
			} else {
				appRoot?.classList.add('action-sheet-before-close');
			}
		});

		return () => {
			cancelAnimationFrame(animationFrame);

			requestAnimationFrame(() => {
				appRoot?.classList.remove(
					'action-sheet-open',
					'action-sheet-before-close',
				);
			});
		};
	}, [isScaled]);
}
