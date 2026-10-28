import React from 'react';
import { 
  X, 
  Globe2, 
  Newspaper, 
  Bot, 
  Share2, 
  ShieldCheck, 
  Radio, 
  ExternalLink 
} from 'lucide-react';

interface SolutionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlatform: (platform: any) => void;
  language: 'en' | 'ar';
}

export const SolutionsModal: React.FC<SolutionsModalProps> = ({
  isOpen,
  onClose,
  onSelectPlatform,
  language
}) => {
  if (!isOpen) return null;
  const isAr = language === 'ar';

  const solutions = [
    {
      icon: <Globe2 className="w-5 h-5 text-blue-600" />,
      title: isAr ? 'تضمين المنشورات في المواقع' : 'Website & Blog Embeds',
      desc: isAr
        ? 'اعرض منشورات انستغرام، يوتيوب، أو فيسبوك مباشرة في موقعك أو ووردبريس أو شوبيفاي دون التأثير على سرعة الموقع.'
        : 'Display live Instagram, YouTube, and Facebook walls on WordPress, Shopify, Webflow, and custom sites.'
    },
    {
      icon: <Radio className="w-5 h-5 text-orange-600" />,
      title: isAr ? 'رصد المنافسين والأخبار' : 'Media & Competitor Monitoring',
      desc: isAr
        ? 'تابع حسابات المنافسين والمجتمعات على ريديت وإكس بدون الحاجة لإنشاء حسابات أو خوارزميات تشتت انتباهك.'
        : 'Track industry leaders, competitor press releases, and subreddit trends in a clean chronologic feed.'
    },
    {
      icon: <Bot className="w-5 h-5 text-indigo-600" />,
      title: isAr ? 'أتمتة النشر عبر Discord و Slack' : 'Discord & Slack Integrations',
      desc: isAr
        ? 'وصّل قنوات التواصل بمجتمع ديسكورد أو مساحة عمل سلاك لتبقى فرق العمل على اطلاع فوري بكل جديد.'
        : 'Deliver automatic alerts into team channels whenever a YouTube creator uploads or a press release drops.'
    },
    {
      icon: <Newspaper className="w-5 h-5 text-emerald-600" />,
      title: isAr ? 'النشرات البريدية الآلية' : 'Automated Email Newsletters',
      desc: isAr
        ? 'استخدم روابط RSS 2.0 القياسية في أدوات النشرات مثل Mailchimp و Substack لأتمتة إرسال التحديثات الأسبوعية.'
        : 'Feed social updates directly into Mailchimp, Substack, or ActiveCampaign RSS-to-email campaigns.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
        dir={isAr ? 'rtl' : 'ltr'}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 block">
            {isAr ? 'حلول الأعمال وتطبيقات RSS' : 'Enterprise & Creator Solutions'}
          </span>
          <h3 className="text-2xl font-extrabold text-slate-900">
            {isAr ? 'ما الذي يمكنك فعله بخلاصات RSS؟' : 'What can you do with Social RSS?'}
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            {isAr
              ? 'حوّل أي منصة تواصل إلى بيانات حرة متوافقة مع معايير الويب المفتوحة'
              : 'Liberate social media feeds into universal standard feeds for your sites, teams, and automations.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {solutions.map((sol, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
              <div className="w-9 h-9 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center mb-2.5">
                {sol.icon}
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">{sol.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{sol.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isAr ? 'إغلاق' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
