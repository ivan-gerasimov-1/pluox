import { nanoid } from 'nanoid';
import React, {
	createContext,
	createElement,
	memo,
	useMemo,
	useState,
} from 'react';
import { createPortal } from 'react-dom';

import { ActionSheet } from '@root/presentation/web-ui/modules/app/components/actionSheet/actionSheet';

export const ActionSheetContext = createContext<{
	render: (
		component: React.FunctionComponent<{
			id: string;
			close: () => void;
		}>,
		props?: {},
	) => {
		id: string;
		close: () => void;
	};
} | null>(null);

type TActionSheet = {
	id: string;

	component: React.FunctionComponent<{
		id: string;
		close: () => void;
	}>;
	props?: {};

	close: () => void;
	unmount: () => void;

	isOpen: boolean;
};

type TActionSheetContextProviderProps = {
	children: React.ReactNode;
};

export function ActionSheetProvider(props: TActionSheetContextProviderProps) {
	let [actionSheets, setActionSheets] = useState<Record<string, TActionSheet>>(
		{},
	);

	let actionSheetApi = useMemo(
		() => ({
			render: (
				component: React.FunctionComponent<{
					id: string;
					close: () => void;
				}>,
				props?: {},
			) => {
				let id = nanoid();

				let close = () => {
					requestAnimationFrame(() => {
						setActionSheets((modals) => {
							let { [id]: targetModal } = modals;

							return {
								...modals,
								[id]: {
									...targetModal,
									isOpen: false,
								},
							};
						});
					});
				};

				let unmount = () => {
					requestAnimationFrame(() => {
						setActionSheets((modals) => {
							let { [id]: _, ...restModals } = modals;

							return restModals;
						});
					});
				};

				requestAnimationFrame(() => {
					setActionSheets((modals) => ({
						...modals,
						[id]: {
							id,

							component,
							props,

							close,
							isOpen: true,

							unmount,
						},
					}));
				});

				return {
					id,
					close,
				};
			},
		}),
		[],
	);

	return (
		<ActionSheetContext.Provider value={actionSheetApi}>
			{props.children}

			{Object.values(actionSheets).map((actionSheet) => {
				return createPortal(
					<ActionSheet
						id={actionSheet.id}
						close={actionSheet.close}
						handleUnmount={actionSheet.unmount}
						isOpen={actionSheet.isOpen}
					>
						{createElement(memo(actionSheet.component), {
							id: actionSheet.id,
							close: actionSheet.close,
							...actionSheet.props,
						})}
					</ActionSheet>,
					document.body,
				);
			})}
		</ActionSheetContext.Provider>
	);
}
