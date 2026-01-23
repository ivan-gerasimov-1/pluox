import { EAppPath } from '@/presentation/web-ui/appPath';
import { LogInView } from '@/presentation/web-ui/modules/authentication/views/logIn/logInView';
import { SignUpView } from '@/presentation/web-ui/modules/authentication/views/signUp/signUpView';

export const authenticationRoutes = [
	{
		path: EAppPath.SIGN_UP,
		Component: SignUpView,
	},
	{
		path: EAppPath.LOG_IN,
		Component: LogInView,
	},
];
