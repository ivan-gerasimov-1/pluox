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

export type TProcessEnv = Record<string, string | undefined>;
