import { useCallback, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import {
	EDialogStatus,
	EDialogType,
} from '@root/presentation/web-ui/uiKit/dialog/core/enums';

import { useDialogClient } from '@root/presentation/web-ui/uiKit/dialog/react/dialogClient/useDialogClient';

import { ActionSheet } from '@root/presentation/web-ui/uiKit/dialog/react/actionSheet/actionSheet';
import { Modal } from '@root/presentation/web-ui/uiKit/dialog/react/modal/modal';

export function Dialog() {
	let client = useDialogClient();

	let dialogs = useSyncExternalStore(
		useCallback((onStoreChange) => client.subscribe(onStoreChange), [client]),
		useCallback(() => client.getSnapshot(), [client]),
	);

	return dialogs.map((dialog) => {
		if (dialog.status === EDialogStatus.INITIAL) {
			return null;
		}

		let Component = dialog.type === EDialogType.SHEET ? ActionSheet : Modal;

		return createPortal(
			<Component
				id={dialog.id}
				close={dialog.close}
				onUnmount={dialog.remove}
				isOpen={dialog.status === EDialogStatus.OPEN}
			>
				<dialog.component
					id={dialog.id}
					close={dialog.close}
					{...dialog.props}
				/>
			</Component>,
			document.body,
		);
	});
}
