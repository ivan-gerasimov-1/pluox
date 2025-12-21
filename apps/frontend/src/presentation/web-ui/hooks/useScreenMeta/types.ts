import type { IndexRouteObject, NonIndexRouteObject } from 'react-router';

import { ELocaleCode } from '@root/core/modules/intl/domain/enums';

export type TRouteMeta = {
	hasNavbar?: boolean;
	hasNavbarActions?: boolean;
} & (
	| {
			title: {
				[ELocaleCode.EN_US]: string;
				[ELocaleCode.RU_RU]: string;
			};
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
