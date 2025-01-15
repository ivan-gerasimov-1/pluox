import type { ICustomStorage } from '@root/core/infrastructure/customStorage/types';
import { LocalStorageCollectionDataSource } from '@root/core/infrastructure/dataSource/localStorageCollectionDataSource';
import type { TUserDTO } from '@root/core/modules/user/application/dto/userDTO';
import type { TUserFindOptions } from '@root/core/modules/user/domain/userRepository/types';
import type { IUserDataSource } from '@root/core/modules/user/infrastructure/userDataSource/types';

const USER_STORAGE_ID = 'user';

export function userDataSourceFactory(
	customStorage: ICustomStorage,
): IUserDataSource {
	let collection = customStorage.collection(USER_STORAGE_ID);

	return new LocalStorageCollectionDataSource<TUserDTO, TUserFindOptions>(
		collection,
	);
}
