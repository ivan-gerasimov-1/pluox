import { componentInputI18n } from '@root/presentation/web-ui/modules/expenses/expenseView/components/commentInput/commentInput.i18n';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl';
import styles from './commentInput.module.css';
import type { TComment } from '@domain/types';

export type TCommentInputProps = {
	value: TComment;

	onChange(value: string): void;
};

export function CommentInput(props: TCommentInputProps) {
	const intl = useIntl(componentInputI18n);

	function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		const value = event.target.value;

		props.onChange(value);
	}

	return (
		<textarea
			name="newExpense_comment"
			id="newExpense_comment"
			className={styles.commentField}
			value={props.value}
			onChange={handleChange}
			placeholder={intl.translate('commentPlaceholder')}
		></textarea>
	);
}
