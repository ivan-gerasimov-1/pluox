export type TEnvironment = {
	isDevelopment: boolean;
	apiUrl: string;
	openExchangeRates: {
		apiUrl: string;
		apiKey: string;
	};
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
	openExchangeRates: getOpenExchangeRatesApi(process.env.NODE_ENV),
};

function getApiUrl(env?: string | EEnvironment): string {
	if (isDevelopment(env)) {
		return '/api';
	}

	return window.location.hostname.includes('vercel.app')
		? 'https://savee-api.gerasimov.dev'
		: 'https://savee-api-v2.gerasimov.dev';
}

function getOpenExchangeRatesApi(env?: string | EEnvironment) {
	return {
		apiUrl: 'https://openexchangerates.org/api',
		apiKey: 'fd33278c63404c26b51d7d37ae50731d',
	};
}
