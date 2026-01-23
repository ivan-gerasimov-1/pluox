import { descriptionInputI18n } from '@/web/modules/expenses/components/expenseForm/components/commentInput/descriptionInput.i18n';
import { useIntl } from '@/web/modules/intl/useIntl/useIntl';
import { Input } from '@/web/uiKit/input/input';

export function DescriptionInput(
	props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
	let intl = useIntl(descriptionInputI18n);

	return (
		<Input asChild>
			<textarea
				placeholder={intl.translate('descriptionPlaceholder')}
				{...props}
			/>
		</Input>
	);
}
