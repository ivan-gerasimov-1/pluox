import { EAppPath } from '@root/app-path';
import { useNavigate } from 'react-router';

interface INavigation {
	mainPage(): void;
}

export function useNavigation(): INavigation {
	const navigate = useNavigate();

	function goToMainPage() {
		navigate(EAppPath.MAIN, {
			replace: true,
		});
	}

	return {
		mainPage: goToMainPage,
	};
}
