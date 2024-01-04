module.exports = {
	apps: [
		{
			name: 'Savee API',
			script: 'index.js',
			instances: 'max',
			exec_mode: 'cluster',
			env: {
				NODE_ENV: 'production',
				PORT: 3000,
			},
		},
	],
};
