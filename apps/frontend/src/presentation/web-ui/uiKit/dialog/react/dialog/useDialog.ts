import { useMemo } from 'react';

import type {
	IDialogApi,
	TDialogComponent,
	TDialogProps,
} from '@root/presentation/web-ui/uiKit/dialog/core/types';
import { useDialogClient } from '@root/presentation/web-ui/uiKit/dialog/react/dialogClient/useDialogClient';

export function useDialog() {
	let client = useDialogClient();

	let dialog = useMemo(
		() => ({
			render: <TProps extends {}, TClosePayload extends {} = never>(
				component: TDialogComponent<TProps, TClosePayload>,
				props: TDialogProps<TProps, TClosePayload>,
			): IDialogApi => {
				let dialog = client.create(component, props);

				requestAnimationFrame(() => {
					client.open(dialog.id);
				});

				return {
					id: dialog.id,
					close: dialog.close,
				};
			},
		}),
		[client],
	);

	return dialog;
}
