import { frontend as eslintConfig } from '@lv48/eslint-config';

export default [
	...eslintConfig,
	{
		rules: {
			/** @todo | Enabled rule */
			'react-hooks/refs': 'warn',
			/** @todo | Enabled rule */
			'react-hooks/static-components': 'warn',
		},
	},
];
