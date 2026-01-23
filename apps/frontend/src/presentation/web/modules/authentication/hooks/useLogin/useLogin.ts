import { useMutation } from '@tanstack/react-query';

import { EServiceToken } from '@/core/infrastructure/serviceContainer/types';

import { useAppNavigation } from '@/presentation/web/hooks/useNavigation';
import { useService } from '@/presentation/web/modules/serviceContainer/useService';

export function useLogin() {
	let authService = useService(EServiceToken.AUTH_SERVICE);
	let navigation = useAppNavigation();

	return useMutation({
		mutationFn({ email, password }: { email: string; password: string }) {
			return authService.logIn(email, password);
		},
		onSuccess() {
			navigation.mainPage();
		},
		onError() {
			//
		},
	});
}
