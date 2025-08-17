import { Controller, Get, Query, BadRequestException } from "@nestjs/common";
import { EpisodesService } from "./episodes.service";

@Controller("episodes")
export class EpisodesController {
  constructor(private readonly episodesService: EpisodesService) {}

  @Get()
  async getEpisodes(@Query("podcastId") podcastId?: string) {
    if (!podcastId) {
      throw new BadRequestException("podcastId is required");
    }
    const episodes = await this.episodesService.getEpisodes(podcastId);
    return { podcastId, count: episodes.length, episodes };
  }
}
