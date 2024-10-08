import { config } from '#app/config';
import * as crypto from 'node:crypto';
import { createConnection } from 'node:net';

export async function sendEmail(to, subject, message) {
	const from = config.email.from;
	const smtpServer = config.email.host;
	const smtpPort = config.email.port;

	console.log('Start sending email');

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
					Buffer.from(config.email.auth.user).toString('base64'),
					Buffer.from(config.email.auth.password).toString('base64'),

					`MAIL FROM: <${from}>`,
					`RCPT TO: <${to}>`,

					'DATA',

					`From: ${from}`,
					`To: <${to}>`,
					`Subject: ${subject}`,
					`Date: ${new Date().toUTCString()}`,
					`Message-ID: <${crypto.randomUUID()}@savee.app>`,
					'MIME-Version: 1.0',
					'Content-Type: text/html; charset=UTF-8',
					'',
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
		console.log('CONNECT: Connected to SMTP server');
	});

	socket.on('data', (data) => {
		console.log('DATA RECEIVED:', data.toString());
	});

	socket.on('end', () => {
		console.log('END: Disconnected from SMTP server');
	});

	socket.on('error', (error) => {
		console.error('Error:', error);
	});
}
