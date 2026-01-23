import { useNavigate } from 'react-router';

import { Id } from '@/core/domain/types';

import { EAppPath } from '@/web/appPath';

interface IAppNavigation {
	to: (path: string, options?: { replace?: boolean }) => void;

	loginPage(): void;
	signupPage(): void;

	mainPage(): void;

	dashboardPage(): void;

	categoryListPage(): void;
	categoryPage(id: Id): void;

	venueListPage(): void;
	venuePage(id: Id): void;
	venueCreatePage(): void;
}

export function useAppNavigation(): IAppNavigation {
	const navigate = useNavigate();

	function goToDashboardPage() {
		navigate(EAppPath.DASHBOARD);
	}

	function goToLoginPage() {
		navigate(EAppPath.LOG_IN);
	}

	function goToSignupPage() {
		navigate(EAppPath.SIGN_UP);
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

		loginPage: goToLoginPage,
		signupPage: goToSignupPage,

		mainPage: goToDashboardPage,

		dashboardPage: goToDashboardPage,

		categoryListPage: goToCategoryListPage,
		categoryPage: goToCategoryPage,

		venueListPage: goToVenueListPage,
		venuePage: goToVenuePage,
		venueCreatePage: goToVenueCreatePage,
	};
}
