"use client";

import type React from "react";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  onSearch: (term: string) => void;
  isLoading: boolean;
}

export function SearchInput({ onSearch, isLoading }: SearchInputProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="ابحث عن البودكاست..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 h-12 text-lg border-2 shadow-none"
            disabled={isLoading}
          />
          <Search className="absolute end-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !searchTerm.trim()}
          className="h-12 px-6 text-lg font-medium"
        >
          {isLoading && <Loader2 size={18} className="animate-spin" />}
          بحث
        </Button>
      </div>
    </form>
  );
}
