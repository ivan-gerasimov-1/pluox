import type { IDatabase } from '@/core/infrastructure/database/types';
import { DataSource } from '@/core/infrastructure/dataSource/dataSource';

import type { TUserDTO } from '@/core/modules/user/application/dto/userDTO';
import type { TUserFindOptions } from '@/core/modules/user/domain/userRepository/types';
import { USER_STORAGE_ID } from '@/core/modules/user/infrastructure/userDataSource/constants';
import type { IUserDataSource } from '@/core/modules/user/infrastructure/userDataSource/types';

export function userDataSourceFactory(
	customStorage: IDatabase,
): IUserDataSource {
	let collection = customStorage.collection(USER_STORAGE_ID);

	return new DataSource<TUserDTO, TUserFindOptions>(collection);
}
