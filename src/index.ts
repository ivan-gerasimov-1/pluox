import { bootstrapApp } from '@root/bootstrap-app';
import { environment } from '@root/config';

enum EServiceWorkerEvent {
	LOAD = 'load',
}

if ('serviceWorker' in navigator) {
	window.addEventListener(EServiceWorkerEvent.LOAD, () => {
		navigator.serviceWorker.register('/sw.js');
	});
} else {
	console.log('Service worker is not supported in this browser');
}

bootstrapApp();

/** @description Enable base HMR */
if (environment.isDevelopment) {
	(module as any).hot?.accept();
}
