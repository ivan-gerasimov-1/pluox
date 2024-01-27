import { AppConfig } from '@core/infrastructure/appConfig/AppConfig';

export function Settings() {
	const appConfig = AppConfig.getInstance();

	return (
		<div>
			<h1>Настройки</h1>
			<div>
				<h2>Пользователь</h2>
				<div>
					<strong>Имя:</strong> —
				</div>

				<div>
					<strong>Эл. почта:</strong> —
				</div>
			</div>

			<br />

			<div>
				<h2>Приложение</h2>
				<div>
					<strong>Язык:</strong> {appConfig.locale}
				</div>

				<div>
					<strong>Валюта:</strong> {appConfig.currency}
				</div>

				<div>
					<strong>Доступные валюты:</strong>{' '}
					{appConfig.availabelCurrencies.join(', ')}
				</div>

				<div>
					<strong>Бюджет:</strong> {appConfig.budget} {appConfig.currency}
				</div>
			</div>
		</div>
	);
}
