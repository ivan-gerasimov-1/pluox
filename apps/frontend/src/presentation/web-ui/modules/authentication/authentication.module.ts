import { EAppPath } from '@/presentation/web-ui/appPath';
import { LogInScreen } from '@/presentation/web-ui/modules/authentication/screens/logIn/logIn';
import { SignUpScreen } from '@/presentation/web-ui/modules/authentication/screens/signUp/SignUp';

export const authenticationRoutes = [
	{
		path: EAppPath.SIGN_UP,
		Component: SignUpScreen,
	},
	{
		path: EAppPath.LOG_IN,
		Component: LogInScreen,
	},
];
