import { initializeSentry } from '@/integrations/sentry';
import { initializeUmami } from '@/integrations/umami';

export function runIntegrations() {
	initializeUmami();
	initializeSentry();
}
