import React, { useState } from 'react';
import { SocialFeed } from '../types/feed';
import { PLATFORMS_DATA } from '../data/platforms';
import { SocialPlatformIcon } from './SocialPlatformIcons';
import { 
  Download, 
  ExternalLink, 
  LayoutGrid, 
  Copy, 
  Check, 
  Trash2, 
  Plus, 
  Search,
  RefreshCw,
  Rss
} from 'lucide-react';

interface MyFeedsDashboardProps {
  feeds: SocialFeed[];
  onSelectFeed: (feed: SocialFeed) => void;
  onOpenWidgetBuilder: (feed: SocialFeed) => void;
  onDeleteFeed: (feedId: string) => void;
  onNewFeedClick: () => void;
  language: 'en' | 'ar';
}

export const MyFeedsDashboard: React.FC<MyFeedsDashboardProps> = ({
  feeds,
  onSelectFeed,
  onOpenWidgetBuilder,
  onDeleteFeed,
  onNewFeedClick,
  language
}) => {
  const isAr = language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

  const filteredFeeds = feeds.filter(
    (f) =>
      f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyRss = (feedId: string) => {
    const url = `${origin}/api/feed/${feedId}.xml`;
    navigator.clipboard.writeText(url);
    setCopiedId(feedId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {isAr ? 'خلاصاتي المحفوظة' : 'My RSS Feeds'}
          </h2>
          <p className="text-sm text-slate-500">
            {isAr ? 'إدارة ومزامنة وتصدير جميع الخلاصات النشطة' : 'Manage, sync, and export your active social feeds'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href="/api/opml"
            download="feedflow-subscriptions.opml"
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>{isAr ? 'تصدير OPML' : 'Export OPML'}</span>
          </a>

          <button
            onClick={onNewFeedClick}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{isAr ? 'خلاصة جديدة' : 'Create Feed'}</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={isAr ? 'بحث في الخلاصات...' : 'Search your feeds...'}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Feeds List */}
      {filteredFeeds.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
          <Rss className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-1">
            {isAr ? 'لم يتم العثور على خلاصات' : 'No feeds found'}
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            {isAr ? 'أنشئ أول خلاصة لصفحات التواصل الاجتماعي الآن' : 'Create your first social media feed to get started.'}
          </p>
          <button
            onClick={onNewFeedClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors"
          >
            {isAr ? 'إنشاء خلاصة جديدة' : 'Create New Feed'}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFeeds.map((feed) => {
            const platform = PLATFORMS_DATA[feed.platform];
            return (
              <div
                key={feed.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={feed.avatar}
                        alt=""
                        className="w-11 h-11 rounded-xl object-cover bg-slate-100 border border-slate-200"
                      />
                      <div>
                        <h4 
                          onClick={() => onSelectFeed(feed)}
                          className="text-sm font-bold text-slate-900 hover:text-blue-600 cursor-pointer line-clamp-1"
                        >
                          {feed.title}
                        </h4>
                        <span className="text-[11px] text-slate-400 capitalize flex items-center gap-1.5 mt-0.5">
                          <span style={{ color: platform.brandColor }}>
                            <SocialPlatformIcon platform={feed.platform} size={12} />
                          </span>
                          <span>{platform.name}</span>
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => onDeleteFeed(feed.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title={isAr ? 'حذف الخلاصة' : 'Delete feed'}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {feed.description}
                  </p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium mb-4">
                    <span className="tabular-nums font-mono">{feed.items.length} {isAr ? 'منشور' : 'items'}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-emerald-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>{isAr ? 'نشط' : 'Active'}</span>
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectFeed(feed)}
                    className="flex-1 py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors text-center cursor-pointer"
                  >
                    {isAr ? 'فتح الخلاصة' : 'View Feed'}
                  </button>

                  <button
                    onClick={() => onOpenWidgetBuilder(feed)}
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                    title={isAr ? 'تخصيص ودجت' : 'Widget Studio'}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleCopyRss(feed.id)}
                    className="p-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                    title={isAr ? 'نسخ رابط RSS' : 'Copy RSS URL'}
                  >
                    {copiedId === feed.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
