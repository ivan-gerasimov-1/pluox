import { useCallback, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';

import { EDialogStatus } from '@/presentation/web/uiKit/dialog/core/enums';
import { ActionSheet } from '@/presentation/web/uiKit/dialog/react/actionSheet/actionSheet';
import { useDialogClient } from '@/presentation/web/uiKit/dialog/react/dialogClient/useDialogClient';

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

		let Component = ActionSheet;

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
