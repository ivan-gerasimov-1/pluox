import { EEnvVariable } from '#app/modules/appConfig/enums';
import { parseNumber } from '#app/modules/appConfig/parsers';
import { createEnvVariableReader } from '#app/modules/appConfig/readEnvVariable';
import type { TProcessEnv, TAppConfig } from '#app/modules/appConfig/types';
import { identity } from '#app/modules/appConfig/utils';

export function createAppConfig(processEnv: TProcessEnv): TAppConfig {
	let readEnvVariable = createEnvVariableReader(processEnv);

	return {
		host: readEnvVariable(EEnvVariable.HOST, identity),
		port: readEnvVariable(EEnvVariable.PORT, parseNumber),

		db: {
			filename: readEnvVariable(EEnvVariable.DB_FILENAME, identity),
		},

		email: {
			provider: readEnvVariable(EEnvVariable.EMAIL_PROVIDER, identity),
			host: readEnvVariable(EEnvVariable.EMAIL_HOST, identity),
			port: readEnvVariable(EEnvVariable.EMAIL_PORT, parseNumber),
			auth: {
				user: readEnvVariable(EEnvVariable.EMAIL_USER, identity),
				password: readEnvVariable(EEnvVariable.EMAIL_PASSWORD, identity),
			},
			from: readEnvVariable(EEnvVariable.EMAIL_FROM, identity),
		},
	};
}
