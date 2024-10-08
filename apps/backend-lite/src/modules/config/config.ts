import { parseNumber } from '#app/modules/config/parsers';
import { readEnvVariable } from '#app/modules/config/readEnvVariable';
import { EEnvVariable, type TAppConfig } from '#app/modules/config/types';
import { identity } from '#app/modules/config/utils';

export const appConfig: TAppConfig = {
	host: readEnvVariable(EEnvVariable.HOST, identity),
	port: readEnvVariable(EEnvVariable.PORT, parseNumber),

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
