import type { TAuthTokenDTO } from '@root/core/modules/identity/application/dto/authTokenDTO';
import { AuthToken } from '@root/core/modules/identity/domain/authToken/authToken';
import type {
	IAuthTokenFactory,
	IAuthToken,
} from '@root/core/modules/identity/domain/authToken/types';

export class AuthTokenFactory implements IAuthTokenFactory {
	public create(value: TAuthTokenDTO): IAuthToken {
		return new AuthToken(value);
	}
}
