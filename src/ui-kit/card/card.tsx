import classnames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './card.module.css';

export interface ICard {
	noPadding?: boolean;
	to?: string;
}

function PlainCard(props: React.PropsWithChildren<ICard>) {
	return (
		<div
			className={classnames(styles.card, {
				[styles.noPadding]: props.noPadding,
			})}
		>
			{props.children}
		</div>
	);
}

export function Card(props: React.PropsWithChildren<ICard>) {
	if (!props.to) {
		return <PlainCard {...props} />;
	}

	return (
		<Link
			to={props.to}
			className={classnames(styles.card, styles.cardLink, {
				[styles.noPadding]: props.noPadding,
			})}
		>
			{props.children}
		</Link>
	);
}
