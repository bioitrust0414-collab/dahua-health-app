export interface EpisodeMeta {
  id: string;
  episode_number: number;
  title: string;
  category: string;
  type: '科普' | '深度';
  slug: string;
  cover_image: string;
}

export interface EpisodeIndex {
  total_episodes: number;
  episodes: EpisodeMeta[];
}

export interface Article {
  fb_long: string;
  ig_short: string;
  hashtags: string[];
  images: {
    cover: string;
    cards: string[];
  };
}
