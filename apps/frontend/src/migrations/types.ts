export type TMigrationDTO = {
	id: string;
	success: boolean;
	createdAt: string;
};

export type TMigrationCreateDTO = {
	id: string;
	success: boolean;
	createdAt?: string;
};
