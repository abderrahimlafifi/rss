import React, { useState } from 'react';
import { SocialFeed, FeedItem } from '../types/feed';
import { PLATFORMS_DATA } from '../data/platforms';
import { SocialPlatformIcon } from './SocialPlatformIcons';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Code, 
  SlidersHorizontal, 
  LayoutGrid, 
  Bot, 
  RefreshCw, 
  Heart, 
  MessageSquare, 
  Share2, 
  Filter,
  FileCode,
  Calendar,
  Users
} from 'lucide-react';
import { filterFeedItems } from '../utils/feedGenerator';

interface FeedDetailViewProps {
  feed: SocialFeed;
  onUpdateFilters: (feedId: string, mustContain?: string, exclude?: string, mediaOnly?: boolean) => void;
  onOpenWidgetBuilder: (feed: SocialFeed) => void;
  onOpenBots: (feed: SocialFeed) => void;
  language: 'en' | 'ar';
}

export const FeedDetailView: React.FC<FeedDetailViewProps> = ({
  feed,
  onUpdateFilters,
  onOpenWidgetBuilder,
  onOpenBots,
  language
}) => {
  const [copiedType, setCopiedType] = useState<'xml' | 'json' | null>(null);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);
  const [mustContainInput, setMustContainInput] = useState(feed.filters.mustContain || '');
  const [excludeInput, setExcludeInput] = useState(feed.filters.exclude || '');
  const [mediaOnlyInput, setMediaOnlyInput] = useState(feed.filters.mediaOnly || false);
  const [showXmlModal, setShowXmlModal] = useState(false);

  const isAr = language === 'ar';
  const platformMeta = PLATFORMS_DATA[feed.platform];
  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const rssXmlUrl = `${origin}/api/feed/${feed.id}.xml`;
  const jsonFeedUrl = `${origin}/api/feed/${feed.id}.json`;

  const filteredItems = filterFeedItems(
    feed.items,
    feed.filters.mustContain,
    feed.filters.exclude,
    feed.filters.mediaOnly
  );

  const handleCopyUrl = (url: string, type: 'xml' | 'json') => {
    navigator.clipboard.writeText(url);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateFilters(feed.id, mustContainInput, excludeInput, mediaOnlyInput);
    setShowFilterDrawer(false);
  };

  const formatRelativeTime = (isoString: string) => {
    const diff = (Date.now() - new Date(isoString).getTime()) / 1000;
    if (diff < 3600) {
      const mins = Math.floor(diff / 60);
      return isAr ? `منذ ${mins} دقيقة` : `${mins}m ago`;
    }
    if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return isAr ? `منذ ${hours} ساعة` : `${hours}h ago`;
    }
    const days = Math.floor(diff / 86400);
    return isAr ? `منذ ${days} يوم` : `${days}d ago`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={feed.avatar}
                alt={feed.title}
                className="w-16 h-16 rounded-2xl object-cover bg-slate-100 border border-slate-200"
              />
              <div 
                className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white shadow-xs border border-slate-200"
                style={{ color: platformMeta.brandColor }}
              >
                <SocialPlatformIcon platform={feed.platform} size={14} />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{feed.title}</h2>
              </div>
              <p className="text-sm text-slate-500 mt-0.5">{feed.description}</p>
              
              <div className="flex items-center gap-4 text-xs text-slate-500 mt-2 font-medium">
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span className="tabular-nums">{feed.followersCount}</span> {isAr ? 'متابع' : 'followers'}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <span className="tabular-nums">{feed.items.length}</span> {isAr ? 'منشور متاح' : 'posts'}
                </span>
                <span>·</span>
                <a 
                  href={feed.sourceUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <span>{isAr ? 'المصدر الأصلي' : 'Original source'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => onOpenWidgetBuilder(feed)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <LayoutGrid className="w-4 h-4" />
              <span>{isAr ? 'تخصيص ودجت' : 'Create Widget'}</span>
            </button>

            <button
              onClick={() => onOpenBots(feed)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-xl border border-indigo-200 transition-colors cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>{isAr ? 'ربط ببوت' : 'Connect Bot'}</span>
            </button>

            <button
              onClick={() => setShowFilterDrawer(!showFilterDrawer)}
              className={`flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                feed.filters.mustContain || feed.filters.exclude || feed.filters.mediaOnly
                  ? 'bg-amber-50 text-amber-700 border-amber-300'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span>{isAr ? 'تصفية' : 'Filters'}</span>
            </button>
          </div>

        </div>

        {/* Live Feed URLs Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
          
          {/* RSS 2.0 XML Card */}
          <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-orange-950 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                RSS 2.0 XML URL
              </span>
              <a
                href={rssXmlUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-orange-600 hover:underline flex items-center gap-1"
              >
                <span>{isAr ? 'عرض XML' : 'View XML'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-xl border border-orange-200 p-2">
              <input
                type="text"
                readOnly
                value={rssXmlUrl}
                className="bg-transparent text-xs text-slate-700 font-mono flex-1 outline-none truncate"
                dir="ltr"
              />
              <button
                onClick={() => handleCopyUrl(rssXmlUrl, 'xml')}
                className="p-1.5 hover:bg-orange-100 rounded-lg text-orange-700 transition-colors shrink-0"
                title={isAr ? 'نسخ الرابط' : 'Copy link'}
              >
                {copiedType === 'xml' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* JSON Feed v1.1 Card */}
          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                JSON Feed v1.1 URL
              </span>
              <a
                href={jsonFeedUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>{isAr ? 'عرض JSON' : 'View JSON'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-xl border border-blue-200 p-2">
              <input
                type="text"
                readOnly
                value={jsonFeedUrl}
                className="bg-transparent text-xs text-slate-700 font-mono flex-1 outline-none truncate"
                dir="ltr"
              />
              <button
                onClick={() => handleCopyUrl(jsonFeedUrl, 'json')}
                className="p-1.5 hover:bg-blue-100 rounded-lg text-blue-700 transition-colors shrink-0"
                title={isAr ? 'نسخ الرابط' : 'Copy link'}
              >
                {copiedType === 'json' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Filter Drawer / Accordion */}
      {showFilterDrawer && (
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 mb-8 transition-all">
          <form onSubmit={handleApplyFilters} className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                <span>{isAr ? 'قواعد التصفية والتحكم' : 'Filter & Content Rules'}</span>
              </h3>
              <button
                type="button"
                onClick={() => {
                  setMustContainInput('');
                  setExcludeInput('');
                  setMediaOnlyInput(false);
                  onUpdateFilters(feed.id, undefined, undefined, false);
                }}
                className="text-xs text-slate-500 hover:text-red-600 font-medium cursor-pointer"
              >
                {isAr ? 'إعادة ضبط' : 'Reset filters'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {isAr ? 'يجب أن يحتوي على الكلمات' : 'Must contain keyword'}
                </label>
                <input
                  type="text"
                  value={mustContainInput}
                  onChange={(e) => setMustContainInput(e.target.value)}
                  placeholder="e.g. announcement, update"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  {isAr ? 'استبعاد المنشورات التي تحتوي على' : 'Exclude keyword'}
                </label>
                <input
                  type="text"
                  value={excludeInput}
                  onChange={(e) => setExcludeInput(e.target.value)}
                  placeholder="e.g. sponsor, ads"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer w-full">
                  <input
                    type="checkbox"
                    checked={mediaOnlyInput}
                    onChange={(e) => setMediaOnlyInput(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                  />
                  <span className="text-xs font-medium text-slate-700">
                    {isAr ? 'المنشورات التي تحتوي صور/فيديو فقط' : 'Media posts only'}
                  </span>
                </label>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                {isAr ? 'تطبيق القواعد' : 'Apply Rules'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Stream Section Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>{isAr ? 'أحدث المنشورات في الخلاصة' : 'Latest Feed Items'}</span>
          <span className="text-xs font-medium text-slate-500 tabular-nums">
            ({filteredItems.length} {isAr ? 'عنصر' : 'items'})
          </span>
        </h3>

        <div className="text-xs text-slate-500 flex items-center gap-1.5">
          <RefreshCw className="w-3.5 h-3.5 text-emerald-600 animate-spin-slow" />
          <span>{isAr ? 'التحديث التلقائي: كل 15 دقيقة' : 'Auto-sync every 15m'}</span>
        </div>
      </div>

      {/* Posts Stream */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
          <p className="text-slate-500 text-sm">
            {isAr ? 'لا توجد منشورات تطابق معايير التصفية الحالية.' : 'No posts match your current filter rules.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <article 
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Media banner if available */}
                {item.mediaUrl && (
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform hover:scale-102 duration-300"
                      loading="lazy"
                    />
                    {item.mediaType === 'video' && (
                      <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider">
                        VIDEO
                      </div>
                    )}
                  </div>
                )}

                <div className="p-6">
                  {/* Author line */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={item.authorAvatar || feed.avatar}
                        alt={item.author}
                        className="w-7 h-7 rounded-full bg-slate-200 object-cover"
                      />
                      <div>
                        <p className="text-xs font-bold text-slate-900 leading-tight">{item.author}</p>
                        <p className="text-[11px] text-slate-500 leading-tight">{item.authorHandle}</p>
                      </div>
                    </div>
                    <time className="text-[11px] text-slate-400 font-medium tabular-nums">
                      {formatRelativeTime(item.pubDate)}
                    </time>
                  </div>

                  {/* Title & Content */}
                  <h4 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {item.content}
                  </p>

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex items-center gap-2 mt-3 text-[11px] text-slate-400">
                      {item.tags.map(t => (
                        <span key={t}>#{t}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer: Metrics & Outbound link */}
              <div className="px-6 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-slate-400" />
                    <span className="tabular-nums font-mono">{item.likes?.toLocaleString()}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    <span className="tabular-nums font-mono">{item.comments?.toLocaleString()}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5 text-slate-400" />
                    <span className="tabular-nums font-mono">{item.shares?.toLocaleString()}</span>
                  </span>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>{isAr ? 'عرض المنشور' : 'View post'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
};
