import { useContext } from 'react';

import { ModalContext } from '@root/presentation/web-ui/modules/app/components/modal/modalProvider';

export function useModal() {
	let context = useContext(ModalContext);

	if (!context) {
		throw new Error('useModal must be used within ModalProvider');
	}

	return context;
}
