import type { IDatabase } from '@pluox/core/src/infrastructure/database/types';
import { DataSource } from '@pluox/core/src/infrastructure/dataSource/dataSource';

import type { TUserDTO } from '@pluox/core/src/modules/user/application/dto/userDTO';
import type { TUserFindOptions } from '@pluox/core/src/modules/user/domain/userRepository/types';
import { USER_STORAGE_ID } from '@pluox/core/src/modules/user/infrastructure/userDataSource/constants';
import type { IUserDataSource } from '@pluox/core/src/modules/user/infrastructure/userDataSource/types';

export function userDataSourceFactory(
	customStorage: IDatabase,
): IUserDataSource {
	let collection = customStorage.collection(USER_STORAGE_ID);

	return new DataSource<TUserDTO, TUserFindOptions>(collection);
}
