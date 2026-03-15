export type TAppConfig = {
	env: string;
	host: string;
	port: number;
};

export type TProcessEnv = Record<string, string | undefined>;
