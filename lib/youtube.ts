type YouTubeEpisode = {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string | null;
  publishedAt: string | null;
  durationText: string | null;
};

type YouTubeEpisodesResult = {
  episodes: YouTubeEpisode[];
  channelUrl: string | null;
  configured: boolean;
};

const YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3";
const YOUTUBE_FEED_BASE = "https://www.youtube.com/feeds/videos.xml";

function decodeXmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function stripIsoDurationPrefix(value: string) {
  return value.replace(/^PT/, "");
}

function formatIsoDuration(value: string | undefined) {
  if (!value) {
    return null;
  }

  const duration = stripIsoDurationPrefix(value);
  const hours = /(\d+)H/.exec(duration)?.[1];
  const minutes = /(\d+)M/.exec(duration)?.[1];
  const seconds = /(\d+)S/.exec(duration)?.[1];

  const hh = hours ? Number(hours) : 0;
  const mm = minutes ? Number(minutes) : 0;
  const ss = seconds ? Number(seconds) : 0;

  if (!hh && !mm && !ss) {
    return null;
  }

  if (hh > 0) {
    return `${hh}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
  }

  return `${mm}:${String(ss).padStart(2, "0")}`;
}

function pickBestThumbnail(thumbnails: Record<string, { url: string }> | undefined) {
  return (
    thumbnails?.maxres?.url ||
    thumbnails?.standard?.url ||
    thumbnails?.high?.url ||
    thumbnails?.medium?.url ||
    thumbnails?.default?.url ||
    null
  );
}

async function fetchJson<T>(url: string) {
  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`YouTube request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

async function getEpisodesFromApi(channelId: string, apiKey: string, limit: number) {
  type ChannelsResponse = {
    items?: Array<{
      contentDetails?: {
        relatedPlaylists?: {
          uploads?: string;
        };
      };
    }>;
  };

  type PlaylistItemsResponse = {
    items?: Array<{
      contentDetails?: {
        videoId?: string;
      };
      snippet?: {
        title?: string;
        publishedAt?: string;
        thumbnails?: Record<string, { url: string }>;
      };
    }>;
  };

  type VideosResponse = {
    items?: Array<{
      id?: string;
      contentDetails?: {
        duration?: string;
      };
    }>;
  };

  const channelsUrl =
    `${YOUTUBE_API_BASE}/channels?part=contentDetails&id=${channelId}&key=${apiKey}`;
  const channels = await fetchJson<ChannelsResponse>(channelsUrl);
  const uploadsPlaylistId =
    channels.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

  if (!uploadsPlaylistId) {
    return [];
  }

  const playlistUrl =
    `${YOUTUBE_API_BASE}/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=${limit}&key=${apiKey}`;
  const playlistItems = await fetchJson<PlaylistItemsResponse>(playlistUrl);
  const items = playlistItems.items ?? [];

  const videoIds = items
    .map((item) => item.contentDetails?.videoId)
    .filter((value): value is string => Boolean(value));

  const durationsById = new Map<string, string | null>();

  if (videoIds.length > 0) {
    const videosUrl =
      `${YOUTUBE_API_BASE}/videos?part=contentDetails&id=${videoIds.join(",")}&key=${apiKey}`;
    const videos = await fetchJson<VideosResponse>(videosUrl);

    for (const item of videos.items ?? []) {
      if (!item.id) {
        continue;
      }

      durationsById.set(item.id, formatIsoDuration(item.contentDetails?.duration));
    }
  }

  return items
    .map((item): YouTubeEpisode | null => {
      const id = item.contentDetails?.videoId;

      if (!id) {
        return null;
      }

      return {
        id,
        title: item.snippet?.title?.trim() || "Episodio",
        url: `https://www.youtube.com/watch?v=${id}`,
        thumbnailUrl: pickBestThumbnail(item.snippet?.thumbnails),
        publishedAt: item.snippet?.publishedAt || null,
        durationText: durationsById.get(id) ?? null,
      };
    })
    .filter((item): item is YouTubeEpisode => Boolean(item));
}

async function getEpisodesFromRss(channelId: string, limit: number) {
  const response = await fetch(`${YOUTUBE_FEED_BASE}?channel_id=${channelId}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`YouTube RSS request failed: ${response.status}`);
  }

  const xml = await response.text();
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].slice(0, limit);

  return entries
    .map((match): YouTubeEpisode | null => {
      const entry = match[1];
      const id = /<yt:videoId>([^<]+)<\/yt:videoId>/.exec(entry)?.[1]?.trim();
      const title = /<title>([\s\S]*?)<\/title>/.exec(entry)?.[1]?.trim();
      const publishedAt = /<published>([^<]+)<\/published>/.exec(entry)?.[1]?.trim();
      const url = /<link[^>]+href="([^"]+)"/.exec(entry)?.[1]?.trim();

      if (!id || !title || !url) {
        return null;
      }

      return {
        id,
        title: decodeXmlEntities(title),
        url,
        thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        publishedAt: publishedAt || null,
        durationText: null,
      };
    })
    .filter((item): item is YouTubeEpisode => Boolean(item));
}

export async function getYouTubeEpisodes(limit = 4): Promise<YouTubeEpisodesResult> {
  const channelId = process.env.YOUTUBE_CHANNEL_ID?.trim() || "";
  const apiKey = process.env.YOUTUBE_API_KEY?.trim() || "";

  if (!channelId) {
    return {
      episodes: [],
      channelUrl: null,
      configured: false,
    };
  }

  try {
    const episodes = apiKey
      ? await getEpisodesFromApi(channelId, apiKey, limit)
      : await getEpisodesFromRss(channelId, limit);

    return {
      episodes,
      channelUrl: `https://www.youtube.com/channel/${channelId}/videos`,
      configured: true,
    };
  } catch {
    return {
      episodes: [],
      channelUrl: `https://www.youtube.com/channel/${channelId}/videos`,
      configured: true,
    };
  }
}

export type { YouTubeEpisode, YouTubeEpisodesResult };
