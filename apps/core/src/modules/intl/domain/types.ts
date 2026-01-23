import type { TValueOf } from '@pluox/core/src/types';

import { DECIMAL_SEPARATORS } from '@pluox/core/src/modules/intl/domain/constants';
import type { ELocaleCode } from '@pluox/core/src/modules/intl/domain/enums';

export type TDecimalSeparator = (typeof DECIMAL_SEPARATORS)[number];

export type TLocaleCode = TValueOf<typeof ELocaleCode>;
