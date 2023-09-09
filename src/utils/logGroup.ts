import { environment } from '@root/config';

export interface ILogger {
	group<T extends unknown[]>(title: string, ...values: T): void;
}

export function logGroup<T extends unknown[]>(
	title: string,
	...values: T
): void {
	if (!environment.isDevelopment) {
		return;
	}

	console.group(title);

	for (let value of values) {
		console.log(value);
	}

	console.groupEnd();
}

export const logger: ILogger = {
	group: logGroup,
};
