import { EAppPath } from '@/web/appPath';

import { LogInView } from '@/web/modules/authentication/views/logIn/logInView';
import { SignUpView } from '@/web/modules/authentication/views/signUp/signUpView';

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
