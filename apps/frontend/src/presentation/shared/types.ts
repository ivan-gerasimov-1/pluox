export interface IUserInterface {
	start(): Promise<void>;
	dispose(): IUserInterface;
}
