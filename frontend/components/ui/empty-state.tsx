import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function EmptyState({ searchTerm }: { searchTerm?: string }) {
  return (
    <Card>
      <CardContent className="p-12 text-center">
        <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-xl font-semibold mb-2">لا توجد نتائج</h3>
        <p className="text-muted-foreground">
          لم نتمكن من العثور على أي نتائج لبحثك عن &ldquo;{searchTerm}&ldquo;.
          جرب كلمات مختلفة أو تأكد من الإملاء.
        </p>
      </CardContent>
    </Card>
  );
}
