const ServiceWorkerEvent = {
  Activate: 'activate',
  Fetch: 'fetch',
  Install: 'install',
};

function noop() {}

self.addEventListener(ServiceWorkerEvent.Install, noop);
self.addEventListener(ServiceWorkerEvent.Activate, noop);
self.addEventListener(ServiceWorkerEvent.Fetch, noop);
