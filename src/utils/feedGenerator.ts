import { FeedItem, SocialFeed, SocialPlatform, WidgetSettings } from '../types/feed';
import { PLATFORMS_DATA } from '../data/platforms';

/**
 * Detect social platform from a raw URL or string
 */
export function detectPlatformFromUrl(rawUrl: string): SocialPlatform {
  const url = rawUrl.toLowerCase().trim();
  if (url.includes('facebook.com') || url.includes('fb.com') || url.includes('fb.watch')) return 'facebook';
  if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
  if (url.includes('instagram.com') || url.includes('instagr.am')) return 'instagram';
  if (url.includes('tiktok.com')) return 'tiktok';
  if (url.includes('reddit.com') || url.startsWith('r/')) return 'reddit';
  if (url.includes('linkedin.com')) return 'linkedin';
  if (url.includes('t.me') || url.includes('telegram.me')) return 'telegram';
  if (url.includes('pinterest.com') || url.includes('pin.it')) return 'pinterest';
  if (url.includes('threads.net')) return 'threads';
  if (url.includes('mastodon') || url.includes('mstdn')) return 'mastodon';
  if (url.includes('news.google.com') || url.includes('googlenews')) return 'googlenews';
  if (url.includes('medium.com')) return 'medium';

  return 'facebook'; // fallback
}

/**
 * Extract clean handle or title from URL
 */
export function extractHandle(url: string, platform: SocialPlatform): string {
  try {
    const cleaned = url.trim().replace(/\/+$/, '');
    const segments = cleaned.split('/');
    const lastSegment = segments[segments.length - 1];

    if (platform === 'reddit') {
      const match = cleaned.match(/r\/([a-zA-Z0-9_]+)/i);
      if (match) return `r/${match[1]}`;
    }

    if (lastSegment && !lastSegment.includes('?')) {
      return lastSegment.replace(/^@/, '');
    }
    
    // Fallback based on platform name
    return PLATFORMS_DATA[platform]?.name || 'SocialFeed';
  } catch {
    return 'Channel';
  }
}

/**
 * Filter feed items by keywords and media flag
 */
export function filterFeedItems(
  items: FeedItem[],
  mustContain?: string,
  exclude?: string,
  mediaOnly?: boolean
): FeedItem[] {
  return items.filter((item) => {
    const textToSearch = `${item.title} ${item.content} ${item.author}`.toLowerCase();

    if (mustContain && mustContain.trim()) {
      const keyword = mustContain.toLowerCase().trim();
      if (!textToSearch.includes(keyword)) return false;
    }

    if (exclude && exclude.trim()) {
      const keyword = exclude.toLowerCase().trim();
      if (textToSearch.includes(keyword)) return false;
    }

    if (mediaOnly && item.mediaType === 'none') {
      return false;
    }

    return true;
  });
}

/**
 * Deterministic feed items generator for any profile or channel
 */
export function generateFeedData(url: string, explicitPlatform?: SocialPlatform): SocialFeed {
  const platform = explicitPlatform || detectPlatformFromUrl(url);
  const handle = extractHandle(url, platform);
  const platformMeta = PLATFORMS_DATA[platform];
  const feedId = `feed_${platform}_${handle.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

  const now = new Date();
  const avatar = `https://api.dicebear.com/7.x/identicon/svg?seed=${handle}`;

  // Pre-crafted domain posts for realistic feed experience
  const items: FeedItem[] = [
    {
      id: `${feedId}_1`,
      title: `${handle} Announcement: Latest insights & breakthrough updates`,
      content: `We're thrilled to unveil our latest milestone! Our team has been working around the clock to bring this new capability to everyone following us on ${platformMeta.name}. Check out the full breakdown and join the discussion in the comments below.`,
      author: handle,
      authorHandle: `@${handle}`,
      authorAvatar: avatar,
      mediaUrl: `https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80`,
      mediaType: 'image',
      pubDate: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      url: url,
      likes: 1420,
      comments: 248,
      shares: 95,
      tags: ['update', 'announcement', 'trending'],
      platform
    },
    {
      id: `${feedId}_2`,
      title: `Deep Dive: 5 fundamental shifts happening right now in the industry`,
      content: `A closer look at how modern tools and decentralized formats like RSS are reshaping how we interact with digital media. Freedom of information means taking ownership of your feed without algorithmic lock-in.`,
      author: handle,
      authorHandle: `@${handle}`,
      authorAvatar: avatar,
      mediaUrl: platform === 'youtube' || platform === 'tiktok' 
        ? `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80`
        : `https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80`,
      mediaType: platform === 'youtube' || platform === 'tiktok' ? 'video' : 'image',
      pubDate: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
      url: url,
      likes: 3890,
      comments: 512,
      shares: 410,
      tags: ['insights', 'deepdive', 'future'],
      platform
    },
    {
      id: `${feedId}_3`,
      title: `Community spotlight and Q&A session highlights`,
      content: `Here are the top answers from yesterday's live session with our community. Thank you to everyone who submitted questions about our upcoming roadmap and integrations!`,
      author: handle,
      authorHandle: `@${handle}`,
      authorAvatar: avatar,
      mediaUrl: `https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80`,
      mediaType: 'image',
      pubDate: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
      url: url,
      likes: 890,
      comments: 134,
      shares: 42,
      tags: ['community', 'qa'],
      platform
    },
    {
      id: `${feedId}_4`,
      title: `Behind the scenes: How we produce our best content`,
      content: `Ever wondered what goes into producing each post? From research to high-fidelity production, here is a quick look behind the curtain.`,
      author: handle,
      authorHandle: `@${handle}`,
      authorAvatar: avatar,
      mediaType: 'none',
      pubDate: new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString(),
      url: url,
      likes: 640,
      comments: 78,
      shares: 19,
      tags: ['behindthescenes', 'production'],
      platform
    },
    {
      id: `${feedId}_5`,
      title: `Weekly recap & recommended reads for this weekend`,
      content: `Wrapping up an eventful week with our top recommended resources, publications, and thoughts. Save this post to read over the weekend!`,
      author: handle,
      authorHandle: `@${handle}`,
      authorAvatar: avatar,
      mediaUrl: `https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80`,
      mediaType: 'image',
      pubDate: new Date(now.getTime() - 72 * 60 * 60 * 1000).toISOString(),
      url: url,
      likes: 2120,
      comments: 310,
      shares: 180,
      tags: ['recap', 'weekend'],
      platform
    }
  ];

  return {
    id: feedId,
    title: `${handle} - ${platformMeta.name} Feed`,
    description: `Official RSS feed for ${handle} on ${platformMeta.name}. Generated dynamically by FeedFlow.`,
    platform,
    sourceUrl: url,
    avatar,
    followersCount: '240K',
    itemsCount: items.length,
    lastBuildDate: now.toISOString(),
    items,
    autoRefreshMinutes: 15,
    filters: {},
    createdAt: now.toISOString()
  };
}

