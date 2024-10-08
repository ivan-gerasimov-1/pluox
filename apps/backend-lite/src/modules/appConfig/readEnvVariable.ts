import {
	EnvVariableEmptyError,
	EnvVariableNotDefinedError,
} from '#app/modules/appConfig/errors';
import { type EEnvVariable } from '#app/modules/appConfig/types';
import { isDefined, isEmptyString } from '#app/modules/appConfig/validators';
import { env as processEnv } from 'node:process';

export function readEnvVariable<T>(
	variableName: EEnvVariable,
	parser: (value: string) => T,
	options?: {
		allowEmpty: boolean;
	},
): T {
	let envVariable = processEnv[variableName];

	if (!isDefined(envVariable)) {
		throw new EnvVariableNotDefinedError(variableName);
	}

	if (!options?.allowEmpty && isEmptyString(envVariable)) {
		throw new EnvVariableEmptyError(variableName);
	}

	return parser(envVariable);
}
