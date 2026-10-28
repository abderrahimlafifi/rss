export type SocialPlatform = 
  | 'facebook' 
  | 'twitter' 
  | 'instagram' 
  | 'youtube' 
  | 'tiktok' 
  | 'reddit' 
  | 'linkedin' 
  | 'telegram' 
  | 'pinterest' 
  | 'threads' 
  | 'mastodon' 
  | 'googlenews'
  | 'medium';

export interface FeedItem {
  id: string;
  title: string;
  content: string;
  author: string;
  authorHandle: string;
  authorAvatar?: string;
  mediaUrl?: string;
  mediaType: 'image' | 'video' | 'article' | 'audio' | 'none';
  pubDate: string; // ISO date string
  url: string;
  likes?: number;
  comments?: number;
  shares?: number;
  tags?: string[];
  platform: SocialPlatform;
}

export interface FeedFilters {
  mustContain?: string;
  exclude?: string;
  mediaOnly?: boolean;
}

export interface SocialFeed {
  id: string;
  title: string;
  description: string;
  platform: SocialPlatform;
  sourceUrl: string;
  icon?: string;
  avatar?: string;
  followersCount?: string;
  itemsCount: number;
  lastBuildDate: string;
  items: FeedItem[];
  autoRefreshMinutes: number;
  filters: FeedFilters;
  createdAt: string;
}

export interface PlatformMetadata {
  id: SocialPlatform;
  name: string;
  nameAr: string;
  domain: string;
  placeholder: string;
  placeholderAr: string;
  brandColor: string;
  badgeBg: string;
  badgeText: string;
  iconName: string;
  description: string;
  descriptionAr: string;
  sampleUrls: { label: string; url: string; handle: string }[];
}

export type WidgetType = 'wall' | 'carousel' | 'list' | 'ticker';

export interface WidgetSettings {
  type: WidgetType;
  theme: 'light' | 'dark' | 'glass';
  columns: number;
  showMedia: boolean;
  showDate: boolean;
  showAuthor: boolean;
  maxItems: number;
  accentColor: string;
  borderRadius: number; // in px
}
