import { TUserCreateDTO } from '@root/core/modules/identity/application/dto/userDTO';
import { IUser } from '@root/core/modules/identity/domain/userEntity/types';

export interface IUserService {
	createUser(payload: TUserCreateDTO): IUser;
}
