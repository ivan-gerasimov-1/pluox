import { categoryTemplates } from '@root/core/modules/category/domain/categoryTemplate/templates';
import type { TCategory } from '@domain/types';

import { cls } from '@root/presentation/web-ui/utils/classnames';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { categoryInputI18n } from '@root/presentation/web-ui/modules/expenses/expenseForm/components/categoryInput/categoryInput.i18n';

import styles from './categoryInput.module.css';

export type TCategoryInputProps = {
	value: TCategory;
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
			className={cls(styles.categoryInput, {
				[styles.isEmpty]: props.value === '',
			})}
			value={props.value || ''}
			onChange={handleChange}
		>
			<option value="" disabled>
				{intl.translate('inputPlaceholder')}
			</option>

			{categoryTemplates.map((category) => {
				return (
					<option key={category.id} value={category.id}>
						{category.name}
					</option>
				);
			})}
		</select>
	);
}
