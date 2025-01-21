import { descriptionInputI18n } from '@root/presentation/web-ui/modules/expenses/expenseForm/components/commentInput/descriptionInput.i18n';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';

import type { TDescription } from '@domain/types';

import styles from './descriptionInput.module.css';

export type TDescriptionInputProps = {
	value: TDescription;

	onChange(value: string): void;
};

export function DescriptionInput(props: TDescriptionInputProps) {
	const intl = useIntl(descriptionInputI18n);

	function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		const value = event.target.value;

		props.onChange(value);
	}

	return (
		<textarea
			name="newExpense_description"
			id="newExpense_description"
			className={styles.descriptionField}
			value={props.value}
			onChange={handleChange}
			placeholder={intl.translate('descriptionPlaceholder')}
		></textarea>
	);
}
