type TEnvironment = {
	currentYear: number;
	isDevelopment: boolean;
	NODE_ENV: string;
};

enum EEnvironment {
	DEVELOPMENT = 'development',
}

export let environment: TEnvironment = {
	currentYear: new Date().getFullYear(),
	isDevelopment: process.env.NODE_ENV === EEnvironment.DEVELOPMENT,
	NODE_ENV: process.env.NODE_ENV as string,
};
