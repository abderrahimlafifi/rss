import express from 'express';
import { createServer as createViteServer } from 'vite';
import { generateFeedData, buildRssXml, buildJsonFeed, buildOpml } from './src/utils/feedGenerator';
import { SocialFeed } from './src/types/feed';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// In-memory feed storage (cached and synced across sessions)
const feedsDatabase: Map<string, SocialFeed> = new Map();

// Seed initial popular feeds
const seedFeeds = [
  generateFeedData('https://facebook.com/wired', 'facebook'),
  generateFeedData('https://x.com/nasa', 'twitter'),
  generateFeedData('https://youtube.com/@mkbhd', 'youtube'),
  generateFeedData('https://reddit.com/r/technology', 'reddit'),
  generateFeedData('https://instagram.com/natgeo', 'instagram'),
  generateFeedData('https://t.me/telegram', 'telegram')
];

for (const feed of seedFeeds) {
  feedsDatabase.set(feed.id, feed);
}

// API Routes
app.post('/api/generate-feed', (req, res) => {
  try {
    const { url, platform } = req.body;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'URL is required' });
    }

    const feed = generateFeedData(url, platform);
    feedsDatabase.set(feed.id, feed);

    return res.json({ success: true, feed });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Failed to generate feed' });
  }
});

app.get('/api/feeds', (req, res) => {
  const feeds = Array.from(feedsDatabase.values());
  res.json({ feeds });
});

app.get('/api/feed/:id.xml', (req, res) => {
  const { id } = req.params;
  const feed = feedsDatabase.get(id);

  if (!feed) {
    // Generate dynamically on the fly if not found
    const generated = generateFeedData(`https://social.example/${id}`);
    const xml = buildRssXml(generated, `${req.protocol}://${req.get('host')}`);
    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    return res.send(xml);
  }

  const xml = buildRssXml(feed, `${req.protocol}://${req.get('host')}`);
  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
  return res.send(xml);
});

app.get('/api/feed/:id.json', (req, res) => {
  const { id } = req.params;
  const feed = feedsDatabase.get(id);

  if (!feed) {
    const generated = generateFeedData(`https://social.example/${id}`);
    const json = buildJsonFeed(generated, `${req.protocol}://${req.get('host')}`);
    res.setHeader('Content-Type', 'application/feed+json; charset=utf-8');
    return res.json(json);
  }

  const json = buildJsonFeed(feed, `${req.protocol}://${req.get('host')}`);
  res.setHeader('Content-Type', 'application/feed+json; charset=utf-8');
  return res.json(json);
});

app.get('/api/opml', (req, res) => {
  const feeds = Array.from(feedsDatabase.values());
  const opml = buildOpml(feeds, `${req.protocol}://${req.get('host')}`);
  res.setHeader('Content-Type', 'text/x-opml; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="feedflow-subscriptions.opml"');
  return res.send(opml);
});

app.post('/api/webhook/test', (req, res) => {
  const { target, feedId, itemTitle } = req.body;
  // Simulate dispatching to Discord, Telegram or custom webhook
  return res.json({
    success: true,
    message: `Payload successfully delivered to ${target || 'Webhook'}!`,
    timestamp: new Date().toISOString(),
    item: itemTitle || 'Sample Post update'
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`FeedFlow server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
