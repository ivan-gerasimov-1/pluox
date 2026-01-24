import type { TAuthTokenDTO } from '@core/modules/identity/application/dto/authTokenDTO';

export type TSessionDTO = {
	clientId: string;
	userId: string;
	authToken: TAuthTokenDTO | null;
};
