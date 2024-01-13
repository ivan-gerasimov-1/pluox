export const appConfig = {
	db: {
		name: process.env.APP_DB_NAME as string,
		auth: process.env.APP_DB_AUTH as string,
		user: process.env.APP_DB_USER as string,
		password: process.env.APP_DB_PASSWORD as string,
	},
	jwt: {
		secret: process.env.JWT_SECRET as string,
	},
	port: Number.parseInt(process.env.APP_PORT as string, 10),
};
