import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function EpisodeLoading() {
  return (
    <div className="space-y-4">
      <Card className="animate-pulse shadow-none">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-muted rounded-xl" />
            <div className="space-y-2">
              <div className="h-6 bg-muted rounded w-48" />
              <div className="h-4 bg-muted rounded w-32" />
            </div>
          </div>
        </CardHeader>
      </Card>

      {[...Array(5)].map((_, i) => (
        <Card key={i} className="animate-pulse shadow-none">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-muted rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="h-5 bg-muted rounded w-3/4" />
                  <div className="h-8 bg-muted rounded w-16 flex-shrink-0" />
                </div>
                <div className="space-y-1">
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-3 bg-muted rounded w-24" />
                  <div className="h-3 bg-muted rounded w-16" />
                  <div className="h-5 bg-muted rounded w-12" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
