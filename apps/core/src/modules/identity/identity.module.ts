import {
	EServiceToken,
	type IModule,
} from '@pluox/core/src/infrastructure/serviceContainer/types';

import { AuthService } from '@pluox/core/src/modules/identity/application/authService/authService';
import { SessionService } from '@pluox/core/src/modules/identity/application/sessionService/sessionService';
import { AuthTokenFactory } from '@pluox/core/src/modules/identity/domain/authToken/authTokenFactory';
import { ClientIdFactory } from '@pluox/core/src/modules/identity/domain/clientId/clientIdFactory';
import { IClientIdFactory } from '@pluox/core/src/modules/identity/domain/clientId/types';
import { SessionFactory } from '@pluox/core/src/modules/identity/domain/session/sessionFactory';
import { AuthApi } from '@pluox/core/src/modules/identity/infrastructure/authApi/authApi';
import { sessionDataSourceFactory } from '@pluox/core/src/modules/identity/infrastructure/sessionDataSource/sessionDataSourceFactory';

export const identityModule: IModule = {
	providers: [
		/** Session */
		{
			token: EServiceToken.SESSION_DATASOURCE,
			useFactory: sessionDataSourceFactory,
			deps: [EServiceToken.DATABASE],
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
