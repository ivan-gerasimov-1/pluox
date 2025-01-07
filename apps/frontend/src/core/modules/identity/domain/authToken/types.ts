import type { IValueObject } from '@root/core/domain/valueObject/types';
import type { TAuthTokenDTO } from '@root/core/modules/identity/application/dto/authTokenDTO';

export type TAuthTokenValue = {
	accessToken: string | null;
};

export interface IAuthToken extends IValueObject<TAuthTokenValue> {
	setAccessToken(accessToken: string | null): void;
}

export interface IAuthTokenFactory {
	create(authTokenDTO: TAuthTokenDTO): IAuthToken;
}
