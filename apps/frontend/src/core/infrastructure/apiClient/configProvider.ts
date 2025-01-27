import type { IApiClientConfigProvider } from '@root/core/infrastructure/apiClient/types';
import type { ISessionService } from '@root/core/modules/identity/application/sessionService/types';
import type { IEnvironment } from '@root/core/modules/settings/infrastructure/environment/types';

export class ApiClientConfigProvider implements IApiClientConfigProvider {
	constructor(
		private readonly environment: IEnvironment,
		private readonly sessionService: ISessionService,
	) {}

	public get baseUrl(): string {
		return this.environment.apiUrl;
	}

	public get authorizationHeader(): string | null {
		let authToken = this.sessionService.accessToken;

		if (!authToken) {
			return null;
		}

		return `Bearer ${authToken}`;
	}
}
