export type TEnvironment = {
	isDevelopment: boolean;
	apiUrl: string;
};

enum EEnvironment {
	DEVELOPMENT = 'development',
	PRODUCTION = 'production',
}

function isDevelopment(environment?: string | EEnvironment) {
	return environment === EEnvironment.DEVELOPMENT;
}

export let environment: TEnvironment = {
	isDevelopment: isDevelopment(process.env.NODE_ENV),
	apiUrl: getApiUrl(process.env.NODE_ENV),
};

function getApiUrl(env?: string | EEnvironment): string {
	if (isDevelopment(env)) {
		return '/api';
	}

	return window.location.hostname.includes('vercel.app')
		? 'https://savee-api.gerasimov.dev'
		: 'https://savee-api-v2.gerasimov.dev';
}
