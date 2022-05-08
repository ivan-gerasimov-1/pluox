import { env } from '@root/config';

export function logGroup(title: string, ...values: any): void {
	if (!env.isDev) {
		return;
	}

	console.group(title);

	for (let value of values) {
		console.log(value);
	}

	console.groupEnd();
}
