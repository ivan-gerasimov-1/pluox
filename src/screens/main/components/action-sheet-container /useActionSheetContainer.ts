import { useState } from 'react';

export type TUseActionSheetContainer = {
	isOpen: boolean;
	open(): void;
	close(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
};

export function useActionSheetContainer(): TUseActionSheetContainer {
	let [isOpen, setOpen] = useState<boolean>(false);

	function open() {
		if (isOpen) {
			return;
		}

		setOpen(true);
	}

	function close(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		event.stopPropagation();

		setOpen(false);
	}

	return {
		isOpen,

		open,
		close,
	};
}
