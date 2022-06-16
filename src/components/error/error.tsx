import { errorI18n } from '@components/error/error.i18n';
import { useIntl } from '@modules/intl';
import { useNavigation } from '@modules/navigation/use-navigation';

type TErrorProps = {
	title: string;
	message: string;
};

export function Error(props: TErrorProps) {
	const intl = useIntl(errorI18n);
	const navigation = useNavigation();

	return (
		<>
			<h1>{props.title}</h1>
			<h2>{props.message}</h2>

			<br />

			<button type="button" onClick={navigation.mainPage}>
				{intl.translate('mainPageButtonLabel')}
			</button>
		</>
	);
}
