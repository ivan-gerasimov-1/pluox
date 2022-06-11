import { environment } from '@root/config';

export function logGroup(title: string, ...values: any): void {
	if (!environment.isDevelopment) {
		return;
	}

	console.group(title);

	for (let value of values) {
		console.log(value);
	}

	console.groupEnd();
}
