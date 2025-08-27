"use client";

import LandingSection from "@/components/sections/landing-section";
import { SearchInput } from "@/components/ui/search-input";
import SearchSuggestions from "@/components/ui/search-suggestions";
import { useState } from "react";
import ResultsSection from "@/components/sections/results-section";
import { Podcast } from "@/types/podcast";
import { Episode } from "@/types/episode";
import { EpisodePlayer } from "@/components/episodes/episode-player";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export default function Home() {
  const [results, setResults] = useState<Podcast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);

  const handleSearch = async (term: string) => {
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setCurrentSearchTerm(term);
    setResults([]);

    try {
      const response = await fetch(
        `${API_URL}/api/podcasts?term=${encodeURIComponent(term)}`
      );

      if (!response.ok) {
        throw new Error(`خطأ في الخادم: ${response.status}`);
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          `خطأ في الخادم: ${data?.message || "حدث خطأ غير متوقع"}`
        );
      }
      setResults(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (currentSearchTerm) {
      handleSearch(currentSearchTerm);
    }
  };

  return (
    <main className="container">
      <div className="my-16">
        <LandingSection />
        <SearchSuggestions onSearch={handleSearch} />
        <SearchInput onSearch={handleSearch} isLoading={isLoading} />
        <ResultsSection
          results={results}
          isLoading={isLoading}
          error={error}
          hasSearched={hasSearched}
          currentSearchTerm={currentSearchTerm}
          onRetry={handleRetry}
          currentEpisode={currentEpisode}
          setCurrentEpisode={setCurrentEpisode}
        />

        {currentEpisode && (
          <EpisodePlayer
            episode={currentEpisode}
            onClose={() => setCurrentEpisode(null)}
          />
        )}
      </div>
    </main>
  );
}
