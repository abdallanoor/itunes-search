"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Clock, Calendar } from "lucide-react";
import Image from "next/image";
import { EpisodeLoading } from "./episode-loading";
import { EpisodePlayer } from "./episode-player";
import { Episode } from "@/types/episode";
import { formatNumber } from "@/lib/utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface EpisodeListProps {
  podcastId: number;
  podcastName: string;
  podcastArtwork?: string;
  onBack: () => void;
  currentEpisode: Episode | null;
  setCurrentEpisode: (episode: Episode | null) => void;
}

export function EpisodeList({
  podcastId,
  podcastName,
  podcastArtwork,
  onBack,
  currentEpisode,
  setCurrentEpisode,
}: EpisodeListProps) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDuration = (millis?: number) => {
    if (!millis) return "غير محدد";
    const totalMinutes = Math.floor(millis / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    return hours > 0
      ? `${formatNumber(hours)}س ${formatNumber(mins)}د`
      : `${formatNumber(mins)}د`;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowRight className="w-4 h-4 ml-2" />
            العودة للنتائج
          </Button>
        </div>

        <EpisodeLoading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowRight className="w-4 h-4 ml-2" />
            العودة للنتائج
          </Button>
        </div>
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={fetchEpisodes}>إعادة المحاولة</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowRight className="w-4 h-4 ml-2" />
          العودة للنتائج
        </Button>
      </div>

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
              />
            )}
            <div>
              <CardTitle className="text-xl">{podcastName}</CardTitle>
              <p className="text-muted-foreground">
                {formatNumber(episodes.length)} حلقة متاحة
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Episodes List */}
      <div className="space-y-4">
        {episodes.map((episode) => (
          <Card key={episode.id} className="shadow-none">
            <CardContent>
              <div className="flex gap-4">
                <div className="w-16 h-16 flex-shrink-0">
                  <Image
                    src={
                      episode.artworkUrl || podcastArtwork || "/placeholder.svg"
                    }
                    alt={episode.title}
                    className="w-full h-full object-cover rounded-lg"
                    width={64}
                    height={64}
                  />
                </div>

                {/* Episode Info */}
                <div className="flex-1 space-y-2 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold line-clamp-2 leading-tight break-words">
                      {episode.title}
                    </h3>
                    {episode.previewUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setCurrentEpisode(episode)}
                        className="flex-shrink-0"
                      >
                        <Play className="w-3 h-3 ml-1" />
                        تشغيل
                      </Button>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 break-words">
                    {episode.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      آخر تحديث: {formatDate(episode.releaseDate)}
                    </div>
                    {episode.duration && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDuration(episode.duration)}
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
        ))}
      </div>

      {/* Episode Player */}
      {currentEpisode && (
        <EpisodePlayer
          episode={currentEpisode}
          onClose={() => setCurrentEpisode(null)}
        />
      )}
    </div>
  );
}
