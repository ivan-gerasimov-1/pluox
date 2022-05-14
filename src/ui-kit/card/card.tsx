import classnames from 'classnames';
import React from 'react';
import styles from './card.module.css';

export interface ICard {
	pressable?: boolean;
	noPadding?: boolean;
}

export function Card(props: React.PropsWithChildren<ICard>) {
	return (
		<div
			className={classnames(styles.card, {
				[styles.noPadding]: props.noPadding,
				[styles.pressableLink]: props.pressable,
			})}
		>
			{props.children}
		</div>
	);
}
