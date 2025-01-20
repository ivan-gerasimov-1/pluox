import { useNavigate } from 'react-router';

import { EAppPath } from '@root/presentation/web-ui/appPath';

interface INavigation {
	to: (path: string, options?: { replace?: boolean }) => void;

	mainPage(): void;
	loginPage(): void;

	venueListPage(): void;
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

	function goToVenueListPage() {
		navigate(EAppPath.VENUES);
	}

	return {
		to: navigate,
		mainPage: goToMainPage,
		loginPage: goToLoginPage,
		venueListPage: goToVenueListPage,
	};
}
