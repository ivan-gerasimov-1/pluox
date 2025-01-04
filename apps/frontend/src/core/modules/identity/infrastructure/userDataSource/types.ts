import type {
	TFindManyOptions,
	TFindManyResult,
} from '@root/core/domain/repository/types';
import type { IDataSource } from '@root/core/infrastructure/dataSource/types';
import type { TUserDTO } from '@root/core/modules/identity/application/dto/userDTO';
import type { TUserFindOptions } from '@root/core/modules/identity/domain/userRepository/types';

export interface IUserDataSource extends IDataSource<Record<string, TUserDTO>> {
	save(user: TUserDTO): TUserDTO;

	findMany(
		options?: TFindManyOptions<TUserFindOptions>,
	): TFindManyResult<TUserDTO>;
	findById(id: string): TUserDTO | null;
}
