/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SocialFeed, SocialPlatform } from './types/feed';
import { Header } from './components/Header';
import { HeroFeedGenerator } from './components/HeroFeedGenerator';
import { FeedDetailView } from './components/FeedDetailView';
import { WidgetBuilder } from './components/WidgetBuilder';
import { MyFeedsDashboard } from './components/MyFeedsDashboard';
import { BotsIntegrations } from './components/BotsIntegrations';
import { SolutionsModal } from './components/SolutionsModal';
import { generateFeedData } from './utils/feedGenerator';
import { PLATFORMS_DATA } from './data/platforms';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'my-feeds' | 'widgets' | 'bots' | 'solutions'>('home');
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>('facebook');
  const [activeFeed, setActiveFeed] = useState<SocialFeed | null>(null);
  const [feeds, setFeeds] = useState<SocialFeed[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar'>('ar'); // Default to Arabic as requested in user prompt
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  // Initialize seed feeds on mount
  useEffect(() => {
    async function loadFeeds() {
      try {
        const res = await fetch('/api/feeds');
        if (res.ok) {
          const data = await res.json();
          if (data.feeds && data.feeds.length > 0) {
            setFeeds(data.feeds);
            return;
          }
        }
      } catch (e) {
        console.error('Failed to fetch feeds from server, using local seed', e);
      }

      // Local fallback seed
      const initial = [
        generateFeedData('https://facebook.com/wired', 'facebook'),
        generateFeedData('https://x.com/nasa', 'twitter'),
        generateFeedData('https://youtube.com/@mkbhd', 'youtube'),
        generateFeedData('https://reddit.com/r/technology', 'reddit'),
        generateFeedData('https://instagram.com/natgeo', 'instagram'),
        generateFeedData('https://t.me/telegram', 'telegram')
      ];
      setFeeds(initial);
    }

    loadFeeds();
  }, []);

  // Handle URL submission from Hero Generator
  const handleGenerateFeed = async (url: string, platform: SocialPlatform) => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-feed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, platform })
      });

      if (response.ok) {
        const data = await response.json();
        const newFeed: SocialFeed = data.feed;
        setFeeds((prev) => [newFeed, ...prev.filter((f) => f.id !== newFeed.id)]);
        setActiveFeed(newFeed);
        setCurrentView('home');
      } else {
        // Fallback local generator if offline
        const localFeed = generateFeedData(url, platform);
        setFeeds((prev) => [localFeed, ...prev.filter((f) => f.id !== localFeed.id)]);
        setActiveFeed(localFeed);
        setCurrentView('home');
      }
    } catch {
      const localFeed = generateFeedData(url, platform);
      setFeeds((prev) => [localFeed, ...prev.filter((f) => f.id !== localFeed.id)]);
      setActiveFeed(localFeed);
      setCurrentView('home');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateFilters = (feedId: string, mustContain?: string, exclude?: string, mediaOnly?: boolean) => {
    setFeeds((prev) =>
      prev.map((f) => {
        if (f.id === feedId) {
          const updated = {
            ...f,
            filters: { mustContain, exclude, mediaOnly }
          };
          if (activeFeed && activeFeed.id === feedId) {
            setActiveFeed(updated);
          }
          return updated;
        }
        return f;
      })
    );
  };

  const handleDeleteFeed = (feedId: string) => {
    setFeeds((prev) => prev.filter((f) => f.id !== feedId));
    if (activeFeed && activeFeed.id === feedId) {
      setActiveFeed(null);
    }
  };

  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const isAr = language === 'ar';

  return (
    <div 
      className={`min-h-screen bg-slate-50/70 text-slate-900 flex flex-col font-sans ${isAr ? 'rtl' : 'ltr'}`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Top Bar Header */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'solutions') {
            setIsSolutionsOpen(true);
          } else {
            setCurrentView(view);
          }
        }}
        onSelectPlatform={(p) => {
          setSelectedPlatform(p);
          setActiveFeed(null);
          setCurrentView('home');
        }}
        feedsCount={feeds.length}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroFeedGenerator
              selectedPlatform={selectedPlatform}
              onSelectPlatform={(p) => {
                setSelectedPlatform(p);
                setActiveFeed(null);
              }}
              onSubmitUrl={handleGenerateFeed}
              isLoading={isLoading}
              language={language}
            />

            {/* When a feed has been generated or selected, display its live items */}
            {activeFeed && (
              <FeedDetailView
                feed={activeFeed}
                onUpdateFilters={handleUpdateFilters}
                onOpenWidgetBuilder={(f) => {
                  setActiveFeed(f);
                  setCurrentView('widgets');
                }}
                onOpenBots={(f) => {
                  setActiveFeed(f);
                  setCurrentView('bots');
                }}
                language={language}
              />
            )}
          </>
        )}

        {currentView === 'my-feeds' && (
          <MyFeedsDashboard
            feeds={feeds}
            onSelectFeed={(f) => {
              setActiveFeed(f);
              setSelectedPlatform(f.platform);
              setCurrentView('home');
            }}
            onOpenWidgetBuilder={(f) => {
              setActiveFeed(f);
              setCurrentView('widgets');
            }}
            onDeleteFeed={handleDeleteFeed}
            onNewFeedClick={() => {
              setActiveFeed(null);
              setCurrentView('home');
            }}
            language={language}
          />
        )}

        {currentView === 'widgets' && (
          <WidgetBuilder
            feed={activeFeed || feeds[0] || generateFeedData('https://facebook.com/wired', 'facebook')}
            onBackToFeed={() => setCurrentView('home')}
            language={language}
          />
        )}

        {currentView === 'bots' && (
          <BotsIntegrations
            feed={activeFeed || feeds[0] || null}
            onBack={() => setCurrentView('home')}
            language={language}
          />
        )}
      </main>

      {/* Solutions / Guide Modal */}
      <SolutionsModal
        isOpen={isSolutionsOpen}
        onClose={() => setIsSolutionsOpen(false)}
        onSelectPlatform={(p) => {
          setSelectedPlatform(p);
          setIsSolutionsOpen(false);
          setCurrentView('home');
        }}
        language={language}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">RSS<span className="text-orange-500">.app</span></span>
            <span>·</span>
            <span>{isAr ? 'مولّد خلاصات منصات التواصل الاجتماعي' : 'Universal Social Media RSS Generator'}</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="/api/opml" className="hover:text-slate-900 transition-colors">OPML</a>
            <span>·</span>
            <button 
              onClick={() => setIsSolutionsOpen(true)}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              {isAr ? 'دليل الاستخدام' : 'Documentation'}
            </button>
            <span>·</span>
            <button 
              onClick={() => setCurrentView('widgets')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              {isAr ? 'الودجات' : 'Widgets'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
