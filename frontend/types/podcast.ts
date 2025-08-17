export interface Podcast {
  id: number;
  name: string;
  artistName: string;
  artworkUrl?: string;
  genre?: string;
  releaseDate?: string;
  trackCount?: number;
  previewUrl?: string;
  feedUrl?: string;
}