import { useEffect } from 'react';

let classNames = {
	open: ['transition', 'scale-95'],
	beforeClose: ['transition', 'scale-100'],
};
let allClassNames = [...classNames.open, ...classNames.beforeClose];

export function useAppScale(isScaled: boolean): void {
	useEffect(() => {
		let appRoot = window.document.getElementById('appScreen');
		let navbar = window.document.getElementById('appNavbar');

		let animationFrame = requestAnimationFrame(() => {
			if (isScaled) {
				appRoot?.classList.add(...classNames.open);
				navbar?.classList.add(...classNames.open);
			} else {
				appRoot?.classList.add(...classNames.beforeClose);
				navbar?.classList.add(...classNames.beforeClose);
			}
		});

		return () => {
			cancelAnimationFrame(animationFrame);

			requestAnimationFrame(() => {
				appRoot?.classList.remove(...allClassNames);
				navbar?.classList.remove(...allClassNames);
			});
		};
	}, [isScaled]);
}
