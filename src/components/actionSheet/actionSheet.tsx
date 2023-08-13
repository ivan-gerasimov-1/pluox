import { Icon } from '@ui-kit/icon';
import { classnames } from '@utils/classnames';
import type React from 'react';
import styles from './actionSheet.module.css';
import backdropStyles from './backdrop.module.css';
import { useActionSheetContainer } from '@components/actionSheet/useActionSheetContainer';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';

export type TActionSheetProps = {
	isOpen?: boolean;
	onClose?(): void;
};

export function ActionSheet(props: React.PropsWithChildren<TActionSheetProps>) {
	let { isOpen, open, close } = useActionSheetContainer(props.isOpen);
	let backdropRef = useRef(null);

	function closeActionSheet(event: React.MouseEvent<any, MouseEvent>) {
		if (props.onClose) {
			props.onClose();
		}

		close(event);
	}

	return (
		<>
			<CSSTransition
				nodeRef={backdropRef}
				in={isOpen}
				timeout={250}
				classNames={{ ...backdropStyles }}
				mountOnEnter
				unmountOnExit
			>
				<div
					ref={backdropRef}
					className={classnames(backdropStyles.backdrop, {
						[styles.cursorPointer]: isOpen,
						[styles.noPointerEvents]: !isOpen,
					})}
					onClick={closeActionSheet}
				/>
			</CSSTransition>

			<div
				className={classnames(styles.actionSheetContainer, {
					[styles.isActive]: isOpen,
					[styles.cursorPointer]: !isOpen,
				})}
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
		</>
	);
}
