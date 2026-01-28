import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import {
	QueryClient,
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { CirclePlus, Link, Settings2, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Fragment } from 'react/jsx-runtime';

import { getFeed } from './feed';
import {
	getAudioPosition,
	getSources,
	setAudioPosition,
	setSources,
} from './storage';
import { ESource, type TSource, type TSourceType } from './types';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 1000 * 60 * 60 * 24, // 24 hours
		},
	},
});

const persister = createAsyncStoragePersister({
	storage: window.localStorage,
});

export function Main() {
	const path = location.pathname;

	return (
		<PersistQueryClientProvider
			client={queryClient}
			persistOptions={{ persister }}
		>
			<Header />

			{path === '/' && <Feed />}
			{path === '/podcasts' && <Podcasts />}
			{path === '/settings' && <Settings />}
		</PersistQueryClientProvider>
	);
}

function Header() {
	return (
		<div className="px-2 lg:px-32 flex items-center justify-between">
			<div className="w-[49px]" />

			<a href="/">
				<h1 className="m-6 text-3xl font-black tracking-tight text-center">
					DU·WS
				</h1>
			</a>

			<div>
				<a
					className="-mr-2 p-3 text-gray-400 hover:text-gray-700 inline-flex"
					href="/settings"
					aria-description=""
				>
					<span className="sr-only">Настройки</span>

					<Settings2 className="-mr-1" size="24" />
				</a>
			</div>
		</div>
	);
}

function Feed() {
	let { data: feed, isLoading } = useFeedQuery();

	if (isLoading) {
		return <p className="text-center">Loading...</p>;
	}

	return (
		<div className="gap-4 p-2 lg:px-32 flex flex-col">
			{feed?.map(
				(
					feedItem: // eslint-disable-next-line @typescript-eslint/no-explicit-any
					any,
				) => (
					<Fragment key={feedItem.id}>
						<div className="gap-4 flex justify-between">
							<div className="p-2 lg:p-8 max-w-full">
								<h2 className="font-bold font-serif leading-relaxed tracking-tight">
									<a
										className="-ml-2 p-2 inline-flex"
										href={feedItem.link}
										target="_blank"
										rel="noreferrer"
									>
										<span className="sr-only">{feedItem.title}</span>

										<Link size="16" />
									</a>
									{feedItem.title}
								</h2>
								<p className="mt-4 lg:mt-2 font-serif wrap-break-word">
									{feedItem.description}
								</p>
							</div>
						</div>
						<div className="flex items-center justify-center">×</div>
					</Fragment>
				),
			)}
		</div>
	);
}

function Podcasts() {
	let { data: podcasts, isLoading } = usePodcastsQuery();

	if (isLoading) {
		return <p className="text-center">Loading...</p>;
	}

	return (
		<div className="gap-4 p-2 lg:px-32 flex flex-col">
			{podcasts?.map(
				(
					podcast: // eslint-disable-next-line @typescript-eslint/no-explicit-any
					any,
				) => (
					<Fragment key={podcast.id}>
						<div className="gap-4 flex justify-between">
							<div className="p-2 lg:p-8 max-w-full">
								<h2 className="font-bold font-serif leading-relaxed tracking-tight">
									<a
										className="-ml-2 p-2 inline-flex"
										href={podcast.link}
										target="_blank"
										rel="noreferrer"
									>
										<Link size="16" />
									</a>
									{podcast.title}
								</h2>
								<p className="mt-4 lg:mt-2 font-serif wrap-break-word">
									{podcast.description}
								</p>
								<p>
									<AudioPlayer podcastId={podcast.id} src={podcast.media} />
								</p>
							</div>
						</div>
						<div className="flex items-center justify-center">×</div>
					</Fragment>
				),
			)}
		</div>
	);
}

