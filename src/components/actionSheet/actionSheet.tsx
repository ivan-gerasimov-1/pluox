import { Icon } from '@ui-kit/icon';
import { classnames } from '@utils/classnames';
import type React from 'react';
import styles from './actionSheet.module.css';
import { useActionSheetContainer } from '@components/actionSheet/useActionSheetContainer';
import { Backdrop } from '@components/actionSheet/components/backdrop/Backdrop';
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import actionSheetContainerStyles from './actionSheetContainer.module.css';
import { useScrollLock } from '@components/actionSheet/useScrollLock';

export type TActionSheetProps = {
	isOpen?: boolean;
	onClose?(): void;
};

export function ActionSheet(props: React.PropsWithChildren<TActionSheetProps>) {
	let { isOpen, open, close } = useActionSheetContainer(props.isOpen);
	let actionSheetContainerRef = useRef(null);

	useScrollLock(isOpen);

	function closeActionSheet(event: React.MouseEvent<any, MouseEvent>) {
		if (props.onClose) {
			props.onClose();
		}

		close(event);
	}

	return (
		<>
			<Backdrop isVisible={isOpen} onClick={closeActionSheet} />

			<CSSTransition
				nodeRef={actionSheetContainerRef}
				in={isOpen}
				timeout={250}
				classNames={{ ...actionSheetContainerStyles }}
			>
				<div
					ref={actionSheetContainerRef}
					className={actionSheetContainerStyles.actionSheetContainer}
					onClick={open}
				>
					{isOpen && (
						<div className={styles.header}>
							<button
								type="button"
								className={styles.closeButton}
								onClick={closeActionSheet}
							>
								<Icon name={Icon.IconName.Close} />
							</button>
						</div>
					)}

					<div
						className={classnames(styles.actionSheetWrapper, {
							[styles.noPointerEvents]: !isOpen,
						})}
					>
						{props.children}
					</div>
				</div>
			</CSSTransition>
		</>
	);
}
