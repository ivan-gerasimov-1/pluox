import { classnames } from '@root/utils/classnames';
import React from 'react';
import styles from './card.module.css';

export interface ICard {
	touchable?: boolean;
	noPadding?: boolean;
}

export function Card(props: React.PropsWithChildren<ICard>) {
	return (
		<div
			className={classnames(styles.card, {
				[styles.noPadding]: props.noPadding,
				[styles.pressableLink]: props.touchable,
			})}
		>
			{props.children}
		</div>
	);
}
