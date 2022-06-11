type TEnvironment = {
	currentYear: number;
	isDevelopment: boolean;
};

enum EEnvironment {
	DEVELOPMENT = 'development',
}

export let environment: TEnvironment = {
	currentYear: new Date().getFullYear(),
	isDevelopment: process.env.NODE_ENV === EEnvironment.DEVELOPMENT,
};
