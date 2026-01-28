import type { TSourceItem } from "./types";

function xmlParserWorker<T>(value: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("./parser.worker.ts", import.meta.url), {
      type: "module",
    });

    worker.postMessage(value);

    worker.onmessage = (event) => {
      resolve(event.data);
      worker.terminate();
    };

    worker.onerror = (event) => {
      reject(event.error);
      worker.terminate();
    };
  });
}

export async function getFeed(
  feeds: string[],
  options: {
    baseUrl: string;
  },
) {
  let feedPromises = feeds.map((feed) => {
    return fetchSource(feed, {
      baseUrl: options.baseUrl,
    });
  });

  let response = await Promise.all(feedPromises);

  let parsedResult = await Promise.all(
    response.map((item) => xmlParserWorker<TSourceItem[]>(item)),
  );

  return sortItemsByDate(
    parsedResult.reduce((state, source) => {
      state.push(...source);

      return state;
    }, []),
  );
}

async function fetchSource(url: string, options: { baseUrl: string }) {
  const response = await fetch(options.baseUrl + encodeURIComponent(url), {
    method: "GET",
    headers: {
      "Content-Type": "application/rss+xml",
      Accept: "application/rss+xml",
    },
  });

  return response.text();
}

function sortItemsByDate(items: { publishedAt: string | null }[]) {
  return items.sort(
    (a, b) =>
      new Date(b.publishedAt ?? "").getTime() -
      new Date(a.publishedAt ?? "").getTime(),
  );
}
