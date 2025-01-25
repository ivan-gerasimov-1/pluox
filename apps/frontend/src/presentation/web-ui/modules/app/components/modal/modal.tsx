/**
 * @description Work In Progress
 */
import { nanoid } from 'nanoid';
import {
	type default as React,
	createContext,
	useContext,
	useMemo,
	useRef,
	useState,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { createPortal } from 'react-dom';

import { Backdrop } from '@root/presentation/web-ui/modules/app/components/modal/backdrop/Backdrop';

import styles from './modal.module.css';

const TRANSITION_DURATION = 200;

export const ModalContext = createContext<{
	render: (
		component: (...args: any) => React.ReactElement,
		props?: any,
		options?: any,
	) => {
		id: string;
		close: () => void;
	};
} | null>(null);

export function useModal() {
	let context = useContext(ModalContext);

	if (!context) {
		throw new Error('useModal must be used within ModalProvider');
	}

	return context;
}

export function ModalProvider(props: { children: React.ReactNode }) {
	let [modals, setModals] = useState<Record<string, any>>({});

	let modalApi = useMemo(
		() => ({
			render: (component: any, props: any, options?: any) => {
				let id = nanoid();

				let close = () => {
					requestAnimationFrame(() => {
						setModals((modals) => {
							let { [id]: targetModal } = modals;

							return {
								...modals,
								[id]: {
									...targetModal,
									isExited: true,
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
							options,
							close,
							unmount,
							isExited: false,
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
						unmount={modal.unmount}
						isExited={modal.isExited}
					>
						<modal.component
							id={modal.id}
							close={modal.close}
							unmount={modal.unmount}
							{...modal.props}
						/>
					</Modal>,
					document.body,
				);
			})}
		</ModalContext.Provider>
	);
}

type TModalProps = {
	children: React.ReactNode;

	id: string;
	close: () => void;
	unmount: () => void;
	isExited: boolean;
};

export function Modal(props: TModalProps) {
	let modalRef = useRef(null);

	return (
		<>
			<Backdrop onClick={props.close} isVisible={!props.isExited} />

			<CSSTransition
				nodeRef={modalRef}
				in={!props.isExited}
				timeout={TRANSITION_DURATION}
				classNames={styles}
				onExited={props.unmount}
				appear
			>
				<div ref={modalRef} id={props.id} className={styles.modal}>
					{props.children}
				</div>
			</CSSTransition>
		</>
	);
}
