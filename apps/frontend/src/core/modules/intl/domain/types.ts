import { DECIMAL_SEPARATORS } from '@root/core/modules/intl/domain/constants';
import type { ELocaleCode } from '@root/core/modules/intl/domain/enums';
import type { TValueOf } from '@root/core/types';

export type TDecimalSeparator = (typeof DECIMAL_SEPARATORS)[number];

export type TLocaleCode = TValueOf<typeof ELocaleCode>;
