import type { TSource } from "./types";

const SOURCES_STORAGE_ID = "sources";

export async function getSources(): Promise<TSource[]> {
  let rawSources = localStorage.getItem(SOURCES_STORAGE_ID);

  return JSON.parse(rawSources ?? "[]") ?? [];
}

export async function setSources(sources: TSource[]): Promise<void> {
  localStorage.setItem(SOURCES_STORAGE_ID, JSON.stringify(sources));
}

const AUDIO_POSITION_STORAGE_ID = "audioPositions";

type TAudioPosition = {
  [podcastId: string]: number;
};

export async function getAudioPosition(podcastId: string): Promise<number> {
  let rawPositions = localStorage.getItem(AUDIO_POSITION_STORAGE_ID);
  let positions: TAudioPosition = JSON.parse(rawPositions ?? "{}") ?? {};

  return positions[podcastId] ?? 0;
}

export async function setAudioPosition(
  podcastId: string,
  position: number,
): Promise<void> {
  let rawPositions = localStorage.getItem(AUDIO_POSITION_STORAGE_ID);
  let positions: TAudioPosition = JSON.parse(rawPositions ?? "{}") ?? {};

  positions[podcastId] = position;

  localStorage.setItem(AUDIO_POSITION_STORAGE_ID, JSON.stringify(positions));
}
