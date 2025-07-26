import { useNavigate } from 'react-router';

import { EAppPath } from '@root/presentation/web-ui/appPath';
import { Id } from '@root/core/domain/types';

interface IAppNavigation {
	to: (path: string, options?: { replace?: boolean }) => void;

	mainPage(): void;
	loginPage(): void;

	venueListPage(): void;
	venuePage(id: Id): void;
}

export function useAppNavigation(): IAppNavigation {
	const navigate = useNavigate();

	function goToMainPage() {
		navigate(EAppPath.MAIN, {
			replace: true,
		});
	}

	function goToLoginPage() {
		navigate(EAppPath.LOG_IN, {
			replace: true,
		});
	}

	function goToVenueListPage() {
		navigate(EAppPath.VENUES);
	}

	function goToVenuePage(id: Id) {
		navigate(`${EAppPath.VENUES}/${id}`);
	}

	return {
		to: navigate,
		mainPage: goToMainPage,
		loginPage: goToLoginPage,
		venueListPage: goToVenueListPage,
		venuePage: goToVenuePage,
	};
}
