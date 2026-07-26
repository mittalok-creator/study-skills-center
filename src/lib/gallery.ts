import manifest from "@/content/media-manifest.json";

export type GalleryItem = {
  src: string;
  category: string;
  w: number;
  h: number;
  sheetRef: number;
};

export const galleryItems = manifest.gallery as GalleryItem[];

export const categoryLabels: Record<string, string> = {
  academics: "Academics",
  art: "Art & Craft",
  dance: "Dance",
  music: "Music",
  taekwondo: "Taekwon-Do",
  chess: "Chess",
  events: "Events",
};

export function heroImage(name: string): string {
  const heroes = manifest.hero as Record<string, { src: string }>;
  return heroes[name]?.src ?? "";
}

export function posterImage(name: string): string {
  const posters = manifest.poster as Record<string, { src: string }>;
  return posters[name]?.src ?? "";
}

export function byCategory(cat: string): GalleryItem[] {
  return galleryItems.filter((g) => g.category === cat);
}
