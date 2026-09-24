import type { Video } from "@/lib/types";
import { unsplash } from "@/lib/utils";

/**
 * YouTube videos. Paste any YouTube URL (watch, youtu.be, shorts or embed) or a
 * bare video id. `thumbnail` is optional — without it the YouTube HD thumbnail
 * is used. The current entries are PLACEHOLDER public videos; replace them with
 * Ticmark Properties' own videos before launch.
 */
export const featuredVideo: Video = {
  id: "featured",
  youtube: "https://www.youtube.com/watch?v=mY4FweMK6PU",
  title: "Karachi from above",
  description: "Placeholder aerial film of the Karachi skyline.",
  thumbnail: unsplash("1744182896518-fd1233b5c568"),
};

export const latestVideos: Video[] = [
  {
    id: "latest-1",
    youtube: "https://www.youtube.com/watch?v=4jnzf1yj48M",
    title: "Designer residence: a cinematic walkthrough",
  },
  {
    id: "latest-2",
    youtube: "https://www.youtube.com/watch?v=y9j-BL5ocW8",
    title: "Contemporary family home: video tour",
  },
  {
    id: "latest-3",
    youtube: "https://www.youtube.com/watch?v=BYgHyYnc6W4",
    title: "Karachi skyline: aerial montage",
    thumbnail: unsplash("1676651916407-120873ef8f2b"),
  },
];
