import { categoryList } from '@domain/categories/constants';
import styles from './categoryPills.module.css';

type TCategoryPillsProps = {
	onSelect(categoryId?: string): void;
};

export function CategoryPills(props: TCategoryPillsProps) {
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
