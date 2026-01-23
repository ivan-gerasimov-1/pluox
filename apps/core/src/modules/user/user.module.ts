import {
	EServiceToken,
	type IModule,
} from '@pluox/core/src/infrastructure/serviceContainer/types';

import { UserService } from '@pluox/core/src/modules/user/application/userService/userService';
import { userDataSourceFactory } from '@pluox/core/src/modules/user/infrastructure/userDataSource/userDataSourceFactory';
import { UserMapper } from '@pluox/core/src/modules/user/infrastructure/userMapper/userMapper';
import { UserRepository } from '@pluox/core/src/modules/user/infrastructure/userRepository/userRepository';

export const userModule: IModule = {
	providers: [
		{
			token: EServiceToken.USER_DATASOURCE,
			useFactory: userDataSourceFactory,
			deps: [EServiceToken.DATABASE],
		},
		{
			token: EServiceToken.USER_SERVICE,
			useClass: UserService,
			deps: [
				EServiceToken.USER_REPOSITORY,
				EServiceToken.USER_MAPPER,
				EServiceToken.ID_GENERATOR,
				EServiceToken.TEMPORAL,
			],
		},
		{
			token: EServiceToken.USER_MAPPER,
			useClass: UserMapper,
		},
		{
			token: EServiceToken.USER_REPOSITORY,
			useClass: UserRepository,
			deps: [EServiceToken.USER_DATASOURCE, EServiceToken.USER_MAPPER],
		},
	],
};
