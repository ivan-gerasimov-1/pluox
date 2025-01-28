import { useContext } from 'react';

import { ActionSheetContext } from '@root/presentation/web-ui/modules/app/components/actionSheet/actionSheetProvider';

export function useActionSheet() {
	let context = useContext(ActionSheetContext);

	if (!context) {
		throw new Error('useActionSheet must be used within ActionSheetProvider');
	}

	return context;
}
