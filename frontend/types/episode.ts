export interface Episode {
  id: number
  title: string
  description: string
  duration?: number
  releaseDate: string
  previewUrl?: string
  artworkUrl?: string
  episodeNumber?: number
  seasonNumber?: number
  artistName?: string;
}