import { useState } from 'react';

export function useActionSheetContainer() {
	let [isActive, setActive] = useState(false);

	function open() {
		if (isActive) {
			return;
		}

		setActive(true);
	}

	function close(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		event.stopPropagation();

		setActive(false);
	}

	return {
		isOpen: isActive,
		open,
		close,
	};
}
