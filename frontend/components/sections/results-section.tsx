import { PodcastLoading } from "../podcast/podcast-loading";
import { ErrorState } from "../ui/error-state";
import { EmptyState } from "../ui/empty-state";
import { PodcastCard } from "../podcast/podcast-card";
import { Podcast } from "@/types/podcast";
import { useEffect, useState } from "react";
import { EpisodeList } from "../episodes/episode-list";
import { Episode } from "@/types/episode";
import { formatNumber } from "@/lib/utils";
import { Search } from "lucide-react";

interface ResultsSectionProps {
  results: Podcast[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
  currentSearchTerm: string;
  onRetry: () => void;
  currentEpisode: Episode | null;
  setCurrentEpisode: (episode: Episode | null) => void;
}
export default function ResultsSection({
  results,
  isLoading,
  error,
  hasSearched,
  currentSearchTerm,
  onRetry,
  setCurrentEpisode,
}: ResultsSectionProps) {
  const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);

  useEffect(() => {
    if (isLoading) {
      setSelectedPodcast(null);
    }
  }, [isLoading]);

  const handleBackToResults = () => {
    setSelectedPodcast(null);
  };

  if (selectedPodcast) {
    return (
      <section className="mt-12 mb-48">
        <EpisodeList
          podcastId={selectedPodcast.id}
          podcastName={selectedPodcast.name}
          podcastArtwork={selectedPodcast.artworkUrl}
          onBack={handleBackToResults}
          setCurrentEpisode={setCurrentEpisode}
        />
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="mt-12">
        <PodcastLoading />
      </section>
    );
  }
  if (error) {
    return (
      <section className="mt-12">
        <ErrorState message={error} onRetry={onRetry} />
      </section>
    );
  }
  if (hasSearched && results.length === 0) {
    return (
      <section className="mt-12">
        <EmptyState searchTerm={currentSearchTerm} />
      </section>
    );
  }
  if (hasSearched && results.length > 0) {
    return (
      <section className="mt-12 mb-48 space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold">
              نتائج البحث ({formatNumber(results.length)})
            </h3>
            <p className="text-muted-foreground">
              البحث عن: &rdquo;{currentSearchTerm}&rdquo;
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {results.map((podcast) => (
              <PodcastCard
                key={podcast.id}
                podcast={podcast}
                onPodcastClick={setSelectedPodcast}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
  // if (!hasSearched && results.length === 0) {
  //   return (
  //     <section className="mt-12 flex flex-col items-center justify-center gap-3 text-muted-foreground">
  //       <Search className="" size={48} />
  //       <p className="font-medium">ابدأ بالبحث عن البودكاست المفضل لديك.</p>
  //     </section>
  //   );
  // }
  return null;
}
