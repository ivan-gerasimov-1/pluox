import type { IValueObject } from '@pluox/core/src/domain/valueObject/types';

import type { TAuthTokenDTO } from '@pluox/core/src/modules/identity/application/dto/authTokenDTO';

export type TAuthTokenValue = {
	accessToken: string | null;
	userId: string | null;
};

export interface IAuthToken extends IValueObject<TAuthTokenValue> {
	setAccessToken(accessToken: string | null): void;
	setUserId(userId: string | null): void;
}

export interface IAuthTokenFactory {
	create(authTokenDTO: TAuthTokenDTO): IAuthToken;
}
