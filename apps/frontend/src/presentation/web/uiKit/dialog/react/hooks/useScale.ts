import { useEffect } from 'react';

let classNames = {
	open: ['transition', 'scale-95'],
	beforeClose: ['transition', 'scale-100'],
};

export function useScale(isScaled: boolean): void {
	useEffect(() => {
		let elements = [
			window.document.getElementById('appScreen'),
			window.document.getElementById('appNavbar'),
		];

		let animationFrame = requestAnimationFrame(() => {
			if (isScaled) {
				for (let element of elements) {
					element?.classList.add(...classNames.open);
				}
			} else {
				for (let element of elements) {
					element?.classList.add(...classNames.beforeClose);
				}
			}
		});

		return () => {
			cancelAnimationFrame(animationFrame);

			requestAnimationFrame(() => {
				for (let element of elements) {
					element?.classList.remove(
						...classNames.open,
						...classNames.beforeClose,
					);
				}
			});
		};
	}, [isScaled]);
}
