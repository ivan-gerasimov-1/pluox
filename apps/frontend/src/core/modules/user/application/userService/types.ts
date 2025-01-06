import {
	TUserCreateDTO,
	TUserDTO,
} from '@root/core/modules/user/application/dto/userDTO';

export interface IUserService {
	createUser(payload: TUserCreateDTO): TUserDTO;
	getUserById(id: string): TUserDTO | null;
}
