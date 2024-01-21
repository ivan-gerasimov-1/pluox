import { EAppPath } from '@root/appPath';
import { useNavigate } from 'react-router';

interface INavigation {
	mainPage(): void;
	loginPage(): void;
}

export function useNavigation(): INavigation {
	const navigate = useNavigate();

	function goToMainPage() {
		navigate(EAppPath.MAIN, {
			replace: true,
		});
	}

	function goToLoginPage() {
		navigate(EAppPath.LOGIN, {
			replace: true,
		});
	}

	return {
		mainPage: goToMainPage,
		loginPage: goToLoginPage,
	};
}
