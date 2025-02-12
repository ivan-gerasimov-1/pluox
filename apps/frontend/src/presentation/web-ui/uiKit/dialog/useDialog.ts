import type { IDialogPublicApi } from '@root/presentation/web-ui/uiKit/dialog/types';
import { useDialogClient } from '@root/presentation/web-ui/uiKit/dialog/useDialogClient';
import { useMemo } from 'react';

export function useDialog(): {
	render: (
		component: React.FunctionComponent<{
			id: string;
			close: () => void;
		}>,
		props?: {},
	) => IDialogPublicApi;
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
