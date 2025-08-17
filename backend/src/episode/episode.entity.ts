export interface Episode {
  id: number;
  title: string;
  description?: string | null;
  duration?: number | null;
  releaseDate?: Date | null;
  previewUrl?: string | null;
  artworkUrl?: string | null;
  episodeNumber?: number | null;
  seasonNumber?: number | null;
}
