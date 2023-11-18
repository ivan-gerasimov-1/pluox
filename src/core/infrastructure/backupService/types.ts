export interface IBackupService {
	run<T>(payload: T): Promise<void>;
}
