import { errorScreenI18n } from '@root/presentation/web-ui/modules/app/screens/error/error.i18n';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { Error } from '@root/presentation/web-ui/uiKit/error/error';

type TErrorScreenProps = {
	title?: string;
	message: string;
};

export function ErrorScreen(props: TErrorScreenProps) {
	let intl = useIntl(errorScreenI18n);

	return (
		<div className="flex h-screen flex-col items-center justify-center">
			<Error
				title={props.title || intl.translate('defaultTitle')}
				message={props.message}
			/>
		</div>
	);
}
