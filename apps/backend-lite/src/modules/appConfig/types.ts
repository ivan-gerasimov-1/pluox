export type TAppConfig = {
	env: string;
	host: string;
	port: number;

	db: {
		filename: string;
	};

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
