import { useEffect } from 'react';

export function useAppScale(isScaled: boolean): void {
	useEffect(() => {
		let appRoot = window.document.getElementById('appScreen');
		let navbar = window.document.getElementById('appNavbar');

		let animationFrame = requestAnimationFrame(() => {
			if (isScaled) {
				appRoot?.classList.add('action-sheet-open');
				navbar?.classList.add('action-sheet-open');
			} else {
				appRoot?.classList.add('action-sheet-before-close');
				navbar?.classList.add('action-sheet-before-close');
			}
		});

		return () => {
			cancelAnimationFrame(animationFrame);

			requestAnimationFrame(() => {
				appRoot?.classList.remove(
					'action-sheet-open',
					'action-sheet-before-close',
				);

				navbar?.classList.remove(
					'action-sheet-open',
					'action-sheet-before-close',
				);
			});
		};
	}, [isScaled]);
}
