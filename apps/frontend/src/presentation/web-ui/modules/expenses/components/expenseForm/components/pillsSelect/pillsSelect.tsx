import styles from './pillsSelect.module.css';

type TPillsSelectProps<T> = {
	value?: string | null;
	items: T[];

	onSelect(payload?: T): void;
};

export function PillsSelect<T extends { id: string; name: string }>(
	props: TPillsSelectProps<T>,
) {
	return (
		<div className={styles.wrapper}>
			{props.items.map((item) => {
				return (
					<button
						key={item.id}
						id={item.id}
						type="button"
						className={styles.pill}
						aria-pressed={item.id === props.value}
						onClick={(event) => {
							let target = event.currentTarget;
							let isPressed = target.getAttribute('aria-pressed') === 'true';
							let nextState = !isPressed;

							for (let item of props.items) {
								let element = document.getElementById(item.id);

								if (!element) {
									continue;
								}

								element.setAttribute('aria-pressed', 'false');
							}

							target.setAttribute('aria-pressed', String(nextState));

							let targetItem = props.items.find(
								(item) => item.id === target.id,
							);

							props.onSelect(nextState ? targetItem : undefined);
						}}
					>
						{item.name}
					</button>
				);
			})}
		</div>
	);
}
