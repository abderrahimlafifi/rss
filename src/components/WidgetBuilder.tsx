import React, { useState } from 'react';
import { SocialFeed, WidgetSettings, WidgetType } from '../types/feed';
import { generateWidgetSnippet } from '../utils/feedGenerator';
import { 
  Copy, 
  Check, 
  LayoutGrid, 
  Sliders, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';
import { SocialPlatformIcon } from './SocialPlatformIcons';

interface WidgetBuilderProps {
  feed: SocialFeed;
  onBackToFeed: () => void;
  language: 'en' | 'ar';
}

export const WidgetBuilder: React.FC<WidgetBuilderProps> = ({ feed, onBackToFeed, language }) => {
  const isAr = language === 'ar';
  const [copied, setCopied] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const [settings, setSettings] = useState<WidgetSettings>({
    type: 'wall',
    theme: 'light',
    columns: 3,
    showMedia: true,
    showDate: true,
    showAuthor: true,
    maxItems: 6,
    accentColor: '#1877F2',
    borderRadius: 16
  });

  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const embedCode = generateWidgetSnippet(feed.id, settings, origin);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const widgetTypes: { id: WidgetType; label: string; labelAr: string; desc: string }[] = [
    { id: 'wall', label: 'Feed Wall', labelAr: 'جدار المنشورات (شبكة)', desc: 'Responsive grid of dynamic social cards' },
    { id: 'carousel', label: 'Carousel Slider', labelAr: 'شريط متحرك (سلايدر)', desc: 'Smooth horizontal carousel for hero & sidebars' },
    { id: 'list', label: 'Magazine List', labelAr: 'قائمة مدمجة', desc: 'Compact clean headline list with thumbnail' },
    { id: 'ticker', label: 'News Ticker', labelAr: 'شريط أخبار عاجل', desc: 'Continuous horizontal scrolling headline bar' }
  ];

  const accentColors = [
    { label: 'Blue', hex: '#1877F2' },
    { label: 'Orange', hex: '#F97316' },
    { label: 'Indigo', hex: '#6366F1' },
    { label: 'Emerald', hex: '#10B981' },
    { label: 'Rose', hex: '#E11D48' },
    { label: 'Dark', hex: '#0F172A' }
  ];

  const itemsToDisplay = feed.items.slice(0, settings.maxItems);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <button
            onClick={onBackToFeed}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 mb-1 flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
            <span>{isAr ? 'العودة لتفاصيل الخلاصة' : 'Back to feed details'}</span>
          </button>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {isAr ? 'استوديو تضمين ودجات الويب' : 'Embed Widget Studio'}
          </h2>
          <p className="text-sm text-slate-500">
            {isAr ? `تخصيص شكل العرض لـ ${feed.title}` : `Customize and embed live widgets for ${feed.title}`}
          </p>
        </div>

        <button
          onClick={handleCopyCode}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
        >
          {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? (isAr ? 'تم نسخ كود التضمين!' : 'Embed Code Copied!') : (isAr ? 'نسخ كود التضمين' : 'Copy Embed Code')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Customization Controls (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 space-y-6 shadow-xs">
          
          {/* Widget Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              {isAr ? 'نمط الودجت' : 'Widget Layout'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {widgetTypes.map((wt) => (
                <button
                  key={wt.id}
                  onClick={() => setSettings({ ...settings, type: wt.id })}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    settings.type === wt.id
                      ? 'border-blue-600 bg-blue-50/50 text-blue-900 ring-1 ring-blue-600'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                  }`}
                >
                  <p className="text-xs font-bold leading-tight">{isAr ? wt.labelAr : wt.label}</p>
                  <p className="text-[10px] text-slate-500 mt-1 line-clamp-1">{wt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              {isAr ? 'سمة المظهر' : 'Theme'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSettings({ ...settings, theme: 'light' })}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-medium cursor-pointer ${
                  settings.theme === 'light' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Light</span>
              </button>
              <button
                onClick={() => setSettings({ ...settings, theme: 'dark' })}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-medium cursor-pointer ${
                  settings.theme === 'dark' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Dark</span>
              </button>
              <button
                onClick={() => setSettings({ ...settings, theme: 'glass' })}
                className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-medium cursor-pointer ${
                  settings.theme === 'glass' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Glass</span>
              </button>
            </div>
          </div>

          {/* Accent Color */}
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              {isAr ? 'لون التمييز' : 'Accent Color'}
            </label>
            <div className="flex items-center gap-2">
              {accentColors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setSettings({ ...settings, accentColor: c.hex })}
                  className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 flex items-center justify-center cursor-pointer"
                  style={{
                    backgroundColor: c.hex,
                    borderColor: settings.accentColor === c.hex ? '#000000' : 'transparent'
                  }}
                  title={c.label}
                >
                  {settings.accentColor === c.hex && <Check className="w-3.5 h-3.5 text-white stroke-[3]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Columns (for Wall type) */}
          {settings.type === 'wall' && (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  {isAr ? 'عدد الأعمدة' : 'Columns'}
                </label>
                <span className="text-xs font-mono text-slate-500 tabular-nums">{settings.columns}</span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                value={settings.columns}
                onChange={(e) => setSettings({ ...settings, columns: parseInt(e.target.value) })}
                className="w-full accent-blue-600"
              />
            </div>
          )}

          {/* Border Radius */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {isAr ? 'انحناء الحواف' : 'Border Radius'}
              </label>
              <span className="text-xs font-mono text-slate-500 tabular-nums">{settings.borderRadius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="28"
              step="4"
              value={settings.borderRadius}
              onChange={(e) => setSettings({ ...settings, borderRadius: parseInt(e.target.value) })}
              className="w-full accent-blue-600"
            />
          </div>

          {/* Toggles */}
          <div className="space-y-2.5 pt-2 border-t border-slate-100">
            <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
              <span>{isAr ? 'عرض الصور والفيديو' : 'Show Media Photos / Video'}</span>
              <input
                type="checkbox"
                checked={settings.showMedia}
                onChange={(e) => setSettings({ ...settings, showMedia: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
              <span>{isAr ? 'عرض التاريخ' : 'Show Publication Date'}</span>
              <input
                type="checkbox"
                checked={settings.showDate}
                onChange={(e) => setSettings({ ...settings, showDate: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
            </label>

            <label className="flex items-center justify-between text-xs text-slate-700 cursor-pointer">
              <span>{isAr ? 'عرض معلومات الناشر' : 'Show Author Header'}</span>
              <input
                type="checkbox"
                checked={settings.showAuthor}
                onChange={(e) => setSettings({ ...settings, showAuthor: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
            </label>
          </div>

          {/* Max Items */}
          <div className="pt-2">
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                {isAr ? 'الحد الأقصى للمنشورات' : 'Max Posts'}
              </label>
              <span className="text-xs font-mono text-slate-500 tabular-nums">{settings.maxItems}</span>
            </div>
            <input
              type="range"
              min="2"
              max="10"
              value={settings.maxItems}
              onChange={(e) => setSettings({ ...settings, maxItems: parseInt(e.target.value) })}
              className="w-full accent-blue-600"
            />
          </div>

        </div>

        {/* Right: Live Interactive Widget Canvas (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                {isAr ? 'معاينة حية وتفاعلية للودجت' : 'Interactive Live Preview'}
              </span>
            </div>

            <div className="text-xs text-slate-400">
              {settings.type.toUpperCase()} · {settings.theme.toUpperCase()}
            </div>
          </div>

          {/* Preview Container */}
          <div 
            className={`p-6 border transition-colors overflow-hidden min-h-[460px] flex flex-col justify-start ${
              settings.theme === 'dark' 
                ? 'bg-slate-950 border-slate-800 text-white' 
                : settings.theme === 'glass' 
                  ? 'bg-slate-100/70 backdrop-blur-md border-slate-300 text-slate-900' 
                  : 'bg-slate-50 border-slate-200 text-slate-900'
            }`}
            style={{ borderRadius: `${settings.borderRadius + 8}px` }}
          >
            
            {/* 1. Ticker View */}
            {settings.type === 'ticker' && (
              <div 
                className="p-3 flex items-center gap-4 overflow-x-auto whitespace-nowrap bg-white/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
                style={{ borderRadius: `${settings.borderRadius}px` }}
              >
                <div 
                  className="px-2.5 py-1 text-[11px] font-bold text-white uppercase rounded-md shrink-0 flex items-center gap-1.5"
                  style={{ backgroundColor: settings.accentColor }}
                >
                  <SocialPlatformIcon platform={feed.platform} size={13} />
                  <span>{feed.title}</span>
                </div>
                <div className="flex items-center gap-6 text-xs animate-marquee">
                  {itemsToDisplay.map((item) => (
                    <span key={item.id} className="flex items-center gap-2">
                      <span className="font-semibold">{item.title}</span>
                      <span className="text-slate-400">·</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Carousel Slider */}
            {settings.type === 'carousel' && (
              <div className="relative w-full">
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
                  >
                    {itemsToDisplay.map((item) => (
                      <div key={item.id} className="w-full shrink-0 px-2">
                        <div 
                          className={`p-6 border transition-all ${
                            settings.theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                          }`}
                          style={{ borderRadius: `${settings.borderRadius}px` }}
                        >
                          {settings.showAuthor && (
                            <div className="flex items-center gap-2.5 mb-3">
                              <img src={feed.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                              <span className="text-xs font-bold">{item.author}</span>
                            </div>
                          )}
                          {settings.showMedia && item.mediaUrl && (
                            <div className="aspect-video w-full mb-3 rounded-lg overflow-hidden bg-slate-100">
                              <img src={item.mediaUrl} alt="" className="w-full h-full object-cover" />
                            </div>
                          )}
                          <h4 className="text-base font-bold mb-2 leading-tight">{item.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3">{item.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Carousel Controls */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
                    disabled={carouselIndex === 0}
                    className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono tabular-nums text-slate-500">
                    {carouselIndex + 1} / {itemsToDisplay.length}
                  </span>
                  <button
                    onClick={() => setCarouselIndex(Math.min(itemsToDisplay.length - 1, carouselIndex + 1))}
                    disabled={carouselIndex === itemsToDisplay.length - 1}
                    className="p-2 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-200 dark:border-slate-700 disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* 3. Magazine List */}
            {settings.type === 'list' && (
              <div className="space-y-3 w-full">
                {itemsToDisplay.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 border flex items-center justify-between gap-4 transition-all ${
                      settings.theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                    style={{ borderRadius: `${settings.borderRadius}px` }}
                  >
                    <div className="flex-1">
                      {settings.showAuthor && (
                        <span className="text-[11px] font-bold text-slate-500 mb-1 block">
                          {item.author}
                        </span>
                      )}
                      <h4 className="text-sm font-bold leading-snug line-clamp-2">{item.title}</h4>
                      {settings.showDate && (
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          {new Date(item.pubDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    {settings.showMedia && item.mediaUrl && (
                      <img
                        src={item.mediaUrl}
                        alt=""
                        className="w-16 h-16 rounded-lg object-cover shrink-0"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 4. Feed Wall (Grid) */}
            {settings.type === 'wall' && (
              <div 
                className="grid gap-4 w-full"
                style={{
                  gridTemplateColumns: `repeat(${settings.columns}, minmax(0, 1fr))`
                }}
              >
                {itemsToDisplay.map((item) => (
                  <div
                    key={item.id}
                    className={`border p-4 flex flex-col justify-between transition-all ${
                      settings.theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
                    }`}
                    style={{ borderRadius: `${settings.borderRadius}px` }}
                  >
                    <div>
                      {settings.showAuthor && (
                        <div className="flex items-center gap-2 mb-2">
                          <img src={feed.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                          <span className="text-[11px] font-bold truncate">{item.author}</span>
                        </div>
                      )}
                      {settings.showMedia && item.mediaUrl && (
                        <div className="aspect-video w-full mb-2.5 rounded-md overflow-hidden bg-slate-100">
                          <img src={item.mediaUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <h4 className="text-xs font-bold mb-1.5 leading-snug line-clamp-2">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">{item.content}</p>
                    </div>

                    {settings.showDate && (
                      <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 flex justify-between items-center">
                        <span>{new Date(item.pubDate).toLocaleDateString()}</span>
                        <span style={{ color: settings.accentColor }} className="font-bold">→</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Embed Snippet Output Box */}
          <div className="bg-slate-900 rounded-2xl p-5 text-white" dir="ltr">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">
                HTML / Iframe Embed Snippet:
              </span>
              <button
                onClick={handleCopyCode}
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <pre className="text-xs font-mono text-emerald-400 bg-black/50 p-3 rounded-xl overflow-x-auto whitespace-pre-wrap text-left">
              {embedCode}
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
};
