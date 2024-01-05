type TEnvironment = {
	isDevelopment: boolean;
	apiUrl: string;
};

enum EEnvironment {
	DEVELOPMENT = 'development',
}

function isDevelopment(environment?: string | EEnvironment) {
	return environment === EEnvironment.DEVELOPMENT;
}

export let environment: TEnvironment = {
	isDevelopment: isDevelopment(process.env.NODE_ENV),
	apiUrl: isDevelopment(process.env.NODE_ENV)
		? 'http://localhost:3001/api'
		: 'http://savee.gerasimov.pw/api',
};
