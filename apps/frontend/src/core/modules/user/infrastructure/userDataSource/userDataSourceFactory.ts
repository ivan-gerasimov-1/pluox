import type { IDatabase } from '@root/core/infrastructure/database/types';
import { DataSource } from '@root/core/infrastructure/dataSource/dataSource';
import type { TUserDTO } from '@root/core/modules/user/application/dto/userDTO';
import type { TUserFindOptions } from '@root/core/modules/user/domain/userRepository/types';
import type { IUserDataSource } from '@root/core/modules/user/infrastructure/userDataSource/types';

const USER_STORAGE_ID = 'user';

export function userDataSourceFactory(
	customStorage: IDatabase,
): IUserDataSource {
	let collection = customStorage.collection(USER_STORAGE_ID);

	return new DataSource<TUserDTO, TUserFindOptions>(collection);
}
