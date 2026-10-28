import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  detectPlatformFromUrl, 
  extractHandle, 
  filterFeedItems, 
  generateFeedData, 
  buildRssXml, 
  buildJsonFeed, 
  buildOpml 
} from './feedGenerator';

test('detectPlatformFromUrl correctly identifies various social media URLs', () => {
  assert.equal(detectPlatformFromUrl('https://facebook.com/wired'), 'facebook');
  assert.equal(detectPlatformFromUrl('https://x.com/nasa'), 'twitter');
  assert.equal(detectPlatformFromUrl('https://twitter.com/elonmusk'), 'twitter');
  assert.equal(detectPlatformFromUrl('https://youtube.com/@mkbhd'), 'youtube');
  assert.equal(detectPlatformFromUrl('https://instagram.com/natgeo'), 'instagram');
  assert.equal(detectPlatformFromUrl('https://tiktok.com/@khaby.lame'), 'tiktok');
  assert.equal(detectPlatformFromUrl('https://reddit.com/r/technology'), 'reddit');
  assert.equal(detectPlatformFromUrl('https://t.me/durov'), 'telegram');
  assert.equal(detectPlatformFromUrl('https://threads.net/@zuck'), 'threads');
});

test('extractHandle extracts clean handles from platform URLs', () => {
  assert.equal(extractHandle('https://facebook.com/wired', 'facebook'), 'wired');
  assert.equal(extractHandle('https://youtube.com/@mkbhd', 'youtube'), 'mkbhd');
  assert.equal(extractHandle('https://reddit.com/r/technology', 'reddit'), 'r/technology');
});

test('filterFeedItems filters by mustContain, exclude, and mediaOnly', () => {
  const feed = generateFeedData('https://facebook.com/wired');
  assert.ok(feed.items.length >= 4);

  // Filter with mustContain
  const filtered = filterFeedItems(feed.items, 'announcement');
  assert.ok(filtered.length >= 1);
  assert.ok(filtered.every(i => i.title.toLowerCase().includes('announcement') || i.content.toLowerCase().includes('announcement')));

  // Filter media only
  const mediaOnly = filterFeedItems(feed.items, undefined, undefined, true);
  assert.ok(mediaOnly.every(i => i.mediaType !== 'none'));
});

test('buildRssXml outputs valid RSS 2.0 structure', () => {
  const feed = generateFeedData('https://facebook.com/wired');
  const xml = buildRssXml(feed, 'https://example.com');

  assert.ok(xml.includes('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(xml.includes('<rss version="2.0"'));
  assert.ok(xml.includes('<channel>'));
  assert.ok(xml.includes(`<title>${feed.title}</title>`));
  assert.ok(xml.includes('<item>'));
});

test('buildJsonFeed outputs standard JSON Feed structure', () => {
  const feed = generateFeedData('https://youtube.com/@mkbhd');
  const jsonFeed = buildJsonFeed(feed, 'https://example.com');

  assert.equal(jsonFeed.version, 'https://jsonfeed.org/version/1.1');
  assert.equal(jsonFeed.title, feed.title);
  assert.ok(Array.isArray(jsonFeed.items));
  assert.ok(jsonFeed.items.length > 0);
});

test('buildOpml outputs valid OPML 2.0 structure', () => {
  const feed1 = generateFeedData('https://facebook.com/wired');
  const feed2 = generateFeedData('https://x.com/nasa');
  const opml = buildOpml([feed1, feed2], 'https://example.com');

  assert.ok(opml.includes('<opml version="2.0">'));
  assert.ok(opml.includes('outline type="rss"'));
  assert.ok(opml.includes(feed1.id));
  assert.ok(opml.includes(feed2.id));
});
