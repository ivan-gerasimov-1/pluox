import { EEnvVariable } from '#app/modules/appConfig/enums';
import { parseNumber } from '#app/modules/appConfig/parsers';
import { createEnvVariableReader } from '#app/modules/appConfig/readEnvVariable';
import type { TAppConfig, TProcessEnv } from '#app/modules/appConfig/types';
import { identity } from '#app/modules/appConfig/utils';

export function createAppConfig(processEnv: TProcessEnv): TAppConfig {
	let readEnvVariable = createEnvVariableReader(processEnv);

	return {
		env: readEnvVariable(EEnvVariable.APP_ENV, identity),

		host: readEnvVariable(EEnvVariable.APP_HOST, identity),
		port: readEnvVariable(EEnvVariable.APP_PORT, parseNumber),
	};
}
