import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
