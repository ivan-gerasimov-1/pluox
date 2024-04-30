import styles from './select.module.css';

export type TSelectProps<T> = {
	name: string;
	id: string;

	value: T;
	onChange(value: T): void;

	options: Array<{
		key: string;
		value: T;
		label: string;
	}>;
};

export function Select<T extends string>(props: TSelectProps<T>) {
	return (
		<select
			className={styles.select}
			name={props.name}
			id={props.id}
			value={props.value}
			onChange={(event) => {
				props.onChange(event.target.value as T);
			}}
		>
			{props.options.map((option) => (
				<option key={option.key} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
}
