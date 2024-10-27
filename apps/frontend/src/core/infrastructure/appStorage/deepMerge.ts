export function deepMerge<T>(target: T, source: Partial<T>): T {
	for (const key in source) {
		if (Object.prototype.hasOwnProperty.call(source, key)) {
			const sourceValue = source[key];

			if (
				sourceValue !== undefined &&
				typeof sourceValue === 'object' &&
				sourceValue !== null &&
				!Array.isArray(sourceValue)
			) {
				const targetValue = target[key] as typeof sourceValue;

				if (
					typeof targetValue === 'object' &&
					targetValue !== null &&
					!Array.isArray(targetValue)
				) {
					target[key] = deepMerge(
						targetValue as T[typeof key],
						sourceValue,
					) as T[typeof key];
				} else {
					target[key] = sourceValue as T[typeof key];
				}
			} else {
				target[key] = sourceValue as T[typeof key];
			}
		}
	}
	return target;
}
