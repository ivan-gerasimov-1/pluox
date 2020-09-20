export function formatCurrency(value: number): string {
  return `₽${Number.prototype.toLocaleString.call(value)}`;
}
