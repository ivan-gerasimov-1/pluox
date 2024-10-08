import { env as processEnv } from 'node:process';

export type TAppConfig = {
	host: string;
	port: number;

	email: {
		provider: string;
		host: string;
		port: number;
		auth: {
			user: string;
			password: string;
		};
		from: string;
	};
};

export const enum EEnvVariable {
	HOST = 'APP_HOST',
	PORT = 'APP_PORT',
	EMAIL_PROVIDER = 'APP_EMAIL_PROVIDER',
	EMAIL_HOST = 'APP_EMAIL_HOST',
	EMAIL_PORT = 'APP_EMAIL_PORT',
	EMAIL_USER = 'APP_EMAIL_USER',
	EMAIL_PASSWORD = 'APP_EMAIL_PASSWORD',
	EMAIL_FROM = 'APP_EMAIL_FROM',
}

class EnvVariableNotDefinedError extends Error {
	constructor(variableName: EEnvVariable) {
		super(`Environment variable "${variableName}" is not defined`);
	}
}

class EnvVariableEmptyError extends Error {
	constructor(variableName: EEnvVariable) {
		super(`Environment variable "${variableName}" is empty`);
	}
}

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

function readEnvVariable<T>(
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

function isDefined(value: unknown): boolean {
	if (value === undefined) {
		return false;
	}

	return true;
}

function isEmptyString(value: string): boolean {
	if (value === '') {
		return true;
	}

	return false;
}

function identity<T>(value: T): T {
	return value;
}

function parseNumber(value: string): number {
	return Number.parseInt(value);
}
