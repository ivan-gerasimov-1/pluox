import { EAppPath } from '@root/presentation/web-ui/appPath';
import { LogInScreen } from '@root/presentation/web-ui/modules/authentication/screens/logIn/logIn';
import { SignUpScreen } from '@root/presentation/web-ui/modules/authentication/screens/signUp/SignUp';

export const authenticationRoutes = [
	{
		path: EAppPath.SIGNUP,
		Component: SignUpScreen,
	},
	{
		path: EAppPath.SIGNIN,
		Component: LogInScreen,
	},
];
