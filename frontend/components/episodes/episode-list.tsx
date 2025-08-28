"use client";

import { useState, useEffect, useCallback, useMemo, memo, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Clock, Calendar } from "lucide-react";
import Image from "next/image";
import { EpisodeLoading } from "./episode-loading";
import { Episode } from "@/types/episode";
import { formatDate, formatNumber } from "@/lib/utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface EpisodeListProps {
  podcastId: number;
  podcastName: string;
  podcastArtwork?: string;
  onBack: () => void;
  setCurrentEpisode: (episode: Episode | null) => void;
}

const BackButton = ({ onBack }: { onBack: () => void }) => (
  <Button variant="ghost" onClick={onBack}>
    <ArrowRight className="w-4 h-4 ml-2" />
    العودة للنتائج
  </Button>
);

const useTextOverflow = (text: string, isExpanded: boolean) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (!textRef.current || isExpanded) return;

    const element = textRef.current;
    const isTextOverflowing = element.scrollHeight > element.clientHeight;
    setIsOverflowing(isTextOverflowing);
  }, [text, isExpanded]);

  return { textRef, isOverflowing };
};

// Memoized episode item component to prevent unnecessary re-renders
const EpisodeItem = memo(
  ({
    episode,
    podcastArtwork,
    isExpanded,
    onToggleExpanded,
    onPlayEpisode,
  }: {
    episode: Episode;
    podcastArtwork?: string;
    isExpanded: boolean;
    onToggleExpanded: (episodeId: number) => void;
    onPlayEpisode: (episode: Episode) => void;
  }) => {
    // Memoize expensive computations
    const { visibleLines, hasMoreLines } = useMemo(() => {
      const lines =
        episode.description
          ?.split(/\n/)
          .map((line) => line.trim())
          .filter((line) => line.length > 0) || [];

      const maxLines = 1;
      const visibleLines = isExpanded ? lines : lines.slice(0, maxLines);
      const hasMoreLines = lines.length > maxLines;

      return { visibleLines, hasMoreLines };
    }, [episode.description, isExpanded]);

    const { textRef, isOverflowing } = useTextOverflow(
      episode.description || "",
      isExpanded
    );

    const formattedDuration = useMemo(() => {
      if (!episode.duration) return "غير محدد";
      const totalMinutes = Math.floor(episode.duration / 60000);
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;
      return hours > 0
        ? `${formatNumber(hours)}س ${formatNumber(mins)}د`
        : `${formatNumber(mins)}د`;
    }, [episode.duration]);

    // Use useCallback for event handlers to prevent re-renders
    const handleToggleExpanded = useCallback(() => {
      onToggleExpanded(episode.id);
    }, [episode.id, onToggleExpanded]);

    const handlePlayEpisode = useCallback(() => {
      onPlayEpisode(episode);
    }, [episode, onPlayEpisode]);

    const shouldShowToggleButton = hasMoreLines || isOverflowing;

    return (
      <Card className="shadow-none">
        <CardContent>
          <div className="flex gap-4">
            <div className="w-16 h-16 flex-shrink-0">
              <Image
                src={episode.artworkUrl || podcastArtwork || "/placeholder.svg"}
                alt={episode.title}
                className="w-full h-full object-cover rounded-lg"
                width={64}
                height={64}
                loading="lazy"
              />
            </div>

            {/* Episode Info */}
            <div className="flex-1 space-y-2 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold line-clamp-2 leading-tight break-words">
                  {episode.title}
                </h3>
                {episode.previewUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handlePlayEpisode}
                    className="flex-shrink-0"
                  >
                    <Play className="w-3 h-3" />
                    تشغيل
                  </Button>
                )}
              </div>

              {/* Description */}
              <div className="text-sm text-muted-foreground break-words overflow-hidden">
                <div
                  ref={textRef}
                  className={`space-y-1 ${isExpanded ? "" : "line-clamp-2"}`}
                >
                  {visibleLines.map((line, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
                {shouldShowToggleButton && (
                  <button
                    onClick={handleToggleExpanded}
                    className="text-primary hover:text-primary/80 text-xs font-medium mt-1 transition-colors cursor-pointer"
                  >
                    {isExpanded ? "عرض أقل" : "عرض المزيد"}
                  </button>
                )}
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(episode.releaseDate)}
                </div>
                {episode.duration && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formattedDuration}
                  </div>
                )}
                {episode.episodeNumber && (
                  <Badge variant="secondary" className="text-xs">
                    الحلقة {episode.episodeNumber}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

EpisodeItem.displayName = "EpisodeItem";

export function EpisodeList({
  podcastId,
  podcastName,
  podcastArtwork,
  onBack,
  setCurrentEpisode,
}: EpisodeListProps) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedEpisodeId, setExpandedEpisodeId] = useState<number | null>(
    null
  );

  const fetchEpisodes = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${API_URL}/api/episodes?podcastId=${podcastId}`
      );
      if (!response.ok) throw new Error("فشل في جلب الحلقات");

      const data = await response.json();
      setEpisodes(data.episodes || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setIsLoading(false);
    }
  }, [podcastId]);

  useEffect(() => {
    if (!podcastId) return;
    fetchEpisodes();
  }, [podcastId, fetchEpisodes]);

  // Optimized toggle function - only one episode can be expanded at a time
  const toggleExpanded = useCallback((episodeId: number) => {
    setExpandedEpisodeId((prev) => (prev === episodeId ? null : episodeId));
  }, []);

  // Memoized play episode handler
  const handlePlayEpisode = useCallback(
    (episode: Episode) => {
      setCurrentEpisode(null);
      Promise.resolve().then(() => {
        setCurrentEpisode(episode);
      });
    },
    [setCurrentEpisode]
  );

  // Memoize the episode count to prevent unnecessary recalculations
  const episodeCount = useMemo(() => episodes.length, [episodes.length]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <BackButton onBack={onBack} />
        <EpisodeLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <BackButton onBack={onBack} />
        <div className="text-center">
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={fetchEpisodes}>إعادة المحاولة</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BackButton onBack={onBack} />
      {/* Podcast Info */}
      <Card className="bg-secondary shadow-none">
        <CardHeader>
          <div className="flex items-center gap-4">
            {podcastArtwork && (
              <Image
                src={podcastArtwork}
                alt={podcastName}
                className="w-16 h-16 rounded-xl object-cover"
                width={64}
                height={64}
                priority
              />
            )}
            <div>
              <CardTitle className="text-xl">{podcastName}</CardTitle>
              <p className="text-muted-foreground">
                {formatNumber(episodeCount)} حلقة متاحة
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Episodes List */}
      <div className="space-y-4">
        {episodes.map((episode) => (
          <EpisodeItem
            key={episode.id}
            episode={episode}
            podcastArtwork={podcastArtwork}
            isExpanded={expandedEpisodeId === episode.id}
            onToggleExpanded={toggleExpanded}
            onPlayEpisode={handlePlayEpisode}
          />
        ))}
      </div>
    </div>
  );
}
