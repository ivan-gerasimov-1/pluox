module.exports = {
	apps: [
		{
			name: 'Savee API',
			script: 'index.js',
			node_args: '-r dotenv/config',
			instances: 'max',
			exec_mode: 'cluster',
			env: {
				NODE_ENV: 'production',
			},
		},
	],
};
