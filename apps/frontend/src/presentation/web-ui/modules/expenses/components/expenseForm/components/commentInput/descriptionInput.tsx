import { descriptionInputI18n } from '@/presentation/web-ui/modules/expenses/components/expenseForm/components/commentInput/descriptionInput.i18n';
import { useIntl } from '@/presentation/web-ui/modules/intl/useIntl/useIntl';
import { Input } from '@/presentation/web-ui/uiKit/input/input';

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
