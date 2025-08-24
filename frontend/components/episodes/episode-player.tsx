"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, X, Volume2, VolumeX, AlertCircle } from "lucide-react";
import Image from "next/image";
import { Episode } from "@/types/episode";
import { formatNumber } from "@/lib/utils";

interface EpisodePlayerProps {
  episode: Episode;
  onClose: () => void;
}

export function EpisodePlayer({ episode, onClose }: EpisodePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (episode.previewUrl && audioRef.current) {
      audioRef.current.src = episode.previewUrl;
      audioRef.current.load();
      setHasError(false);
    } else {
      setHasError(true);
    }
  }, [episode]);

  const togglePlay = async () => {
    if (!audioRef.current || !episode.previewUrl) {
      console.log("No audio source available for episode:", episode.title);
      setHasError(true);
      return;
    }

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
        setHasError(false);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      setHasError(true);
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) => {
    const minutes = formatNumber(Math.floor(time / 60));
    const seconds = formatNumber(Math.floor(time % 60));
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="container fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-t border-primary/20 shadow-none rounded-t-xl md:bottom-4 md:left-4 md:right-4 md:rounded-xl">
      <CardContent className="p-0">
        {episode.previewUrl && (
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            onError={() => setHasError(true)}
          />
        )}

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            {episode.artworkUrl && (
              <Image
                width={56}
                height={56}
                src={episode.artworkUrl}
                alt={episode.title}
                className="w-14 h-14 md:w-12 md:h-12 rounded-lg object-cover flex-shrink-0"
              />
            )}
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-sm md:text-base leading-tight mb-1 line-clamp-2">
                {episode.title}
              </h4>
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {episode.artistName}
              </p>
              {hasError && (
                <div className="flex items-center gap-1 mt-1 text-xs text-destructive">
                  <AlertCircle className="w-3 h-3" />
                  <span>معاينة صوتية غير متاحة</span>
                </div>
              )}
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="md:flex md:items-center md:gap-4">
            <div className="flex items-center gap-2 order-1 md:order-2 flex-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={togglePlay}
                className="flex-shrink-0"
                disabled={!episode.previewUrl || hasError}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
              </Button>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                onValueChange={handleSeek}
                className="flex-1"
                disabled={!episode.previewUrl || hasError}
              />
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2 order-3 justify-center md:justify-start max-md:hidden">
              {volume === 0 ? (
                <VolumeX className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Volume2 className="w-4 h-4 text-muted-foreground" />
              )}
              <Slider
                value={[volume]}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
                className="w-16 md:w-20"
                disabled={!episode.previewUrl || hasError}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
