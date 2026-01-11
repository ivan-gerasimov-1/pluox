import { app } from '@/app';
import { initializeSentry } from '@/sentry';
import { registerServiceWorker } from '@/serviceWorker';
import { initializeUmami } from '@/umami';

import type { IWindow } from '@/presentation/web-ui/types';

(function main(window: IWindow) {
	initializeUmami();
	initializeSentry();

	registerServiceWorker();

	app(window);
})(window);
