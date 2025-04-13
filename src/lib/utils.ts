import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUniqueId() {
  return "xxxxxxxxxx".replace(/[x]/g, () =>
    ((Math.random() * 16) | 0).toString(16)
  );
}
