import { bootstrapApp } from './bootstrap-app';
import { environment } from './config';

enum ServiceWorkerEvent {
	LOAD = 'load',
}

if ('serviceWorker' in navigator) {
	window.addEventListener(ServiceWorkerEvent.LOAD, () => {
		navigator.serviceWorker.register('/sw.js');
	});
} else {
	console.log('Service worker is not supported in this browser');
}

bootstrapApp();

/** @description Enable base HMR */
if (environment.isDev) {
	(module as any).hot?.accept();
}
