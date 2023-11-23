export interface IAuthSerivce {
	signIn(email: string, password: string): Promise<void>;
}
