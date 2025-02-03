import { cls } from '@root/presentation/web-ui/utils/classnames';

import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';

import { descriptionInputI18n } from '@root/presentation/web-ui/modules/expenses/components/expenseForm/components/commentInput/descriptionInput.i18n';

import styles from './descriptionInput.module.css';

export type TDescriptionInputProps = {
	id?: string;
	name: string;

	className?: string;

	ref?: React.RefCallback<HTMLTextAreaElement>;

	onChange(
		event: React.ChangeEvent<HTMLTextAreaElement>,
	): Promise<boolean | void>;
	onBlur(
		event: React.FocusEvent<HTMLTextAreaElement, Element>,
	): Promise<boolean | void>;
};

export function DescriptionInput(props: TDescriptionInputProps) {
	let intl = useIntl(descriptionInputI18n);

	return (
		<textarea
			id={props.id || props.name}
			name={props.name}
			className={cls(styles.descriptionField, props.className)}
			ref={props.ref}
			onChange={props.onChange}
			onBlur={props.onBlur}
			placeholder={intl.translate('descriptionPlaceholder')}
		></textarea>
	);
}
