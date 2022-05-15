import { ELocaleCode } from '@modules/intl';

export type TBaseScope = Record<string, unknown>;

export type TUseIntl<TScope extends TBaseScope> = {
	localeCode: ELocaleCode;
	translate: TScopedTranslateFunction<TScope>;
};

export type TScopedTranslateFunction<TScope extends TBaseScope> = <
	TKey extends keyof TScope
>(
	key: TKey
) => TScope[TKey];
