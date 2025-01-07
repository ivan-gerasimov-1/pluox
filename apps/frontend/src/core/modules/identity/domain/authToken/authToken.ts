import { ValueObject } from '@root/core/domain/valueObject/valueObject';
import type {
	IAuthToken,
	TAuthTokenValue,
} from '@root/core/modules/identity/domain/authToken/types';

export class AuthToken
	extends ValueObject<TAuthTokenValue>
	implements IAuthToken
{
	constructor(value: TAuthTokenValue) {
		super(value);
	}

	public setAccessToken(accessToken: string | null): void {
		this.value.accessToken = accessToken;
	}
}
