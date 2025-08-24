export interface Podcast {
  id: number;
  name: string;
  artistName?: string | null;
  artworkUrl?: string | null;
  feedUrl?: string | null;
  genre?: string | null;
  country?: string | null;
  releaseDate?: Date | null;
  trackCount?: number | null;
}
