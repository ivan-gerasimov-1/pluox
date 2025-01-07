import type { IValueObject } from '@root/core/domain/valueObject/types';
import type { TAuthTokenDTO } from '@root/core/modules/identity/application/dto/authTokenDTO';

export type TAuthTokenValue = {
	accessToken: string;
};

export interface IAuthToken extends IValueObject<TAuthTokenValue> {}

export interface IAuthTokenFactory {
	create(authTokenDTO: TAuthTokenDTO): IAuthToken;
}
