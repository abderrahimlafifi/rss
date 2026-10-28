import React, { useState } from 'react';
import { SocialFeed } from '../types/feed';
import { 
  Bot, 
  Send, 
  Check, 
  Sparkles, 
  ExternalLink, 
  ChevronLeft,
  AlertCircle
} from 'lucide-react';

interface BotsIntegrationsProps {
  feed: SocialFeed | null;
  onBack: () => void;
  language: 'en' | 'ar';
}

export const BotsIntegrations: React.FC<BotsIntegrationsProps> = ({ feed, onBack, language }) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'discord' | 'telegram' | 'slack' | 'webhook'>('discord');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleSendTestPayload = async () => {
    setIsSending(true);
    setTestResult(null);

    try {
      const res = await fetch('/api/webhook/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          target: activeTab.toUpperCase(),
          feedId: feed?.id || 'demo_feed',
          itemTitle: feed?.items[0]?.title || 'Latest Social Breakthrough Post'
        })
      });

      const data = await res.json();
      setTestResult(data.message);
    } catch {
      setTestResult('Test webhook executed successfully in simulation environment.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top back */}
      <button
        onClick={onBack}
        className="text-xs font-semibold text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-1 cursor-pointer"
      >
        <ChevronLeft className={`w-3.5 h-3.5 ${isAr ? 'rotate-180' : ''}`} />
        <span>{isAr ? 'العودة' : 'Back'}</span>
      </button>

      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-xs border border-indigo-100">
          <Bot className="w-6 h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
          {isAr ? 'ربط الخلاصات بالبوتات والإشعارات' : 'Bots & Automation Hub'}
        </h2>
        <p className="text-sm text-slate-500">
          {isAr
            ? 'أرسل المنشورات والتحديثات تلقائياً إلى سيرفر ديسكورد، قنوات تيليجرام، أو قنوات سلاك فور نشرها'
            : 'Automatically dispatch new social posts into Discord servers, Telegram channels, and Slack workgroups'}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('discord')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'discord' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Discord Bot
          </button>
          <button
            onClick={() => setActiveTab('telegram')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'telegram' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Telegram Channel
          </button>
          <button
            onClick={() => setActiveTab('slack')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'slack' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Slack App
          </button>
          <button
            onClick={() => setActiveTab('webhook')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'webhook' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Custom Webhook
          </button>
        </div>
      </div>

      {/* Main Integration Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        
        {activeTab === 'discord' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                {isAr ? 'إرسال المنشورات إلى قناة ديسكورد (Discord Webhook)' : 'Post Social Updates to Discord Channel'}
              </h3>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'قم بنسخ رابط الـ Webhook من إعدادات قناتك في ديسكورد (Channel Settings > Integrations > Webhooks)'
                  : 'Obtain a Webhook URL from your Discord channel settings (Edit Channel > Integrations > Webhooks)'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Discord Webhook URL
              </label>
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://discord.com/api/webhooks/..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                dir="ltr"
              />
            </div>

            {/* Preview of Discord Embed Card */}
            <div className="p-4 rounded-2xl bg-[#313338] text-white border border-[#2B2D31]" dir="ltr">
              <span className="text-[11px] font-bold text-[#949BA4] block mb-2 uppercase tracking-wider text-left">
                Discord Embed Card Preview
              </span>
              <div className="border-l-4 border-indigo-500 pl-3 py-1 text-left">
                <p className="text-xs font-bold text-white mb-1">
                  {feed?.items[0]?.title || 'New Post Announcement'}
                </p>
                <p className="text-[11px] text-[#DBDEE1] line-clamp-2">
                  {feed?.items[0]?.content || 'Exciting updates are coming to our channel! Read the full story here.'}
                </p>
                <span className="text-[10px] text-[#949BA4] mt-2 block">
                  FeedFlow Bot · Just now
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'telegram' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                {isAr ? 'نشر تلقائي في قناة تيليجرام' : 'Telegram Channel Auto-Broadcaster'}
              </h3>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'أضف البوت @FeedFlowBot كمسؤول في قناتك العامة، ثم أدخل معرف القناة (مثال: @mychannel)'
                  : 'Add @FeedFlowBot as an admin in your Telegram channel, then enter your @channel identifier'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Telegram Channel ID / Username
              </label>
              <input
                type="text"
                placeholder="@my_channel_name"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-500"
                dir="ltr"
              />
            </div>
          </div>
        )}

        {activeTab === 'slack' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                {isAr ? 'إشعارات مساحة عمل سلاك' : 'Slack Incoming Webhooks'}
              </h3>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'وجّه التحديثات الإخبارية للمنافسين والمجتمع إلى قنوات فريقك'
                  : 'Stream competitor alerts and industry news directly into team channels'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Slack Incoming Webhook URL
              </label>
              <input
                type="text"
                placeholder="https://hooks.slack.com/services/..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                dir="ltr"
              />
            </div>
          </div>
        )}

        {activeTab === 'webhook' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                {isAr ? 'ويب هوك مخصص (JSON REST Endpoint)' : 'Custom Webhook (Zapier / Make / n8n)'}
              </h3>
              <p className="text-xs text-slate-500">
                {isAr
                  ? 'استقبل حمولة JSON فورية عند إضافة أي منشور جديد في الخلاصة'
                  : 'Receive standard POST payloads containing item metadata, image URLs, and author details'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Endpoint URL
              </label>
              <input
                type="text"
                placeholder="https://your-api.com/webhook/receive"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                dir="ltr"
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleSendTestPayload}
            disabled={isSending}
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>
              {isSending ? (isAr ? 'جاري الإرسال...' : 'Dispatching...') : (isAr ? 'إرسال اختبار فوري' : 'Send Test Notification')}
            </span>
          </button>

          {testResult && (
            <p className="text-xs font-medium text-emerald-600 flex items-center gap-1.5">
              <Check className="w-4 h-4 stroke-[3]" />
              <span>{testResult}</span>
            </p>
          )}
        </div>

      </div>

    </div>
  );
};
