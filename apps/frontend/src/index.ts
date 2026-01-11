import { app } from '@/app';
import type { IWindow } from '@/presentation/web-ui/types';
import { initializeSentry } from '@/sentry';
import { registerServiceWorker } from '@/serviceWorker';
import { initializeUmami } from '@/umami';

(function main(window: IWindow) {
	initializeUmami();
	initializeSentry();

	registerServiceWorker();

	app(window);
})(window);
