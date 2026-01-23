import { cn } from '@/web/utils/classnames';

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

	function handleKeyDown(event: React.KeyboardEvent<HTMLLIElement>) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();

			let item = event.currentTarget.dataset.item;

			if (item) {
				onSelect(item);
			}

			return;
		}

		if (event.key === 'ArrowDown') {
			event.preventDefault();

			let nextItem = event.currentTarget
				.nextElementSibling as HTMLLIElement | null;

			nextItem?.focus();

			return;
		}

		if (event.key === 'ArrowUp') {
			event.preventDefault();

			let prevItem = event.currentTarget
				.previousElementSibling as HTMLLIElement | null;

			prevItem?.focus();
		}
	}

	return (
		<ul className={styles.list} role="listbox" aria-multiselectable={false}>
			{items.map((item) => {
				let isSelectedItem = isSelected(item.id);

				return (
					<li
						key={item.id}
						className={cn(styles.listItem, {
							[styles.selected]: isSelectedItem,
						})}
						data-item={item.id}
						onClick={handleSelectItem}
						onKeyDown={handleKeyDown}
						role="option"
						aria-selected={isSelectedItem}
						tabIndex={0}
					>
						<div className={styles.itemTitle}>
							<div className={styles.marker}></div>

							<span>{item.name}</span>
						</div>

						{
							<span className={styles.checkmark} data-selected={isSelectedItem}>
								✓
							</span>
						}
					</li>
				);
			})}
		</ul>
	);
}
