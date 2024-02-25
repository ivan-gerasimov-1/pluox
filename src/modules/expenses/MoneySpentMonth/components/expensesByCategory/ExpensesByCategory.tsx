import { IntlService } from '@core/infrastructure/intl/intlService/IntlService';
import { getCategoryName } from '@domain/categories/getCategoryName';
import { Expenses } from '@domain/expenses';
import { CategoryIcon } from '@uiKit/categoryIcon/categoryIcon';
import { useState } from 'react';
import styles from './ExpensesByCategory.module.css';
import { TMonth } from '@domain/amount/useCases/types';

export type TExpensesByCategory = {
	month: TMonth;
};

export function ExpensesByCategory(props: TExpensesByCategory) {
	let [showAll, setShowAll] = useState<boolean>(false);

	let expenses = Expenses.getInstance().getMonthlyExpensesByCategory(
		props.month,
	);
	let expensesToRender = showAll ? expenses : expenses.slice(0, 3);
	let showMoreButton = expenses.length >= 4;

	return (
		<>
			{expensesToRender.map(({ id, total, percentage }) => {
				return (
					<div key={id} className={styles.categoryRow}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<div style={{ marginRight: '10px' }}>
								<CategoryIcon categoryId={id} />
							</div>

							<div style={{ display: 'flex', flexDirection: 'column' }}>
								<span style={{ fontWeight: 600 }}>{getCategoryName(id)}</span>

								<span
									style={{ fontSize: '12px', opacity: 0.75, marginTop: '5px' }}
								>
									{percentage.toFixed(2)}%
								</span>
							</div>
						</div>

						<div>
							<span style={{ fontWeight: 600 }}>
								{IntlService.getInstance().formatCurrency(total)}
							</span>
						</div>
					</div>
				);
			})}

			{showMoreButton && (
				<button
					type="button"
					style={{
						width: '100%',
						margin: '0',
						padding: '10px 10px',

						color: 'var(--primary)',
						background: 'none',

						border: 'none',

						fontSize: '14px',
						fontFamily: 'inherit',

						cursor: 'pointer',
					}}
					onClick={(event) => {
						event.preventDefault();

						setShowAll(!showAll);
					}}
				>
					{showAll ? 'Свернуть ↑' : 'Ещё ↓'}
				</button>
			)}
		</>
	);
}
