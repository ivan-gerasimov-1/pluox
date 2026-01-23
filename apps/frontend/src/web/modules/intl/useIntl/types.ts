import type { TLocaleCode } from '@pluox/core/src/modules/intl/domain/types';

export type TBaseScope = Record<string, unknown>;

export type TUseIntl<TScope extends TBaseScope> = {
	localeCode: TLocaleCode;
	translate: TScopedTranslateFunction<TScope>;
};

export type TScopedTranslateFunction<TScope extends TBaseScope> = <
	TKey extends keyof TScope,
>(
	key: TKey,
) => TScope[TKey];
