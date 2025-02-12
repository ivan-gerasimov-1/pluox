import type { IDialogPublicApi } from '@root/presentation/web-ui/modules/app/components/dialog/types';
import { useDialogClient } from '@root/presentation/web-ui/modules/app/components/dialog/useDialogClient';
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
				let sheet = client.create(component, props);

				requestAnimationFrame(() => {
					client.open(sheet.id);
				});

				return {
					id: sheet.id,
					close: sheet.close,
				};
			},
		}),
		[client],
	);

	return dialog;
}
