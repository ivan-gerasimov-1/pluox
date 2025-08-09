import styles from './actionSheetSelect.module.css';

export function ActionSheetSelect<T extends string>({
	value,
	items,
	onSelect,
}: {
	value?: T;
	items: T[];
	onSelect: (value: T) => void;
}) {
	function handleSelectItem(event: React.UIEvent<HTMLLIElement>) {
		let item = event.currentTarget.dataset.item as T;

		if (!item) {
			return;
		}

		onSelect(item);
	}

	function isSelected(item: string) {
		return value === item;
	}

	return (
		<ul className={styles.list}>
			{items.map((item) => (
				<li
					key={item}
					className={styles.listItem}
					data-item={item}
					onClick={handleSelectItem}
				>
					<div className={styles.itemTitle}>
						<div className={styles.listMarker}></div>

						<span>{item}</span>
					</div>

					{isSelected(item) && <span className={styles.checkmark}>✓</span>}
				</li>
			))}
		</ul>
	);
}
