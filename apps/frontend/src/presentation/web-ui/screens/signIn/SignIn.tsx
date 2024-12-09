import { LogInForm } from '@modules/auth/logIn/logInForm/logInForm';

import { Screen } from '@root/presentation/web-ui/uiKit/screen/screen';

export function SignInScreen() {
	return (
		<Screen>
			<LogInForm />
		</Screen>
	);
}
