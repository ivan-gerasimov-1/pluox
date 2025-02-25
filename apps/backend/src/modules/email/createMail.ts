import { Mail } from '#app/modules/email/mail';

export function createMail(emailConfig: {
	host: string;
	port: number;
	auth: {
		user: string;
		password: string;
	};
	provider: string;
}) {
	return new Mail(
		{
			host: emailConfig.host,
			port: emailConfig.port,
		},
		{
			user: emailConfig.auth.user,
			password: emailConfig.auth.password,
		},
		{
			isSecure: emailConfig.provider === 'zoho',
		},
	);
}
