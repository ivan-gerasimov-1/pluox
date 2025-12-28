import { useAppNavigation } from '@root/presentation/web-ui/hooks/useNavigation';
import { useIntl } from '@root/presentation/web-ui/modules/intl/useIntl/useIntl';
import { Button } from '@root/presentation/web-ui/uiKit/button/button';
import { errorI18n } from '@root/presentation/web-ui/uiKit/error/error.i18n';

type TErrorProps = {
	title: string;
	message: string;
};

export function Error(props: TErrorProps) {
	const intl = useIntl(errorI18n);
	const navigation = useAppNavigation();

	return (
		<>
			<h1 className="font-semibold text-2xl">{props.title}</h1>

			<h2 className="mt-2 text-sm text-neutral-600 font-normal">
				{props.message}
			</h2>

			<Button className="mt-10" onClick={navigation.mainPage}>
				{intl.translate('mainPageButtonLabel')}
			</Button>
		</>
	);
}
