import type { TValueOf } from '@/core/types';

import { DECIMAL_SEPARATORS } from '@/core/modules/intl/domain/constants';
import type { ELocaleCode } from '@/core/modules/intl/domain/enums';

export type TDecimalSeparator = (typeof DECIMAL_SEPARATORS)[number];

export type TLocaleCode = TValueOf<typeof ELocaleCode>;
