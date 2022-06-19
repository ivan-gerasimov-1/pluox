import { formatCurrency } from '@modules/intl/currency';
import { formatDate } from '@modules/intl/date';

export class IntlService {
	public static formatCurrency(value: number): string {
		return formatCurrency(value);
	}

	public static formatDate(value: number | string | Date) {
		return formatDate(value);
	}
}
