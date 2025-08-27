import { Card, CardContent } from "@/components/ui/card";

export function PodcastLoading() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 bg-muted rounded-md w-40" />
        <div className="h-6 bg-muted rounded-md w-36" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse bg-card/50 shadow-none">
            <CardContent>
              <div className="flex max-sm:flex-col-reverse gap-4">
                <div className="flex-1 space-y-5">
                  <div className="space-y-2">
                    <div className="h-5 bg-muted rounded-md w-3/5" />
                  </div>

                  <div className="space-y-2">
                    <div className="h-4 bg-muted/70 rounded w-2/5" />
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-muted rounded-full" />
                    <div className="h-3 bg-muted rounded w-20" />
                    <div className="w-1 h-1 bg-muted rounded-full" />
                    <div className="h-3 bg-muted rounded w-16" />
                    <div className="w-1 h-1 bg-muted rounded-full" />
                    <div className="h-3 bg-muted rounded w-12" />
                  </div>
                </div>

                <div className="w-full h-80 sm:w-28 sm:h-28 bg-muted rounded-xl flex-shrink-0" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