function AudioPlayer({ podcastId, src }: { podcastId: string; src: string }) {
	let audioRef = useRef<HTMLAudioElement>(null);
	let hasRestoredPosition = useRef(false);

	useEffect(() => {
		let audio = audioRef.current;

		if (!audio) {
			return;
		}

		hasRestoredPosition.current = false;

		// Восстанавливаем позицию при первом воспроизведении (для iOS)
		let handlePlay = () => {
			if (hasRestoredPosition.current) {
				return;
			}

			getAudioPosition(podcastId).then((position) => {
				if (position > 0 && audio && audio.currentTime < 1) {
					audio.currentTime = position;
					hasRestoredPosition.current = true;
				}
			});
		};

		// Сохраняем позицию раз в 10 секунд во время воспроизведения
		let saveInterval = setInterval(() => {
			if (!audio.paused) {
				setAudioPosition(podcastId, audio.currentTime);
			}
		}, 10000);

		// Сохраняем позицию при паузе
		let handlePause = () => {
			setAudioPosition(podcastId, audio.currentTime);
		};

		audio.addEventListener('play', handlePlay);
		audio.addEventListener('pause', handlePause);

		return () => {
			clearInterval(saveInterval);
			audio.removeEventListener('play', handlePlay);
			audio.removeEventListener('pause', handlePause);
		};
	}, [podcastId]);

	return (
		<audio
			ref={audioRef}
			className="mt-4 lg:mt-2 w-full"
			src={src}
			preload="none"
			controls
		/>
	);
}

function Settings() {
	let [newSource, setNewSource] = useState<TSourceType | null>(null);

	let { data: sources } = useSourcesQuery();
	let { mutate: deleteSource } = useDeleteSourceMutation();

	return (
		<div className="gap-6 m-4 lg:mx-32 flex flex-col">
			<div className="gap-1 flex flex-col">
				<div className="flex items-center justify-between">
					<h2 className="font-bold">Источники</h2>
					<button
						type="button"
						className="p-3 rounded-md hover:bg-neutral-100"
						onClick={() =>
							setNewSource((prevState) => {
								return prevState !== ESource.FEED ? ESource.FEED : null;
							})
						}
					>
						<CirclePlus
							className={`${
								newSource === ESource.FEED ? 'rotate-45' : 'rotate-0'
							}`}
						/>
					</button>
				</div>

				{newSource === ESource.FEED && (
					<CreateSourceForm
						type={newSource}
						onSuccess={() => setNewSource(null)}
					/>
				)}

				{sources && (
					<ul className="text-sm list-disc">
						{sources
							.filter((source) => source.type === ESource.FEED)
							.map((feed) => (
								<li
									key={feed.url}
									className="flex items-center justify-between"
								>
									<pre className="overflow-hidden overflow-ellipsis">
										{feed.url}
									</pre>

									<button
										type="button"
										className="p-3 rounded-md hover:bg-neutral-100"
										onClick={() => deleteSource(feed)}
									>
										<X />
									</button>
								</li>
							))}
					</ul>
				)}
			</div>

			<div className="gap-1 flex flex-col">
				<div className="flex items-center justify-between">
					<h2 className="font-bold">Подкасты</h2>
					<button
						type="button"
						className="p-3 rounded-md hover:bg-neutral-100"
						onClick={() =>
							setNewSource((prevState) => {
								return prevState !== ESource.PODCAST ? ESource.PODCAST : null;
							})
						}
					>
						<CirclePlus
							className={`${
								newSource === ESource.PODCAST ? 'rotate-45' : 'rotate-0'
							}`}
						/>
					</button>
				</div>

				{newSource === ESource.PODCAST && (
					<CreateSourceForm
						type={newSource}
						onSuccess={() => setNewSource(null)}
					/>
				)}

				{sources && (
					<ul className="text-sm list-disc">
						{sources
							.filter((source) => source.type === ESource.PODCAST)
							.map((feed) => (
								<li
									key={feed.url}
									className="flex items-center justify-between"
								>
									<pre className="overflow-hidden overflow-ellipsis">
										{feed.url}
									</pre>

									<button
										type="button"
										className="p-3 rounded-md hover:bg-neutral-100"
										onClick={() => deleteSource(feed)}
									>
										<X />
									</button>
								</li>
							))}
					</ul>
				)}
			</div>
		</div>
	);
}

