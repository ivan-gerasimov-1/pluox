import type { IndexRouteObject, NonIndexRouteObject } from 'react-router';

export type TRouteMeta = {
	hasNavbar?: boolean;
	hasNavbarActions?: boolean;
} & (
	| {
			title: string;
			TitleComponent?: never;
	  }
	| {
			title?: never;
			TitleComponent: React.ComponentType;
	  }
);

interface IIndexRouteObject extends IndexRouteObject {
	handle: TRouteMeta;
}
interface INonIndexRouteObject extends NonIndexRouteObject {
	handle: TRouteMeta;
}

export type TRouteObject = IIndexRouteObject | INonIndexRouteObject;
