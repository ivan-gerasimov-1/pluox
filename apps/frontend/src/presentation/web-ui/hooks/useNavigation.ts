import { useNavigate } from 'react-router';

import { Id } from '@/core/domain/types';

import { EAppPath } from '@/presentation/web-ui/appPath';

interface IAppNavigation {
	to: (path: string, options?: { replace?: boolean }) => void;

	mainPage(): void;
	loginPage(): void;
	signupPage(): void;

	categoryListPage(): void;
	categoryPage(id: Id): void;

	venueListPage(): void;
	venuePage(id: Id): void;
	venueCreatePage(): void;
}

export function useAppNavigation(): IAppNavigation {
	const navigate = useNavigate();

	function goToMainPage() {
		navigate(EAppPath.DASHBOARD, {
			replace: true,
		});
	}

	function goToLoginPage() {
		navigate(EAppPath.LOG_IN, {
			replace: true,
		});
	}

	function goToSignupPage() {
		navigate(EAppPath.LOG_IN, {
			replace: true,
		});
	}

	function goToCategoryListPage() {
		navigate(EAppPath.CATEGORIES);
	}

	function goToCategoryPage(id: Id) {
		navigate(`${EAppPath.CATEGORIES}/${id}`);
	}

	function goToVenueListPage() {
		navigate(EAppPath.VENUES);
	}

	function goToVenuePage(id: Id) {
		navigate(`${EAppPath.VENUES}/${id}`);
	}

	function goToVenueCreatePage() {
		navigate(EAppPath.VENUES_CREATE);
	}

	return {
		to: navigate,

		mainPage: goToMainPage,
		loginPage: goToLoginPage,
		signupPage: goToSignupPage,

		categoryListPage: goToCategoryListPage,
		categoryPage: goToCategoryPage,

		venueListPage: goToVenueListPage,
		venuePage: goToVenuePage,
		venueCreatePage: goToVenueCreatePage,
	};
}
