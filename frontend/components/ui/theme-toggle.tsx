"use client";

import { Moon, MoonIcon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          {resolvedTheme === "dark" ? <Moon /> : <Sun />}
          <span>الثيم</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun size={16} className="text-primary" />
          فاتح
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <MoonIcon size={16} className="text-primary" />
          داكن
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Settings size={16} className="text-primary" />
          الجهاز
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
