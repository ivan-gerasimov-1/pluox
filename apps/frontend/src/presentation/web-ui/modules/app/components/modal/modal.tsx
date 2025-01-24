/**
 * @description Work In Progress
 */
import {
	type default as React,
	createContext,
	useContext,
	useMemo,
	useState,
} from 'react';
import { createPortal } from 'react-dom';

import { nanoid } from 'nanoid';

export const ModalContext = createContext<{
	render: (
		component: (...args: any) => React.ReactElement,
		payload?: any,
		options?: any,
	) => {
		id: string;
		close: () => void;
	};
} | null>(null);

export function ModalProvider(props: { children: React.ReactNode }) {
	let [modals, setModals] = useState<Record<string, any>>({});

	let modalApi = useMemo(
		() => ({
			render: (component: any, payload: any, options?: any) => {
				let id = nanoid();

				console.log('render', id, payload, options);

				let close = () => {
					setModals((modals) => {
						let { [id]: _, ...restModals } = modals;

						return restModals;
					});
				};

				setModals((modals) => ({
					...modals,
					[id]: {
						id,
						component,
						payload,
						options,
						close,
					},
				}));

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
				console.log(modal);
				return createPortal(
					<Modal id={modal.id} close={modal.close}>
						<modal.component {...modal.payload} close={modal.close} />
					</Modal>,
					document.body,
				);
			})}
		</ModalContext.Provider>
	);
}

export function useModal() {
	let context = useContext(ModalContext);

	if (!context) {
		throw new Error('useModal must be used within ModalProvider');
	}

	return context;
}

type TModalProps = {
	id: string;
	children: React.ReactNode;
	close: () => void;
};

export function Modal(props: TModalProps) {
	return (
		<>
			<div
				style={{
					position: 'fixed',
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,

					backgroundColor: 'var(--white-100_op75)',
					backdropFilter: 'blur(6px)',

					zIndex: 1,
				}}
				onClick={props.close}
			/>

			<div
				id={props.id}
				style={{
					position: 'fixed',
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,

					margin: '50px',
					padding: '15px 20px',

					backgroundColor: 'var(--white-100)',

					border: 'var(--border-100)',
					borderRadius: 'var(--br-100)',
					zIndex: 2,
				}}
			>
				{props.children}
			</div>
		</>
	);
}
