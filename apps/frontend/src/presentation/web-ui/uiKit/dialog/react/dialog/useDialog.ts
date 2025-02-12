import type { IDialogApi } from '@root/presentation/web-ui/uiKit/dialog/core/types';
import { useDialogClient } from '@root/presentation/web-ui/uiKit/dialog/react/dialogClient/useDialogClient';
import { useMemo } from 'react';

export function useDialog(): {
	render: (
		component: React.FunctionComponent<{
			id: string;
			close: () => void;
		}>,
		props?: {},
	) => IDialogApi;
} {
	let client = useDialogClient();

	let dialog = useMemo(
		() => ({
			render: (
				component: React.FunctionComponent<{
					id: string;
					close: () => void;
				}>,
				props?: {},
			) => {
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
