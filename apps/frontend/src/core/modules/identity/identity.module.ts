import {
	EServiceToken,
	type IModule,
} from '@root/core/infrastructure/serviceContainer/types';

import { AuthService } from '@root/core/modules/identity/application/authService/authService';
import { SessionService } from '@root/core/modules/identity/application/sessionService/sessionService';
import { AuthTokenFactory } from '@root/core/modules/identity/domain/authToken/authTokenFactory';
import { ClientIdFactory } from '@root/core/modules/identity/domain/clientId/clientIdFactory';
import { IClientIdFactory } from '@root/core/modules/identity/domain/clientId/types';
import { SessionFactory } from '@root/core/modules/identity/domain/session/sessionFactory';
import { AuthApi } from '@root/core/modules/identity/infrastructure/authApi/authApi';
import { sessionDataSourceFactory } from '@root/core/modules/identity/infrastructure/sessionDataSource/sessionDataSourceFactory';

export const identityModule: IModule = {
	providers: [
		/** Session */
		{
			token: EServiceToken.SESSION_DATASOURCE,
			useFactory: sessionDataSourceFactory,
			deps: [EServiceToken.LOCAL_STORAGE],
		},
		{
			token: EServiceToken.SESSION_SERVICE,
			useClass: SessionService,
			deps: [EServiceToken.SESSION_DATASOURCE, EServiceToken.SESSION_FACTORY],
		},
		{
			token: EServiceToken.SESSION_FACTORY,
			useClass: SessionFactory,
			deps: [
				EServiceToken.CLIENT_ID_FACTORY,
				EServiceToken.AUTH_TOKEN_FACTORY,
				EServiceToken.USER_SERVICE,
			],
		},
		/** ClientId */
		{
			token: EServiceToken.CLIENT_ID,
			useFactory: (clientIdFactory: IClientIdFactory) => {
				return clientIdFactory.create();
			},
			deps: [EServiceToken.CLIENT_ID_FACTORY],
		},
		{
			token: EServiceToken.CLIENT_ID_FACTORY,
			useClass: ClientIdFactory,
			deps: [EServiceToken.ID_GENERATOR],
		},
		/** Authentication */
		{
			token: EServiceToken.AUTH_API,
			useClass: AuthApi,
			deps: [EServiceToken.API_CLIENT],
		},
		{
			token: EServiceToken.AUTH_SERVICE,
			useClass: AuthService,
			deps: [
				EServiceToken.AUTH_API,
				EServiceToken.USER_SERVICE,
				EServiceToken.SESSION_SERVICE,
			],
		},
		{
			token: EServiceToken.AUTH_TOKEN_FACTORY,
			useClass: AuthTokenFactory,
		},
	],
};
