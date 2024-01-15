export interface IAuthSerivce {
	readonly userId: string;
	readonly email: string;

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
	}>;
}
