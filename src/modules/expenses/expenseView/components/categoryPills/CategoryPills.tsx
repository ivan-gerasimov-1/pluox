import { categoryList } from '@domain/categories/constants';
import styles from './categoryPills.module.css';
import { Expenses } from '@domain/expenses/expenses';
import { useMemo } from 'react';

type TCategoryPillsProps = {
	onSelect(categoryId?: string): void;
};

export function CategoryPills(props: TCategoryPillsProps) {
	let categoryList = useMemo(() => getCategoryList(), []);

	return (
		<div>
			{categoryList.map((category) => {
				return (
					<button
						key={category.id}
						id={category.id}
						type="button"
						className={styles.pill}
						aria-pressed="false"
						onClick={(event) => {
							let target = event.currentTarget;
							let isPressed = target.getAttribute('aria-pressed') === 'true';
							let nextState = !isPressed;

							for (let category of categoryList) {
								let element = document.getElementById(category.id);

								if (!element) {
									continue;
								}

								element.setAttribute('aria-pressed', 'false');
							}

							target.setAttribute('aria-pressed', String(nextState));

							props.onSelect(nextState ? target.id : undefined);
						}}
					>
						{category.name}
					</button>
				);
			})}
		</div>
	);
}

function getCategoryList() {
	const categoryWeights = new Map<string, number>();

	for (const exp of Expenses.getInstance().list()) {
		if (!exp.category) {
			continue;
		}

		const currentWeight = categoryWeights.get(exp.category);

		if (currentWeight === undefined) {
			categoryWeights.set(exp.category, 1);
		} else {
			categoryWeights.set(exp.category, currentWeight + 1);
		}
	}

	return [...categoryList].sort((a, b) => {
		const aWeight = categoryWeights.get(a.id) || 0;
		const bWeight = categoryWeights.get(b.id) || 0;

		if (aWeight > bWeight) {
			return -1;
		}

		if (aWeight < bWeight) {
			return 1;
		}

		return 0;
	});
}
