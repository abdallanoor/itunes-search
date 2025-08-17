import { Card, CardContent } from "@/components/ui/card";
import { formatDate, formatNumber } from "@/lib/utils";
import { Podcast } from "@/types/podcast";
import { Info } from "lucide-react";
import Image from "next/image";

interface PodcastCardProps {
  podcast: Podcast;
  onPodcastClick: (podcast: Podcast) => void;
}

export function PodcastCard({ podcast, onPodcastClick }: PodcastCardProps) {
  return (
    <Card
      className="group shadow-none transition-all duration-500 overflow-hidden hover:-translate-y-1 bg-card/80 backdrop-blur-sm cursor-pointer"
      onClick={() => onPodcastClick(podcast)}
    >
      <CardContent>
        <div className="flex max-sm:flex-col-reverse gap-4">
          <div className="flex-1 space-y-3">
            <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {podcast.name}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {podcast.artistName}{" "}
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Info className="w-3 h-3 text-primary" />
              <span>آخر تحديث: {formatDate(podcast.releaseDate)}</span>
              {podcast.genre && (
                <>
                  <span>•</span>
                  <span className="text-primary font-medium">
                    {podcast.genre}
                  </span>
                </>
              )}
              {podcast.trackCount && (
                <>
                  <span>•</span>
                  <span>{formatNumber(podcast.trackCount)} حلقة</span>
                </>
              )}
            </div>
          </div>

          {podcast.artworkUrl && (
            <div className="relative w-full h-full sm:w-28 sm:h-28 flex-shrink-0 overflow-hidden rounded-xl group-hover:rounded-2xl transition-all duration-300">
              <Image
                width={112}
                height={112}
                src={podcast.artworkUrl}
                alt={podcast.name}
                className="w-full h-full sm:h-28 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
