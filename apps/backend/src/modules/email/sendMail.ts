import { appConfig } from '#app/config';
import * as crypto from 'node:crypto';
import { createConnection } from 'node:net';

export async function sendEmail(to, subject, message) {
	const from = appConfig.email.from;
	const smtpServer = appConfig.email.host;
	const smtpPort = appConfig.email.port;

	const socket = createConnection(
		{
			host: smtpServer,
			port: smtpPort,
		},
		() => {
			socket.write(
				[
					`EHLO ${smtpServer}`,
					'AUTH LOGIN',
					Buffer.from(appConfig.email.auth.user).toString('base64'),
					Buffer.from(appConfig.email.auth.password).toString('base64'),

					`MAIL FROM: <${from}>`,
					`RCPT TO: <${to}>`,

					'DATA',

					`From: ${from}`,
					`To: <${to}>`,
					`Subject: ${subject}`,
					`Date: ${new Date().toUTCString()}`,
					`Message-ID: <${crypto.randomUUID()}@pluox.app>`,
					'MIME-Version: 1.0',
					'Content-Type: text/html; charset=UTF-8',
					'',
					// eslint-disable-next-line no-useless-call
					`${message.call(null, to, subject)}`,
					'.',
					'QUIT',
					'',
				].join('\r\n'),
			);

			/**
			 * @description Reset the connection
			 */
			// socket.write('RSET\r\n');
		},
	);

	socket.on('connect', () => {
		// eslint-disable-next-line no-console
		console.log('CONNECT: Connected to SMTP server');
	});

	socket.on('data', (data) => {
		// eslint-disable-next-line no-console
		console.log('DATA RECEIVED:', data.toString());
	});

	socket.on('end', () => {
		// eslint-disable-next-line no-console
		console.log('END: Disconnected from SMTP server');
	});

	socket.on('error', (error) => {
		// eslint-disable-next-line no-console
		console.error('Error:', error);
	});
}
