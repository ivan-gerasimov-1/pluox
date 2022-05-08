type TEnv = {
	currentYear: number;
	isDev: boolean;
	NODE_ENV: string;
};

enum EnvType {
	Development = 'development',
}

export let env: TEnv = {
	currentYear: new Date().getFullYear(),
	isDev: process.env.NODE_ENV === EnvType.Development,
	NODE_ENV: process.env.NODE_ENV as string,
};
