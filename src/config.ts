type TEnvironment = {
	currentYear: number;
	isDev: boolean;
	NODE_ENV: string;
};

enum EEnvironment {
	DEVELOPMENT = 'development',
}

export let env: TEnvironment = {
	currentYear: new Date().getFullYear(),
	isDev: process.env.NODE_ENV === EEnvironment.DEVELOPMENT,
	NODE_ENV: process.env.NODE_ENV as string,
};
