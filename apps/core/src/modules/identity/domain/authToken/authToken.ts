import { ValueObject } from '@pluox/core/src/domain/valueObject/valueObject';

import type {
	IAuthToken,
	TAuthTokenValue,
} from '@pluox/core/src/modules/identity/domain/authToken/types';

export class AuthToken
	extends ValueObject<TAuthTokenValue>
	implements IAuthToken
{
	constructor(userId: string | null, accessToken: string | null) {
		super({
			accessToken,
			userId,
		});
	}

	public setAccessToken(accessToken: string | null): void {
		this.value.accessToken = accessToken;
	}

	public setUserId(userId: string | null): void {
		this.value.userId = userId;
	}
}
