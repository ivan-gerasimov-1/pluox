export interface IAuthApi {
	signIn(
		email: string,
		password: string,
	): Promise<{
		email: string;
	}>;
	logIn(
		email: string,
		password: string,
	): Promise<{
		id: string;
		email: string;
		token: string;
	}>;
}
