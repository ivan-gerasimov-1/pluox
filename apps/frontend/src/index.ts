import { app } from '@root/app';
import { initializeSentry } from '@root/sentry';
import { registerServiceWorker } from '@root/serviceWorker';
import { initializeUmami } from '@root/umami';

import type { IWindow } from '@root/presentation/web-ui/types';

(function main(window: IWindow) {
	initializeUmami();
	initializeSentry();

	registerServiceWorker();

	app(window);
})(window);
