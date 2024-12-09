import { useService } from '@modules/serviceContainer/react/useService';
import { EServiceToken } from '@modules/serviceContainer/types';

import styles from './moneyCard.module.css';

type TMoneyCardProps = {
	title: string;
	amount?: number;
	total?: number | null;
};

export function MoneyCard(props: TMoneyCardProps) {
	let intlService = useService(EServiceToken.INTL_SERVICE);

	let leftover: number | null = null;

	if (props.amount && props.total) {
		leftover = props.total - props.amount;
	}

	return (
		<>
			<h2 className={styles.title}>{props.title}</h2>

			<div className={styles.amount}>
				{props.amount ? intlService.formatCurrency(props.amount) : '—'}
			</div>

			{props.total && leftover !== null && (
				<div className={styles.leftover}>
					{intlService.formatCurrency(leftover)}
					<span> / </span>
					{intlService.formatCurrency(props.total)}
				</div>
			)}
		</>
	);
}
