import { Heart } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container h-16 flex items-center justify-center">
        <div className="text-center text-muted-foreground text-sm">
          <p className="mb-1">
            مدعوم بواسطة{" "}
            <a
              href="https://performance-partners.apple.com/search-api"
              target="_blank"
              className="hover:text-primary"
            >
              iTunes Search API
            </a>
          </p>
          <p className="text-xs">
            تم تطويره بـ <Heart className="inline-block mx-0.5" size={18} />
          </p>
        </div>
      </div>
    </footer>
  );
}
