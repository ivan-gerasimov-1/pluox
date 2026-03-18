import type { EEnvVariable } from '#app/modules/appConfig/enums';

export class EnvVariableNotDefinedError extends Error {
	constructor(variableName: keyof typeof EEnvVariable) {
		super(`Environment variable "${variableName}" is not defined`);
	}
}

export class EnvVariableEmptyError extends Error {
	constructor(variableName: keyof typeof EEnvVariable) {
		super(`Environment variable "${variableName}" is empty`);
	}
}
