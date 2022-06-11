type TEnvironment = {
	isDevelopment: boolean;
};

enum EEnvironment {
	DEVELOPMENT = 'development',
}

export let environment: TEnvironment = {
	isDevelopment: process.env.NODE_ENV === EEnvironment.DEVELOPMENT,
};
