import { cls } from '@root/presentation/web-ui/utils/classnames';
import React from 'react';
import styles from './card.module.css';

type TCardProps = {
	touchable?: boolean;
	noPadding?: boolean;
};

export function Card(props: React.PropsWithChildren<TCardProps>) {
	return (
		<div
			className={cls(styles.card, {
				[styles.noPadding]: props.noPadding,
				[styles.pressableLink]: props.touchable,
			})}
		>
			{props.children}
		</div>
	);
}