function CreateSourceForm({
	type,
	onSuccess,
}: {
	type: TSourceType;
	onSuccess?: () => void;
}) {
	let urlInputRef = useRef<HTMLInputElement>(null);
	let { mutate: createSource } = useCreateSourceMutation();

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		let form = document.forms.namedItem('createSourceForm');

		if (!form) {
			return;
		}

		let formData = new FormData(form);

		let { url, type } = Object.fromEntries(
			/** @ts-expect-error | Ignore me */
			formData,
		) as TSource;

		createSource(
			{
				url,
				type,
			},
			{
				onSuccess() {
					form.reset();

					if (onSuccess) {
						onSuccess();
					}
				},
			},
		);
	}

	useEffect(() => {
		if (!urlInputRef.current) {
			return;
		}

		urlInputRef.current.focus();
	}, []);

	return (
		<form
			id="createSourceForm"
			name="createSourceForm"
			className="gap-2 flex w-full flex-col justify-between"
			onSubmit={handleSubmit}
		>
			<div className="gap-2 flex flex-col">
				<label className="gap-1 flex grow flex-col" htmlFor="url">
					<span className="text-sm">Ссылка на RSS</span>
					<input
						ref={urlInputRef}
						id="url"
						type="url"
						name="url"
						className="px-3 py-2 rounded-md border-1"
						required
					/>
				</label>

				<fieldset className="gap-2 flex">
					<label
						className="px-3 py-2 rounded-md has-checked:text-white has-checked:bg-black pointer-events-none flex items-center justify-center border-1"
						htmlFor="typeFeed"
					>
						<span className="text-sm leading-4">Новости</span>
						<input
							id="typeFeed"
							type="radio"
							name="type"
							value={ESource.FEED}
							className="ms-1 mt-0.25 h-[0.75rem] w-[0.75rem]"
							defaultChecked={type === ESource.FEED}
							required
						/>
					</label>

					<label
						className="px-3 py-2 rounded-md has-checked:text-white has-checked:bg-black pointer-events-none flex items-center justify-center border-1"
						htmlFor="typePodcast"
					>
						<span className="text-sm leading-4">Подкасты</span>
						<input
							id="typePodcast"
							type="radio"
							name="type"
							value={ESource.PODCAST}
							className="ms-1 mt-0.25 h-[0.75rem] w-[0.75rem]"
							defaultChecked={type === ESource.PODCAST}
							required
						/>
					</label>
				</fieldset>
			</div>

			<button type="submit" className="p-2 rounded-md border-1">
				Добавить
			</button>
		</form>
	);
}

const PROXY_URL = 'https://corsproxy.io/?';

function useFeedQuery() {
	return useQuery({
		queryKey: ['feed'],
		queryFn: async () => {
			let sources = await getSources();
			let sourceUrls = sources
				.filter((source) => source.type === ESource.FEED)
				.map((source) => source.url);

			return getFeed(sourceUrls, {
				baseUrl: PROXY_URL,
			});
		},
	});
}

function usePodcastsQuery() {
	return useQuery({
		queryKey: ['podcasts'],
		queryFn: async () => {
			let sources = await getSources();
			let sourceUrls = sources
				.filter((source) => source.type === ESource.PODCAST)
				.map((source) => source.url);

			return getFeed(sourceUrls, {
				baseUrl: PROXY_URL,
			});
		},
	});
}

function useSourcesQuery() {
	return useQuery<TSource[]>({
		queryKey: ['sources'],
		queryFn: () => {
			return getSources();
		},
	});
}

function useCreateSourceMutation() {
	let queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (source: TSource) => {
			let sources = await getSources();

			sources.push({
				url: source.url,
				type: source.type,
			});

			await setSources(sources);
		},
		async onSuccess() {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: ['sources'],
				}),
				queryClient.invalidateQueries({
					queryKey: ['feed'],
				}),
				queryClient.invalidateQueries({
					queryKey: ['podcasts'],
				}),
			]);
		},
	});
}

function useDeleteSourceMutation() {
	let queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (source: TSource) => {
			let sources = await getSources();
			let nextSources = sources.filter((src) => src.url !== source.url);

			await setSources(nextSources);
		},
		async onSuccess() {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: ['sources'],
				}),
				queryClient.invalidateQueries({
					queryKey: ['feed'],
				}),
				queryClient.invalidateQueries({
					queryKey: ['podcasts'],
				}),
			]);
		},
	});
}
