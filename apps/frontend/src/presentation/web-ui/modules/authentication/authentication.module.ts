import { EAppPath } from '@root/presentation/web-ui/appPath';
import { LogInScreen } from '@root/presentation/web-ui/modules/authentication/screens/logIn/logIn';
import { SignUpScreen } from '@root/presentation/web-ui/modules/authentication/screens/signUp/SignUp';

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
