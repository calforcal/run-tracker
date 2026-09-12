// Matches the flattened, single-artist/single-image shape the backend
// persists and returns (api/dto/user_dto.go SongResponse), not Spotify's
// native nested track/album/artists[] shape.
export interface Song {
  title: string;
  artist: string;
  albumTitle: string;
  durationMs: number;
  imageUrl: string;
  uri: string;
  spotifyId: string;
}

export interface ListeningHistoryItem {
  song: Song;
  playedAt: string;
}

export interface ListeningHistory {
  items: ListeningHistoryItem[];
}

// Snake case versions for API responses
export interface SongSnake {
  title: string;
  artist: string;
  album_title: string;
  duration_ms: number;
  image_url: string;
  uri: string;
  spotify_id: string;
}

export interface ListeningHistoryItemSnake {
  song: SongSnake;
  played_at: string;
}

export interface ListeningHistorySnake {
  items: ListeningHistoryItemSnake[];
}

// Utility type for converting snake_case to camelCase
export type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}`
  ? `${T}${Capitalize<SnakeToCamelCase<U>>}`
  : S;

// Type for converting the entire ListeningHistory from snake_case to camelCase
export type ConvertToCamelCase<T> = {
  [K in keyof T as SnakeToCamelCase<K & string>]: T[K] extends Array<infer U>
    ? Array<ConvertToCamelCase<U>>
    : T[K] extends object
    ? ConvertToCamelCase<T[K]>
    : T[K];
};

// The converted type
export type ListeningHistoryFromAPI = ConvertToCamelCase<ListeningHistorySnake>;