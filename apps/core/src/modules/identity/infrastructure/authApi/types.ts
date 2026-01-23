export interface IAuthApi {
	signUp(
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
		name: string;
		createdAt: string;
		modifiedAt: string;
		token: string;
	}>;
}
