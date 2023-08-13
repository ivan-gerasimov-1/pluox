import { IntlService } from '@core/infrastructure/intl/intlService/IntlService';
import styles from './money-card.module.css';

type TMoneyCardProps = {
	title: string;
	amount?: number;
	total?: number;
};

export function MoneyCard(props: TMoneyCardProps) {
	let intlService = IntlService.getInstance();

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
