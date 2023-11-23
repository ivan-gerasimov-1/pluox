export interface IAuthSerivce {
	readonly userId: string;
	readonly email: string;

	signIn(
		email: string,
		password: string,
	): Promise<{
		userId: string;
		email: string;
	}>;
}
