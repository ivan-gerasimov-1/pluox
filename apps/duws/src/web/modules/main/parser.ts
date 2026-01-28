import type { TSourceItem } from './types';

let domParser: DOMParser | null = null;

function getOrCreateDomParser(): DOMParser {
	if (!domParser) {
		domParser = new DOMParser();
	}

	return domParser;
}

export function parseXml(value: string): Document {
	let domParser = getOrCreateDomParser();

	return domParser.parseFromString(value, 'text/xml');
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

const EXmlToken = {
	ITEM: 'item',
	GUID: 'guid',
	TITLE: 'title',
	LINK: 'link',
	DESCRIPTION: 'description',
	PUB_DATE: 'pubDate',
	ENCLOSURE: 'enclosure',
} as const;

export function parseXmlFeed(xml: Document): TSourceItem[] {
	let items = [];

	let { provider } = parseXmlMeta(xml);

	// @ts-expect-error | TODO
	for (let item of xml.getElementsByTagName(EXmlToken.ITEM)) {
		let { id, title, link, description, publishedAt, media } =
			parseXmlItem(item);

		items.push({
			provider,
			id,
			title,
			link,
			description,
			publishedAt,
			media,
		});
	}

	return items;
}

function parseXmlMeta(xml: Document): Pick<TSourceItem, 'provider'> {
	let provider = xml.getElementsByTagName(EXmlToken.TITLE)[0].textContent;

	return {
		provider,
	};
}

function parseXmlItem(item: Element): Omit<TSourceItem, 'provider'> {
	let id = item.getElementsByTagName(EXmlToken.GUID)?.[0].textContent;
	let title = item.getElementsByTagName(EXmlToken.TITLE)?.[0].textContent;
	let link = item.getElementsByTagName(EXmlToken.LINK)?.[0].textContent;
	let description = item.getElementsByTagName(EXmlToken.DESCRIPTION)?.[0]
		.textContent;
	let pubDate = item.getElementsByTagName(EXmlToken.PUB_DATE)?.[0].textContent;
	let media = item
		.getElementsByTagName(EXmlToken.ENCLOSURE)?.[0]
		?.attributes.getNamedItem('url')?.value;

	return {
		id: id?.trim(),
		title: title ? sanitizeHtml(title?.trim()) : null,
		link: link?.trim(),
		description: description ? sanitizeHtml(description?.trim()) : null,
		publishedAt: pubDate ? new Date(pubDate).toISOString() : null,
		media,
	};
}
