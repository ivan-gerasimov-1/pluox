import { Icon } from '@ui-kit/icon';
import { classnames } from '@utils/classnames';
import type React from 'react';
import styles from './actionSheet.module.css';
import { useActionSheetContainer } from '@components/actionSheet/useActionSheetContainer';

export type TActionSheetProps = {
	isOpen?: boolean;
	onClose?(): void;
};

export function ActionSheet(props: React.PropsWithChildren<TActionSheetProps>) {
	let { isOpen, open, close } = useActionSheetContainer(props.isOpen);

	return (
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
						onClick={(event) => {
							if (props.onClose) {
								props.onClose();
							}

							close(event);
						}}
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
	);
}
