export type TSource = {
  url: string;
  type: TSourceType;
};

export const ESource = {
  FEED: "feed",
  PODCAST: "podcast",
} as const;

export type TSourceType = (typeof ESource)[keyof typeof ESource];

export type TSourceItem = {
  provider: string;
  id: string;
  title: string | null;
  link: string;
  description: string | null;
  publishedAt: string | null;
  media: string | undefined;
};
