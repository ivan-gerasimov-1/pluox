import type { Id } from '@pluox/core/src/domain/types';

import type {
	TUserCreateDTO,
	TUserDTO,
	TUserUpdateDTO,
} from '@pluox/core/src/modules/user/application/dto/userDTO';

export interface IUserService {
	createUser(payload: TUserCreateDTO): TUserDTO;
	updateUser(id: Id, userUpdateDTO: TUserUpdateDTO): TUserDTO;
	getUserById(id: string): TUserDTO | null;
}
