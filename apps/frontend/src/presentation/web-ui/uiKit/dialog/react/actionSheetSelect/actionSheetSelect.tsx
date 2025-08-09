import styles from './actionSheetSelect.module.css';

export function ActionSheetSelect<T extends { id: string; name: string }>({
	value,
	items,
	onSelect,
}: {
	value?: T['id'];
	items: T[];
	onSelect: (value: T['id']) => void;
}) {
	function handleSelectItem(event: React.UIEvent<HTMLLIElement>) {
		let item = event.currentTarget.dataset.item;

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
					key={item.id}
					className={styles.listItem}
					data-item={item.id}
					onClick={handleSelectItem}
				>
					<div className={styles.itemTitle}>
						<div className={styles.listMarker}></div>

						<span>{item.name}</span>
					</div>

					{isSelected(item.id) && <span className={styles.checkmark}>✓</span>}
				</li>
			))}
		</ul>
	);
}
