import { useMutation } from '@tanstack/react-query';

import { useAppNavigation } from '@/web/hooks/useNavigation';

import { EServiceToken } from '@/web/modules/serviceContainer/enums';
import { useService } from '@/web/modules/serviceContainer/useService';

export function useSignup() {
	let authService = useService(EServiceToken.AUTH_SERVICE);
	const navigation = useAppNavigation();

	return useMutation({
		mutationFn({ email, password }: { email: string; password: string }) {
			return authService.signUp(email, password);
		},
		onSuccess() {
			navigation.loginPage();
		},
		onError() {
			//
		},
	});
}
