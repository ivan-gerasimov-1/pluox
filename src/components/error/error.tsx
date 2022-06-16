import { errorI18n } from '@components/error/error.i18n';
import { useIntl } from '@modules/intl';
import { EAppPath } from '@root/app-path';
import { useNavigate } from 'react-router-dom';

interface IError {
	title: string;
	message: string;
}

export function Error(props: IError) {
	const intl = useIntl(errorI18n);
	const navigate = useNavigate();

	function goToMainPage() {
		navigate(EAppPath.MAIN, {
			replace: true,
		});
	}

	return (
		<>
			<h1>{props.title}</h1>
			<h2>{props.message}</h2>

			<br />

			<button type="button" onClick={goToMainPage}>
				{intl.translate('mainPageButtonLabel')}
			</button>
		</>
	);
}
