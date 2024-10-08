import { type EEnvVariable } from '#app/modules/config/types';

export class EnvVariableNotDefinedError extends Error {
	constructor(variableName: EEnvVariable) {
		super(`Environment variable "${variableName}" is not defined`);
	}
}

export class EnvVariableEmptyError extends Error {
	constructor(variableName: EEnvVariable) {
		super(`Environment variable "${variableName}" is empty`);
	}
}
