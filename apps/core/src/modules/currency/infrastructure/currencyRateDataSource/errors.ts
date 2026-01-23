export class CurrencyRatesNotAvailableError extends Error {
	constructor() {
		super('Currency rates are not available');
	}
}
