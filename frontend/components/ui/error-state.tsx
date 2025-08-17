"use client";

import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Card className="border-destructive/20">
      <CardContent className="p-8 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">حدث خطأ</h3>
        <p className="text-muted-foreground mb-4">{message}</p>
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="gap-2 bg-transparent"
          >
            <RefreshCw className="h-4 w-4" />
            إعادة المحاولة
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
