import { Id } from '@/core/domain/types';
import { EAppPath } from '@/presentation/web-ui/appPath';
import { useNavigate } from 'react-router';

interface IAppNavigation {
	to: (path: string, options?: { replace?: boolean }) => void;

	mainPage(): void;
	loginPage(): void;

	categoryListPage(): void;
	categoryPage(id: Id): void;

	venueListPage(): void;
	venuePage(id: Id): void;
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

	return {
		to: navigate,
		mainPage: goToMainPage,
		loginPage: goToLoginPage,
		categoryListPage: goToCategoryListPage,
		categoryPage: goToCategoryPage,
		venueListPage: goToVenueListPage,
		venuePage: goToVenuePage,
	};
}
