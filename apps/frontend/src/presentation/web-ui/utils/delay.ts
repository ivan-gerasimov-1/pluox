export async function delay(timeoutMs: number = 0): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(void 0);
		}, timeoutMs);
	});
}
