import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString?: string) {
  if (!dateString) return "تاريخ غير محدد";
  const date = new Date(dateString);
  return date.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};


export function formatNumber(num: number | string) {
  return new Intl.NumberFormat("ar-EG").format(Number(num));
}