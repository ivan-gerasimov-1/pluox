import type { Id } from '@root/core/domain/types';
import type {
	TUserCreateDTO,
	TUserDTO,
	TUserUpdateDTO,
} from '@root/core/modules/user/application/dto/userDTO';

export interface IUserService {
	createUser(payload: TUserCreateDTO): TUserDTO;
	updateUser(id: Id, userUpdateDTO: TUserUpdateDTO): TUserDTO;
	getUserById(id: string): TUserDTO | null;
}
