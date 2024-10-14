import { Icon } from '@uiKit/icon/icon';
import { EIconName } from '@uiKit/icon/icons';

import styles from './iconSelect.module.css';

export type TIconSelectProps<T> = {
	name: string;
	id: string;

	icon: EIconName;

	value: T;
	onChange(value: T): void;

	options: Array<{
		value: T;
		label: string;
	}>;
};

export function IconSelect<T extends string>(props: TIconSelectProps<T>) {
	return (
		<label htmlFor={props.name} className={styles.container}>
			<Icon name={props.icon} />

			<select
				name={props.name}
				id={props.id}
				className={styles.select}
				value={props.value}
				onChange={(event) => {
					props.onChange(event.target.value as T);
				}}
			>
				{props.options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</label>
	);
}
