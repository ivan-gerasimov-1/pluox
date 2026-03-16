import type { IndexRouteObject, NonIndexRouteObject } from 'react-router';

export type TRouteMeta = {
	Actions?: React.ComponentType;
};

interface IIndexRouteObject extends IndexRouteObject {
	handle: TRouteMeta;
}
interface INonIndexRouteObject extends NonIndexRouteObject {
	handle: TRouteMeta;
}

export type TRouteObject = IIndexRouteObject | INonIndexRouteObject;
