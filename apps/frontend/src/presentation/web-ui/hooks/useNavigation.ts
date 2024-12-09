import { useNavigate } from 'react-router';

import { EAppPath } from '@root/presentation/web-ui/appPath';

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
		navigate(EAppPath.SIGNIN, {
			replace: true,
		});
	}

	return {
		mainPage: goToMainPage,
		loginPage: goToLoginPage,
	};
}
