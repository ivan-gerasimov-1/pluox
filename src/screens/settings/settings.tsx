import { AuthService } from '@core/infrastructure/authService/AuthService';
import { ELocaleCode } from '@core/infrastructure/intl/enums';

import { useAppConfigStore } from '@modules/appConfig/appConfig.store';
import { useNavigation } from '@modules/navigation/useNavigation';
import { EService, useService } from '@modules/serviceContainer/useService';

import { Header } from '@uiKit/header/header';
import { Button } from '@uiKit/button/button';

import styles from './settings.module.css';

export function Settings() {
	const appConfig = useService(EService.APP_CONFIG);

	const config = useAppConfigStore();
	let navigation = useNavigation();

	return (
		<>
			<Header title="Настройки" />

			<div>
				<div className={styles.section}>
					<h2 className={styles.sectionHeader}>Пользователь</h2>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>Имя:</span> —
					</div>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>Эл. почта:</span> —
					</div>
				</div>

				<div className={styles.section}>
					<h2 className={styles.sectionHeader}>Приложение</h2>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>Язык:</span>
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

					<div className={styles.field}>
						<span className={styles.fieldLabel}>Валюта:</span>{' '}
						{appConfig.currency}
					</div>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>Доступные валюты:</span>{' '}
						{appConfig.availabelCurrencies.join(', ')}
					</div>

					<div className={styles.field}>
						<span className={styles.fieldLabel}>Бюджет:</span>
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

			<br />

			<div>
				<Button
					style={{ width: '100%' }}
					onClick={() => {
						if (!window.confirm('Вы уверены, что хотите выйти?')) {
							return;
						}

						AuthService.getInstance().signOut();

						navigation.mainPage();
					}}
				>
					Выйти
				</Button>
			</div>
		</>
	);
}
