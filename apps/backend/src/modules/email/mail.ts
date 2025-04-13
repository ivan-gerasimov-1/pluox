import { connect as createConnection, type Socket } from 'node:net';
import { connect as createSecureConnection, type TLSSocket } from 'node:tls';
import { generatedUuid } from '#app/modules/crypto/generateUUID';

export class Mail {
	#socket: TLSSocket | Socket;

	constructor(
		private readonly server: { host: string; port: number },
		private readonly authentication: { user: string; password: string },
		private readonly options: {
			isSecure: boolean;
		},
	) {}

	get #createConnection(): (
		options: { host: string; port: number },
		cb: () => void,
	) => Socket {
		return (
			this.options.isSecure ? createSecureConnection : createConnection
		) as (options: { host: string; port: number }, cb: () => void) => Socket;
	}

	async send(params: {
		from: string;
		to: string;
		subject: string;
		message: string;
	}): Promise<void> {
		this.#socket = await this.#connect();

		await this.#authenticate();
		await this.#send(params);
	}

	#connect(): Promise<Socket> {
		return new Promise((resolve) => {
			let socket = this.#createConnection(
				{
					host: this.server.host,
					port: this.server.port,
				},
				() => {
					socket.write(this.#wrapSocketMessage(`EHLO ${this.server.host}`));

					// eslint-disable-next-line no-console
					console.log('CONNECTED');
					resolve(socket);
				},
			);
		});
	}

	#authenticate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.#socket.write(
				this.#wrapSocketMessage(
					'AUTH LOGIN',
					Buffer.from(this.authentication.user).toString('base64'),
					Buffer.from(this.authentication.password).toString('base64'),
				),
				(error) => {
					if (error) {
						reject(error);
					}

					// eslint-disable-next-line no-console
					console.log('AUTHENTICATED');
					resolve();
				},
			);
		});
	}

	#send(params: {
		from: string;
		to: string;
		subject: string;
		message: string;
	}) {
		return new Promise<void>((resolve, reject) => {
			let datetime = new Date().toUTCString();
			let messageId = generatedUuid();

			this.#socket.write(
				this.#wrapSocketMessage(
					`MAIL FROM: <${params.from}>`,
					`RCPT TO: <${params.to}>`,

					'DATA',

					`From: "Savee Team" <${params.from}>`,
					`To: <${params.to}>`,
					`Subject: ${params.subject}`,
					`Date: ${datetime}`,
					`Message-ID: <${messageId}@savee.app>`,
					'MIME-Version: 1.0',
					'Content-Type: text/html; charset=UTF-8',
					'',
					`${params.message}`,
					'.',
					'QUIT',
				),
				(error) => {
					if (error) {
						reject(error);
					}

					// eslint-disable-next-line no-console
					console.log('EMAIL SENT');

					resolve();
				},
			);
		});
	}

	#wrapSocketMessage(...messages: string[]): string {
		return [...messages, ''].join('\r\n');
	}
}
