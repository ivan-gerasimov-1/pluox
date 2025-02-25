export interface ISession {
	create(payload: TSessionData): string;

	has(sessionId: string): boolean;

	get(sessionId: string): TSessionData | null;
	remove(id: string): this;
}

export type TSessionData = {
	userId: string;
};
