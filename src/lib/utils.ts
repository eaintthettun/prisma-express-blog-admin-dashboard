import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const badgeColors = [
  'bg-red-400',
  'bg-yellow-400',
  'bg-green-400',
  'bg-blue-400',
  'bg-indigo-400',
  'bg-purple-400',
  'bg-pink-400',
];

export const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * badgeColors.length);
  return badgeColors[randomIndex];
};