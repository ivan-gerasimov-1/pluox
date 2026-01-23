export interface IValueObject<T> {
	getValue(): T;
	equals(valueObject: IValueObject<T>): boolean;
}
