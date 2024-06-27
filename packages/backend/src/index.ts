import { createApp } from './app';
import { appConfig } from './config';

async function main() {
	let app = createApp();

	try {
		await app.listen({
			host: '0.0.0.0',
			port: appConfig.port,
		});
	} catch (error) {
		app.log.error(error);

		process.exit(1);
	}
}

main();
