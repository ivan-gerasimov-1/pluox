import type { TAuthTokenDTO } from '@pluox/core/src/modules/identity/application/dto/authTokenDTO';
import { AuthToken } from '@pluox/core/src/modules/identity/domain/authToken/authToken';
import type {
	IAuthToken,
	IAuthTokenFactory,
} from '@pluox/core/src/modules/identity/domain/authToken/types';

export class AuthTokenFactory implements IAuthTokenFactory {
	public create(authTokenDTO: TAuthTokenDTO): IAuthToken {
		return new AuthToken(authTokenDTO.userId, authTokenDTO.accessToken);
	}
}
