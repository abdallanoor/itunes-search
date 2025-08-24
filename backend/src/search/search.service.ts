import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { DynamodbService } from './dynamodb.service';
import { Podcast } from './podcast.entity';

export interface SearchResponse {
  results: Podcast[];
  cached: boolean;
}

@Injectable()
export class SearchService {
  constructor(private readonly dynamodbService: DynamodbService) { }

  async searchPodcasts(searchTerm: string): Promise<SearchResponse> {
    const cachedResults = await this.dynamodbService.getCachedSearch(searchTerm);
    if (cachedResults) {
      console.log(`Cache hit for: ${searchTerm}`);
      return {
        results: cachedResults,
        cached: true,
      };
    }

    console.log(`Cache miss, searching iTunes for: ${searchTerm}`);

    try {
      const encodedTerm = encodeURIComponent(searchTerm);
      const itunesUrl = `https://itunes.apple.com/search?media=podcast&term=${encodedTerm}&limit=50&lang=ar`;

      const response = await axios.get(itunesUrl, {
        timeout: 10000,
        headers: {
          'User-Agent': 'PodcastSearchApp/1.0',
        },
      });

      const results: Podcast[] = response.data.results.map((item: any) => ({
        id: item.trackId,
        name: item.trackName || item.collectionName,
        artistName: item.artistName || null,
        artworkUrl: item.artworkUrl600 || item.artworkUrl100 || null,
        feedUrl: item.feedUrl || null,
        genre: Array.isArray(item.genres) ? item.genres[0] : item.primaryGenreName || null,
        country: item.country || null,
        releaseDate: item.releaseDate || null,
        trackCount: item.trackCount || null,
        description: item.description || null,
      }));

      await this.dynamodbService.cacheSearch(searchTerm, results);

      return {
        results,
        cached: false,
      };
    } catch (error) {
      console.error('iTunes API error:', error);
      throw new Error('Failed to search iTunes API');
    }
  }
}
