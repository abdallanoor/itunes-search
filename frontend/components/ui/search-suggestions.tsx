import React from "react";
import { Card } from "./card";

export default function SearchSuggestions({
  onSearch,
}: {
  onSearch: (term: string) => void;
}) {
  const searchSuggestions = [
    { text: "فنجان" },
    { text: "بودكاست دروس" },
    { text: "هدوء" },
    { text: "بدون ورق" },
    { text: "دوباميكافين" },
  ];
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-foreground/80 text-center">
        جرب البحث عن:
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {searchSuggestions.map((suggestion, index) => (
          <Card
            key={index}
            className="px-3 py-2 cursor-pointer shadow-none"
            onClick={() => onSearch(suggestion.text)}
          >
            <span className="font-medium">{suggestion.text}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
