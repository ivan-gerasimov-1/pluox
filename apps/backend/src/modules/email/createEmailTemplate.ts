type TCreateEmailTemplateParams = {
	language?: ELanguage;

	title: string;
	heading: string;
	body: string;
};

const enum ELanguage {
	RU = 'ru',
}

const enum EColor {
	TEXT = '#2b2828',
	LINK = '#5479A0',
}

export function createEmailTemplate(
	params: TCreateEmailTemplateParams,
): string {
	return `
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
			<html lang=${params.language || ELanguage.RU} dir="ltr">
			<head>
				<meta content="text/html; charset=UTF-8" httpEquiv="Content-Type" />
				<meta name="x-apple-disable-message-reformatting" />
				<title>${params.title}</title>

				<style>
					@font-face {
						font-family: 'Inter';
						font-style: normal;
						font-weight: 400;
						mso-font-alt: 'Helvetica';
						src: url(https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hiA.woff2) format('woff2');
					}

					* {
						font-family: 'Inter', Helvetica;

						color: ${EColor.TEXT};
					}

					a {
						color: ${EColor.LINK};
					}
				</style>
			</head>

			<body>
				<main>
					<h1>${params.heading}</h1>
					${params.body}
				</main>
			</body>
		</html>
	`;
}
