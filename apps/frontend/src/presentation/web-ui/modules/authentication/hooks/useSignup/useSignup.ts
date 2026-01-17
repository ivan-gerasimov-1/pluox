import { useMutation } from '@tanstack/react-query';

import { useAppNavigation } from '@/presentation/web-ui/hooks/useNavigation';
import { EServiceToken } from '@/presentation/web-ui/modules/serviceContainer/enums';
import { useService } from '@/presentation/web-ui/modules/serviceContainer/useService';

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
