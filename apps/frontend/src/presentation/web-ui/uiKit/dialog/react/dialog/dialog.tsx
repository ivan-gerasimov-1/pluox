import { createElement, useCallback, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import { useDialogClient } from '@root/presentation/web-ui/uiKit/dialog/react/dialogClient/useDialogClient';

import { ActionSheet } from '@root/presentation/web-ui/uiKit/dialog/react/actionSheet/actionSheet';
import { Modal } from '@root/presentation/web-ui/uiKit/dialog/react/modal/modal';
import { useAppScale } from '@root/presentation/web-ui/uiKit/dialog/react/hooks/useAppScale';

export function Dialog() {
	let client = useDialogClient();

	let dialogs = useSyncExternalStore(
		useCallback((onStoreChange) => client.subscribe(onStoreChange), [client]),
		useCallback(() => client.getSnapshot(), [client]),
	);

	useAppScale(dialogs.some((dialog) => dialog.status === 'open'));

	return dialogs.map((dialog) => {
		if (dialog.status === 'initial') {
			return null;
		}

		let Component = dialog.type === 'sheet' ? ActionSheet : Modal;

		return createPortal(
			<Component
				id={dialog.id}
				close={dialog.close}
				onUnmount={dialog.remove}
				isOpen={dialog.status === 'open'}
			>
				{createElement(dialog.component, {
					id: dialog.id,
					close: dialog.close,
					...dialog.props,
				})}
			</Component>,
			document.body,
		);
	});
}
