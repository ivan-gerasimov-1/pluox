import type { Id } from '@/core/domain/types';

import type {
	TUserCreateDTO,
	TUserDTO,
	TUserUpdateDTO,
} from '@/core/modules/user/application/dto/userDTO';

export interface IUserService {
	createUser(payload: TUserCreateDTO): TUserDTO;
	updateUser(id: Id, userUpdateDTO: TUserUpdateDTO): TUserDTO;
	getUserById(id: string): TUserDTO | null;
}
