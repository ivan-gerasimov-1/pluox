export class CategoryNotFoundError extends Error {
	public constructor(id: string) {
		super(`Category with id ${id} not found`);
	}
}

export class InvalidCategoryWeightChangeCommandError extends Error {
	public constructor() {
		super('Invalid category weight change command');
	}
}
