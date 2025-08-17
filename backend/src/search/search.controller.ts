import { Controller, Get, Query } from "@nestjs/common";
import { SearchService } from "./search.service";

@Controller("podcasts")
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async searchPodcasts(@Query("term") searchTerm: string) {
    if (!searchTerm || searchTerm.trim().length === 0) {
      return {
        success: false,
        message: "Search term is required",
        results: [],
        cached: false,
      };
    }

    try {
      const result = await this.searchService.searchPodcasts(searchTerm.trim());
      return {
        success: true,
        results: result.results,
        cached: result.cached,
        searchTerm: searchTerm.trim(),
      };
    } catch (error) {
      console.error("Search error:", error);
      return {
        success: false,
        message: "An error occurred while searching",
        results: [],
        cached: false,
      };
    }
  }
}
