import { serve } from '@hono/node-server';

import { app } from '#app/app';
import { createAppConfig } from '#app/modules/appConfig/appConfig';

function main() {
	let appConfig = createAppConfig(process.env);

	serve(
		{
			fetch: app.fetch,
			hostname: appConfig.host,
			port: appConfig.port,
		},
		(info) => {
			// eslint-disable-next-line no-console
			console.log(
				`Server is running on ${info.address}:${info.port} (${info.family})`,
			);
		},
	);
}

main();