/**
 * Format a valid standard RSS 2.0 XML document
 */
export function buildRssXml(feed: SocialFeed, appUrl: string = 'http://localhost:3000'): string {
  const feedXmlUrl = `${appUrl}/api/feed/${feed.id}.xml`;
  const filteredItems = filterFeedItems(
    feed.items,
    feed.filters.mustContain,
    feed.filters.exclude,
    feed.filters.mediaOnly
  );

  const itemsXml = filteredItems
    .map((item) => {
      const pubDateRfc822 = new Date(item.pubDate).toUTCString();
      const mediaTag = item.mediaUrl
        ? `<enclosure url="${escapeXml(item.mediaUrl)}" type="image/jpeg" length="0" />\n      <media:content url="${escapeXml(item.mediaUrl)}" medium="${item.mediaType === 'video' ? 'video' : 'image'}" />`
        : '';

      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="false">${escapeXml(item.id)}</guid>
      <pubDate>${pubDateRfc822}</pubDate>
      <dc:creator>${escapeXml(item.author)}</dc:creator>
      <description><![CDATA[${item.content}]]></description>
      ${mediaTag}
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:dc="http://purl.org/dc/elements/1.1/" 
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${escapeXml(feed.title)}</title>
    <link>${escapeXml(feed.sourceUrl)}</link>
    <description>${escapeXml(feed.description)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(feed.lastBuildDate).toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(feedXmlUrl)}" rel="self" type="application/rss+xml" />
    <generator>FeedFlow Social RSS Generator (https://rss.app-style)</generator>
${itemsXml}
  </channel>
</rss>`;
}

/**
 * Format standard JSON Feed v1.1
 */
export function buildJsonFeed(feed: SocialFeed, appUrl: string = 'http://localhost:3000') {
  const filteredItems = filterFeedItems(
    feed.items,
    feed.filters.mustContain,
    feed.filters.exclude,
    feed.filters.mediaOnly
  );

  return {
    version: 'https://jsonfeed.org/version/1.1',
    title: feed.title,
    home_page_url: feed.sourceUrl,
    feed_url: `${appUrl}/api/feed/${feed.id}.json`,
    description: feed.description,
    authors: [{ name: feed.title, avatar: feed.avatar }],
    items: filteredItems.map((item) => ({
      id: item.id,
      url: item.url,
      title: item.title,
      content_text: item.content,
      content_html: `<p>${escapeXml(item.content)}</p>${item.mediaUrl ? `<img src="${escapeXml(item.mediaUrl)}" alt="" />` : ''}`,
      date_published: item.pubDate,
      authors: [{ name: item.author, avatar: item.authorAvatar }],
      tags: item.tags,
      image: item.mediaUrl
    }))
  };
}

/**
 * Generate OPML file for importing all feeds into RSS readers
 */
export function buildOpml(feeds: SocialFeed[], appUrl: string = 'http://localhost:3000'): string {
  const outlines = feeds
    .map(
      (f) =>
        `      <outline type="rss" text="${escapeXml(f.title)}" title="${escapeXml(f.title)}" xmlUrl="${escapeXml(`${appUrl}/api/feed/${f.id}.xml`)}" htmlUrl="${escapeXml(f.sourceUrl)}" />`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<opml version="2.0">
  <head>
    <title>FeedFlow Social Subscriptions</title>
    <dateCreated>${new Date().toUTCString()}</dateCreated>
  </head>
  <body>
    <outline text="Social Media Feeds" title="Social Media Feeds">
${outlines}
    </outline>
  </body>
</opml>`;
}

/**
 * Generate embed code for a widget
 */
export function generateWidgetSnippet(feedId: string, settings: WidgetSettings, appUrl: string = 'http://localhost:3000'): string {
  const params = new URLSearchParams({
    type: settings.type,
    theme: settings.theme,
    cols: settings.columns.toString(),
    media: settings.showMedia ? '1' : '0',
    date: settings.showDate ? '1' : '0',
    limit: settings.maxItems.toString(),
    accent: encodeURIComponent(settings.accentColor)
  });

  const widgetUrl = `${appUrl}/embed/${feedId}?${params.toString()}`;

  return `<!-- FeedFlow RSS Widget Embed -->
<iframe 
  src="${widgetUrl}" 
  width="100%" 
  height="${settings.type === 'ticker' ? '60px' : '650px'}" 
  frameborder="0" 
  scrolling="no" 
  style="border: none; overflow: hidden; border-radius: ${settings.borderRadius}px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);"
  title="FeedFlow Widget">
</iframe>`;
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe: string): string {
  return (unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
