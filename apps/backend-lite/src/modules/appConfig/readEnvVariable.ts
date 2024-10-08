import { EEnvVariable } from '#app/modules/appConfig/enums';
import {
	EnvVariableEmptyError,
	EnvVariableNotDefinedError,
} from '#app/modules/appConfig/errors';
import type { TProcessEnv } from '#app/modules/appConfig/types';
import { isDefined, isEmptyString } from '#app/modules/appConfig/validators';

export function createEnvVariableReader(targetEnv: TProcessEnv) {
	return function readEnvVariable<T>(
		variableName: EEnvVariable,
		parser: (value: string) => T,
		options?: {
			allowEmpty: boolean;
		},
	): T {
		let envVariable = targetEnv[variableName];

		if (!isDefined(envVariable)) {
			throw new EnvVariableNotDefinedError(variableName);
		}

		if (!options?.allowEmpty && isEmptyString(envVariable)) {
			throw new EnvVariableEmptyError(variableName);
		}

		return parser(envVariable);
	};
}
