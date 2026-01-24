import { TRouteMeta } from './types';
import { useMatches } from 'react-router';

export function useRouteMeta(): TRouteMeta {
	let matches = useMatches();
	let meta: TRouteMeta = matches.at(-1)?.handle as TRouteMeta;

	return meta;
}
