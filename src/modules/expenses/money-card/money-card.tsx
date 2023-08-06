import { IntlService } from '@core/infrastructure/intl/IntlService';
import styles from './money-card.module.css';

type TMoneyCardProps = {
	title: string;
	amount?: number;
};

export function MoneyCard(props: TMoneyCardProps) {
	let intlService = IntlService.getInstance();

	return (
		<>
			<h2 className={styles.title}>{props.title}</h2>

			<div className={styles.amount}>
				{props.amount ? intlService.formatCurrency(props.amount) : '—'}
			</div>
		</>
	);
}
