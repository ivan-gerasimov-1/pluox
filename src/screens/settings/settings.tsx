import { AppConfig } from '@core/infrastructure/appConfig/AppConfig';
import { ELocaleCode } from '@core/infrastructure/intl/enums';
import { useAppConfigStore } from '@modules/appConfig/appConfig.store';

export function Settings() {
	const appConfig = AppConfig.getInstance();

	const config = useAppConfigStore();

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
					<strong>Язык:</strong>
					<select
						name="locale"
						id="locale"
						value={config.locale}
						onChange={(event) => {
							const locale = event.target.value as ELocaleCode;

							config.update({ locale });
						}}
					>
						<option key={ELocaleCode.RU_RU} value={ELocaleCode.RU_RU}>
							Русский
						</option>
						<option key={ELocaleCode.EN_US} value={ELocaleCode.EN_US}>
							English
						</option>
					</select>
				</div>

				<div>
					<strong>Валюта:</strong> {appConfig.currency}
				</div>

				<div>
					<strong>Доступные валюты:</strong>{' '}
					{appConfig.availabelCurrencies.join(', ')}
				</div>

				<div>
					<strong>Бюджет:</strong>
					<input
						type="number"
						value={config.budget || 0}
						onChange={(event) => {
							const budget = Number.parseInt(event.target.value);

							config.update({ budget });
						}}
					/>
					<span> {appConfig.currency}</span>
				</div>
			</div>
		</div>
	);
}
