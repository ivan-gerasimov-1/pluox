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

export const appConfig: TAppConfig = {
	host: process.env.APP_HOST || '0.0.0.0',
	port: Number.parseInt(process.env.APP_PORT) || 3000,

	email: {
		provider: process.env.APP_EMAIL_PROVIDER,
		host: process.env.APP_EMAIL_HOST,
		port: Number.parseInt(process.env.APP_EMAIL_PORT),
		auth: {
			user: process.env.APP_EMAIL_USER,
			password: process.env.APP_EMAIL_PASSWORD,
		},
		from: process.env.APP_EMAIL_FROM,
	},
};
