import { XMLParser } from 'fast-xml-parser';

import type { TSourceItem } from './types';

type TChannel = {
	title: string;
	item: TChannelItem[];
};

type TChannelItem = {
	guid: string | number;
	title: string | number;
	link: string;
	description: string;
	pubDate: string;
	enclosure: string;
};

function broadcast<T>(payload: T) {
	self.postMessage(payload);
}

self.onmessage = function (event: MessageEvent<string>) {
	let parser = new XMLParser();

	try {
		let { rss } = parser.parse(event.data) as {
			rss: {
				channel: TChannel;
			};
		};

		let result = rss.channel.item.map((item) => {
			try {
				return mapChannelItemToSourceItem(item, {
					provider: rss.channel.title,
				});
			} catch (error) {
				throw new Error(`Unable to parse item with id: ${item.guid}`, {
					cause: error,
				});
			}
		});

		broadcast<TSourceItem[]>(result);
	} catch (error) {
		broadcast(error);
	}
};

function mapChannelItemToSourceItem(
	item: TChannelItem,
	{
		provider,
	}: {
		provider: TChannel['title'];
	},
): TSourceItem {
	return {
		provider,
		id: `${item.guid}`?.trim(),
		title: item.title ? sanitizeHtml(`${item.title}`?.trim()) : null,
		link: item.link?.trim(),
		description: item.description
			? sanitizeHtml(item.description?.trim())
			: null,
		publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : null,
		media: item.enclosure,
	};
}

const EXmlEntity: Record<string, string> = {
	'&nbsp;': ' ',
	'&laquo;': '«',
	'&raquo;': '»',
	'&quot;': '"',
	'&#39;': "'",
	'&lt;': '<',
	'&gt;': '>',
	'&amp;': '&',
	'&euro;': '€',
	'&mdash;': '—',
	'&ndash;': '–',
} as const;

function sanitizeHtml(html: string): string {
	return html
		.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>|<[^>]+>/gu, '')
		.replace(/&[a-zA-Z0-9#]+;/gu, (match) => EXmlEntity[match] || match)
		.replace(/\s+/gu, ' ');
}
