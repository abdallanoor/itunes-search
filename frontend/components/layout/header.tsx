import { Podcast } from "lucide-react";
import { ThemeToggle } from "../ui/theme-toggle";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-background/60 backdrop-blur-sm border-b z-50">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-1 select-none">
            <Podcast size={23} />
            <h1 className="text-2xl font-bold">ابحث عن بودكاست</h1>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
