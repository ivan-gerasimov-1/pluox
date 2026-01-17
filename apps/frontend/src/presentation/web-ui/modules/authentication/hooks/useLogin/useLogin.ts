import { useMutation } from '@tanstack/react-query';

import { EServiceToken } from '@/core/infrastructure/serviceContainer/types';

import { useAppNavigation } from '@/presentation/web-ui/hooks/useNavigation';
import { useService } from '@/presentation/web-ui/modules/serviceContainer/useService';

export function useLogin() {
	let authService = useService(EServiceToken.AUTH_SERVICE);
	let navigation = useAppNavigation();

	return useMutation({
		async mutationFn({
			email,
			password,
		}: {
			email: { value: string };
			password: { value: string };
		}) {
			return authService.logIn(email.value, password.value);
		},
		onSuccess() {
			navigation.mainPage();
		},
		onError() {
			//
		},
	});
}
