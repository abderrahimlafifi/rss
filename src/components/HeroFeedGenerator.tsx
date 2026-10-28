import React, { useState } from 'react';
import { SocialPlatform } from '../types/feed';
import { PLATFORMS_DATA } from '../data/platforms';
import { SocialPlatformIcon } from './SocialPlatformIcons';
import { ArrowRight, Check, ChevronRight, Loader2, Sparkles } from 'lucide-react';

interface HeroFeedGeneratorProps {
  selectedPlatform: SocialPlatform;
  onSelectPlatform: (platform: SocialPlatform) => void;
  onSubmitUrl: (url: string, platform: SocialPlatform) => Promise<void>;
  isLoading: boolean;
  language: 'en' | 'ar';
}

export const HeroFeedGenerator: React.FC<HeroFeedGeneratorProps> = ({
  selectedPlatform,
  onSelectPlatform,
  onSubmitUrl,
  isLoading,
  language
}) => {
  const [urlInput, setUrlInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const isAr = language === 'ar';
  const platform = PLATFORMS_DATA[selectedPlatform];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) {
      setErrorMsg(isAr ? 'يرجى إدخال رابط أو معرف الحساب' : 'Please enter a URL or handle');
      return;
    }
    setErrorMsg('');
    await onSubmitUrl(urlInput.trim(), selectedPlatform);
  };

  const handleQuickSample = (sampleUrl: string) => {
    setUrlInput(sampleUrl);
    setErrorMsg('');
    onSubmitUrl(sampleUrl, selectedPlatform);
  };

  return (
    <div className="w-full pt-6 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb matching user's screenshot */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
          <span className="hover:text-slate-800 transition-colors">
            {isAr ? 'خلاصة RSS' : 'RSS Feed'}
          </span>
          <ChevronRight className={`w-4 h-4 text-slate-400 ${isAr ? 'rotate-180' : ''}`} />
          <span className="text-slate-900 font-medium">
            {isAr ? `خلاصة ${platform.nameAr} RSS` : `${platform.name} RSS Feed`}
          </span>
        </nav>

        {/* Platform Selector Bar */}
        <div className="mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="flex items-center gap-2 min-w-max justify-start md:justify-center p-1 bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-xs">
            {(Object.keys(PLATFORMS_DATA) as SocialPlatform[]).map((pKey) => {
              const p = PLATFORMS_DATA[pKey];
              const isActive = selectedPlatform === pKey;
              return (
                <button
                  key={pKey}
                  onClick={() => {
                    onSelectPlatform(pKey);
                    setErrorMsg('');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span style={{ color: isActive ? '#FFFFFF' : p.brandColor }}>
                    <SocialPlatformIcon platform={pKey} size={15} />
                  </span>
                  <span>{isAr ? p.nameAr : p.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Icon Lockup: Platform Icon -> RSS Icon */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/80 shadow-md flex items-center justify-center p-3 transition-transform hover:scale-105">
            <span style={{ color: platform.brandColor }}>
              <SocialPlatformIcon platform={selectedPlatform} size={28} />
            </span>
          </div>

          <div className="text-slate-300">
            <ArrowRight className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
          </div>

          <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200/80 shadow-md flex items-center justify-center p-3 text-orange-500 transition-transform hover:scale-105">
            <SocialPlatformIcon platform="rss" size={28} />
          </div>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            {isAr ? `خلاصة ${platform.nameAr} RSS` : `${platform.name} RSS Feed`}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            {isAr ? platform.descriptionAr : platform.description}
          </p>
        </div>

        {/* Central Input Card matching screenshot */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 sm:p-10 max-w-3xl mx-auto">
          <form onSubmit={handleFormSubmit} className="space-y-4">
            
            <label htmlFor="feed-url-input" className="block text-center text-sm sm:text-base font-medium text-slate-700">
              {isAr
                ? `الصق أي رابط لصفحة أو حساب أو قناة ${platform.nameAr} عامة أدناه`
                : `Paste any public ${platform.name} Page / Profile / Channel URL below`}
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  id="feed-url-input"
                  type="text"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder={isAr ? platform.placeholderAr : platform.placeholder}
                  className="w-full px-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm sm:text-base transition-all"
                  dir="ltr"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm sm:text-base shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{isAr ? 'جاري التوليد...' : 'Generating...'}</span>
                  </>
                ) : (
                  <span>{isAr ? 'إنشاء خلاصتي' : 'Create My Feed'}</span>
                )}
              </button>
            </div>

            {errorMsg && (
              <p className="text-sm text-red-600 text-center font-medium">{errorMsg}</p>
            )}

            {/* Quick 1-Click Samples */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
              <span className="font-medium text-slate-600">{isAr ? 'جرّب بضغطة واحدة:' : 'Try 1-click sample:'}</span>
              {platform.sampleUrls.map((sample) => (
                <button
                  key={sample.label}
                  type="button"
                  onClick={() => handleQuickSample(sample.url)}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors cursor-pointer"
                >
                  {sample.label}
                </button>
              ))}
            </div>

          </form>
        </div>

        {/* Feature Guarantees (under the card, matching screenshot) */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-8">
          
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200/80 shadow-xs text-xs sm:text-sm font-medium text-slate-700">
            <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span>{isAr ? 'الملفات والصفحات العامة' : 'Public profiles & pages'}</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200/80 shadow-xs text-xs sm:text-sm font-medium text-slate-700">
            <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span>{isAr ? 'إعداد في 30 ثانية' : '30 seconds setup'}</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200/80 shadow-xs text-xs sm:text-sm font-medium text-slate-700">
            <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
            <span>{isAr ? 'لا تفوّت أي منشور' : 'Never miss a post'}</span>
          </div>

        </div>

      </div>
    </div>
  );
};
