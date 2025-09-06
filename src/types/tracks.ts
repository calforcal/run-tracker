export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Artist {
  name: string;
}

export interface AlbumInfo {
  name: string;
  releaseDate: string;
  images: Image[];
}

export interface TrackInfo {
  name: string;
  durationMs: number;
  album: AlbumInfo;
  artists: Artist[];
}

export interface ListeningHistoryItem {
  track: TrackInfo;
  playedAt: string;
}

export interface ListeningHistory {
  items: ListeningHistoryItem[];
}

// Snake case versions for API responses
export interface ImageSnake {
  url: string;
  height: number;
  width: number;
}

export interface ArtistSnake {
  name: string;
}

export interface AlbumInfoSnake {
  name: string;
  release_date: string;
  images: ImageSnake[];
}

export interface TrackInfoSnake {
  name: string;
  duration_ms: number;
  album: AlbumInfoSnake;
  artists: ArtistSnake[];
}

export interface ListeningHistoryItemSnake {
  track: TrackInfoSnake;
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