import { categoryList } from '@modules/expenses/newExpense/components/categoryInput/constants';
import { classnames } from '@utils/classnames';
import styles from './categoryInput.module.css';
import { useIntl } from '@modules/intl';
import { categoryInputI18n } from '@modules/expenses/newExpense/components/categoryInput/categoryInput.i18n';

export type TCategoryInputProps = {
	value: string;
	onChange?(id: string): void;
};

export function CategoryInput(props: TCategoryInputProps) {
	const intl = useIntl(categoryInputI18n);

	function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
		let id = event.target.value;

		if (!props.onChange) {
			return;
		}

		props.onChange(id);
	}

	return (
		<select
			className={classnames(styles.categoryInput, {
				[styles.isEmpty]: props.value === '',
			})}
			value={props.value}
			onChange={handleChange}
		>
			<option value="" disabled>
				{intl.translate('inputPlaceholder')}
			</option>

			{categoryList.map((category) => {
				return (
					<option key={category.id} value={category.id}>
						{category.name}
					</option>
				);
			})}
		</select>
	);
}
