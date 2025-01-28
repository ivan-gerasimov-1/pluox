import { nanoid } from 'nanoid';
import React, {
	createContext,
	createElement,
	memo,
	useMemo,
	useState,
} from 'react';
import { createPortal } from 'react-dom';

import { Modal } from '@root/presentation/web-ui/modules/app/components/modal/modal';

export const ModalContext = createContext<{
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

type TModal = {
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

type TModalProviderProps = {
	children: React.ReactNode;
};

export function ModalProvider(props: TModalProviderProps) {
	let [modals, setModals] = useState<Record<string, TModal>>({});

	let modalApi = useMemo(
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
						setModals((modals) => {
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
						setModals((modals) => {
							let { [id]: _, ...restModals } = modals;

							return restModals;
						});
					});
				};

				requestAnimationFrame(() => {
					setModals((modals) => ({
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
		<ModalContext.Provider value={modalApi}>
			{props.children}

			{Object.values(modals).map((modal) => {
				return createPortal(
					<Modal
						id={modal.id}
						close={modal.close}
						handleUnmount={modal.unmount}
						isOpen={modal.isOpen}
					>
						{createElement(memo(modal.component), {
							id: modal.id,
							close: modal.close,
							...modal.props,
						})}
					</Modal>,
					document.body,
				);
			})}
		</ModalContext.Provider>
	);
}
