import { createElement, useCallback, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import { useDialogClient } from '@root/presentation/web-ui/modules/app/components/dialog/useDialogClient';

import { ActionSheet } from '@root/presentation/web-ui/modules/app/components/dialog/components/actionSheet';
import { Modal } from '@root/presentation/web-ui/modules/app/components/dialog/components/modal';
import { useAppScale } from '@root/presentation/web-ui/modules/app/components/dialog/useAppScale';

export function Dialog() {
	let client = useDialogClient();

	let actionSheets = useSyncExternalStore(
		useCallback((onStoreChange) => client.subscribe(onStoreChange), [client]),
		useCallback(() => client.getSnapshot(), [client]),
	);

	useAppScale(actionSheets.some((actionSheet) => actionSheet.isOpen));

	return actionSheets.map((actionSheet) => {
		let Component = actionSheet.type === 'sheet' ? ActionSheet : Modal;

		return createPortal(
			<Component
				id={actionSheet.id}
				close={actionSheet.close}
				onUnmount={actionSheet.unmount}
				isOpen={actionSheet.isOpen}
			>
				{createElement(actionSheet.component, {
					id: actionSheet.id,
					close: actionSheet.close,
					...actionSheet.props,
				})}
			</Component>,
			document.body,
		);
	});
}
