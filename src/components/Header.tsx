import React, { useState } from 'react';
import { SocialPlatformIcon } from './SocialPlatformIcons';
import { SocialPlatform } from '../types/feed';
import { PLATFORMS_DATA } from '../data/platforms';
import { ChevronDown, Globe, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentView: 'home' | 'my-feeds' | 'widgets' | 'bots' | 'solutions';
  onNavigate: (view: 'home' | 'my-feeds' | 'widgets' | 'bots' | 'solutions') => void;
  onSelectPlatform: (platform: SocialPlatform) => void;
  feedsCount: number;
  language: 'en' | 'ar';
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onSelectPlatform,
  feedsCount,
  language,
  onToggleLanguage,
}) => {
  const [isFeedsMenuOpen, setIsFeedsMenuOpen] = useState(false);
  const isAr = language === 'ar';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-sm shadow-orange-500/30 group-hover:bg-orange-600 transition-colors">
              <SocialPlatformIcon platform="rss" size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-slate-800 whitespace-nowrap">
              RSS<span className="text-orange-500">.app</span>
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          
          {/* RSS Feeds Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsFeedsMenuOpen(!isFeedsMenuOpen)}
              onBlur={() => setTimeout(() => setIsFeedsMenuOpen(false), 200)}
              className="flex items-center gap-1.5 py-1.5 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0"
              aria-expanded={isFeedsMenuOpen}
            >
              <span>{isAr ? 'خلاصات RSS' : 'RSS Feeds'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFeedsMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isFeedsMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-2 grid grid-cols-2 gap-1 z-50">
                {(Object.keys(PLATFORMS_DATA) as SocialPlatform[]).map((pKey) => {
                  const plat = PLATFORMS_DATA[pKey];
                  return (
                    <button
                      key={pKey}
                      onMouseDown={() => {
                        onSelectPlatform(pKey);
                        onNavigate('home');
                        setIsFeedsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 p-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors text-left"
                    >
                      <span style={{ color: plat.brandColor }}>
                        <SocialPlatformIcon platform={pKey} size={16} />
                      </span>
                      <span className="truncate">{isAr ? plat.nameAr : plat.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Widgets */}
          <button
            onClick={() => onNavigate('widgets')}
            className={`py-1.5 transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'widgets' ? 'text-blue-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            {isAr ? 'ودجات العرض' : 'Widgets'}
          </button>

          {/* Bots */}
          <button
            onClick={() => onNavigate('bots')}
            className={`py-1.5 transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'bots' ? 'text-blue-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            {isAr ? 'البوتات والربط' : 'Bots & Integrations'}
          </button>

          {/* Solutions */}
          <button
            onClick={() => onNavigate('solutions')}
            className={`py-1.5 transition-colors whitespace-nowrap shrink-0 ${
              currentView === 'solutions' ? 'text-blue-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            {isAr ? 'الحلول' : 'Solutions'}
          </button>
        </nav>

        {/* Zone 3: Language & Primary CTA Action */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Toggle */}
          <button
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title={isAr ? 'Switch to English' : 'التحويل للعربية'}
          >
            <Globe className="w-4 h-4 text-slate-500" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>

          {/* Primary Action Button ("My feeds") */}
          <button
            onClick={() => onNavigate('my-feeds')}
            className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm ${
              currentView === 'my-feeds'
                ? 'bg-blue-700 text-white shadow-blue-700/25 ring-2 ring-blue-600 ring-offset-1'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/20'
            }`}
          >
            <span>{isAr ? 'خلاصاتي' : 'My feeds'}</span>
            <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold bg-white/25 rounded-md tabular-nums">
              {feedsCount}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
