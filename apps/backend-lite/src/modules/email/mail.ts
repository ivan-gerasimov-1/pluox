import { connect, createConnection, type Socket } from 'node:net';
import { connect as createSecureConnection, type TLSSocket } from 'node:tls';
import * as crypto from 'node:crypto';

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
		return new Promise((resolve, reject) => {
			let socket = this.#createConnection(
				{
					host: this.server.host,
					port: this.server.port,
				},
				() => {
					socket.write(`EHLO ${this.server.host}\r\n`);

					console.log('CONNECTED');
					resolve(socket);
				},
			);
		});
	}

	#authenticate(): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.#socket.write(
				[
					'AUTH LOGIN',
					Buffer.from(this.authentication.user).toString('base64'),
					Buffer.from(this.authentication.password).toString('base64'),
				].join('\r\n'),
				(error) => {
					if (error) {
						reject(error);
					}

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
			this.#socket.on('data', (data) => {
				console.log('DATA:', data.toString());
			});

			this.#socket.write(
				[
					'',
					`MAIL FROM: <${params.from}>`,
					`RCPT TO: <${params.to}>`,

					'DATA',

					`From: ${params.from}`,
					`To: <${params.to}>`,
					`Subject: ${params.subject}`,
					`Date: ${new Date().toUTCString()}`,
					`Message-ID: <${crypto.randomUUID()}@savee.app>`,
					'MIME-Version: 1.0',
					'Content-Type: text/html; charset=UTF-8',
					'',
					`${params.message}`,
					'.',
					'QUIT',
					'',
				].join('\r\n'),
			);
			(error) => {
				if (error) {
					reject(error);
				}

				console.log('EMAIL SENT');

				resolve();
			};
		});
	}
}
