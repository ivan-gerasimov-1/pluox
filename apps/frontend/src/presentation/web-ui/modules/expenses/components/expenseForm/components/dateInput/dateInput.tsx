import { cls } from '@root/presentation/web-ui/utils/classnames';

import styles from './dateInput.module.css';

type TDateInputProps = {
	type?: 'datetime-local';

	id?: string;
	name: string;

	className?: string;

	ref?: React.RefCallback<HTMLInputElement>;

	onChange(event: React.ChangeEvent<HTMLInputElement>): Promise<boolean | void>;
	onBlur(
		event: React.FocusEvent<HTMLInputElement, Element>,
	): Promise<boolean | void>;
};

export function DateInput(props: TDateInputProps) {
	return (
		<input
			type={props.type || 'datetime-local'}
			className={cls(styles.datetimeInput, props.className)}
			ref={props.ref}
			id={props.id || props.name}
			name={props.name}
			onChange={props.onChange}
			onBlur={props.onBlur}
		/>
	);
}
