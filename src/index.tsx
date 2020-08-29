import { env } from './config';
import { bootstrapApp } from './bootstrap-app';

bootstrapApp();

/** @description Enable base HMR */
if (env.isDev) {
  (module as any).hot?.accept();
}
