import { bootstrapApp } from './bootstrap-app';
import { env } from './config';

const ServiceWorkerEvent = {
  Load: 'load',
};

if ('serviceWorker' in navigator) {
  window.addEventListener(ServiceWorkerEvent.Load, () => {
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
