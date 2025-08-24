import { Injectable, Logger, BadRequestException } from "@nestjs/common";
import axios from "axios";
import { Episode } from "./episode.entity";

@Injectable()
export class EpisodesService {
  private readonly logger = new Logger(EpisodesService.name);

  async getEpisodes(podcastId: string): Promise<Episode[]> {
    if (!podcastId) throw new BadRequestException("podcastId is required");

    const url = "https://itunes.apple.com/lookup";
    const { data } = await axios.get(url, {
      params: {
        id: podcastId,
        entity: "podcastEpisode",
        limit: 50,
      },
    });

    const podcastInfo = data.results?.find((item: any) => item.wrapperType === "collection" || item.wrapperType === "track");
    const artistName = podcastInfo?.artistName || null;


    const items: Episode[] = (data.results || [])
      .filter((ep: any) => ep.wrapperType === "podcastEpisode")
      .map((ep: any) => ({
        id: ep.trackId,
        title: ep.trackName,
        description: ep.description || ep.shortDescription || null,
        duration: ep.trackTimeMillis || null,
        releaseDate: ep.releaseDate,
        previewUrl: ep.previewUrl || ep.episodeUrl || null,
        artworkUrl: ep.artworkUrl600 || ep.artworkUrl160 || null,
        episodeNumber: ep.episodeNumber || null,
        seasonNumber: ep.seasonNumber || null,
        artistName: artistName,
      }));

    return items;
  }
}
