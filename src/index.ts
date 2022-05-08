import { bootstrapApp } from './bootstrap-app';
import { env } from './config';

enum ServiceWorkerEvent {
  LOAD = 'load',
};

if ('serviceWorker' in navigator) {
  window.addEventListener(ServiceWorkerEvent.LOAD, () => {
    navigator.serviceWorker.register('/sw.js');
  });
} else {
  console.log('Service worker is not supported in this browser');
}

bootstrapApp();

/** @description Enable base HMR */
if (env.isDev) {
  (module as any).hot?.accept();
}
