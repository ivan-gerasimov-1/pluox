const BUILDER = 'pluox-one-cpu';

// CI steps and this builder share CPU 0, keeping their aggregate compute to one core.
export async function buildImage({
	image,
	source,
	run,
	signal,
	preview = false,
}) {
	try {
		await run('docker', ['buildx', 'inspect', BUILDER], {
			capture: true,
			signal,
		});
	} catch (error) {
		signal?.throwIfAborted();
		await run(
			'docker',
			[
				'buildx',
				'create',
				'--name',
				BUILDER,
				'--driver',
				'docker-container',
				'--driver-opt',
				'cpu-period=100000,cpu-quota=100000,cpuset-cpus=0,memory=2g,memory-swap=2g',
			],
			{ signal },
		);
	}
	await run(
		'docker',
		[
			'buildx',
			'build',
			'--builder',
			BUILDER,
			'--load',
			'--build-arg',
			'APP_API_URL=/api',
			'--build-arg',
			`APP_PREVIEW=${preview}`,
			'-t',
			image,
			source,
		],
		{ signal },
	);
}
