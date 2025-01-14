import {
	EServiceToken,
	type IModule,
} from '@root/core/infrastructure/serviceContainer/types';

import { IntlService } from '@root/core/modules/intl/application/intlService/intlService';
import { CurrencyFormatter } from '@root/core/modules/intl/infrastructure/currencyFormatter/currencyFormatter';
import { DateFormatter } from '@root/core/modules/intl/infrastructure/dateFormatter/dateFormatter';
import { NumberParser } from '@root/core/modules/intl/infrastructure/numberParser/numberParser';

export const intlModule: IModule = {
	providers: [
		{
			token: EServiceToken.NUMBER_PARSER,
			useClass: NumberParser,
			deps: [EServiceToken.APP_CONFIG],
		},
		{
			token: EServiceToken.CURRENCY_FORMATTER,
			useClass: CurrencyFormatter,
		},
		{
			token: EServiceToken.DATE_FORMATTER,
			useClass: DateFormatter,
		},
		{
			token: EServiceToken.INTL_SERVICE,
			useClass: IntlService,
			deps: [
				EServiceToken.APP_CONFIG,
				EServiceToken.NUMBER_PARSER,
				EServiceToken.CURRENCY_FORMATTER,
				EServiceToken.DATE_FORMATTER,
			],
		},
	],
};
