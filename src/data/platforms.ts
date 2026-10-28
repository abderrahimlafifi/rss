import { PlatformMetadata, SocialPlatform } from '../types/feed';

export const PLATFORMS_DATA: Record<SocialPlatform, PlatformMetadata> = {
  facebook: {
    id: 'facebook',
    name: 'Facebook',
    nameAr: 'فيسبوك',
    domain: 'facebook.com',
    placeholder: 'Paste Facebook URL (e.g., facebook.com/wired...)',
    placeholderAr: 'الصق رابط صفحة فيسبوك (مثال: facebook.com/wired...)',
    brandColor: '#1877F2',
    badgeBg: 'bg-blue-50 text-blue-600 border-blue-200',
    badgeText: '#1877F2',
    iconName: 'facebook',
    description: 'Follow Facebook Pages via RSS — no Facebook account needed',
    descriptionAr: 'تابع صفحات فيسبوك عبر خلاصة RSS — بدون الحاجة لحساب فيسبوك',
    sampleUrls: [
      { label: 'Wired', url: 'https://facebook.com/wired', handle: 'wired' },
      { label: 'TechCrunch', url: 'https://facebook.com/techcrunch', handle: 'techcrunch' },
      { label: 'BBC News', url: 'https://facebook.com/bbcnews', handle: 'bbcnews' },
      { label: 'National Geographic', url: 'https://facebook.com/natgeo', handle: 'natgeo' }
    ]
  },
  twitter: {
    id: 'twitter',
    name: 'Twitter / X',
    nameAr: 'تويتر / إكس',
    domain: 'x.com',
    placeholder: 'Paste X / Twitter URL (e.g., x.com/nasa...)',
    placeholderAr: 'الصق رابط حساب إكس / تويتر (مثال: x.com/nasa...)',
    brandColor: '#0F1419',
    badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
    badgeText: '#0F1419',
    iconName: 'twitter',
    description: 'Convert any X (Twitter) profile, search, or list into an RSS feed',
    descriptionAr: 'حوّل أي ملف شخصي أو بحث أو قائمة في إكس (تويتر) إلى خلاصة RSS',
    sampleUrls: [
      { label: 'NASA', url: 'https://x.com/nasa', handle: 'nasa' },
      { label: 'OpenAI', url: 'https://x.com/openai', handle: 'openai' },
      { label: 'TheVerge', url: 'https://x.com/verge', handle: 'verge' },
      { label: 'AlJazeera', url: 'https://x.com/ajarabic', handle: 'ajarabic' }
    ]
  },
  youtube: {
    id: 'youtube',
    name: 'YouTube',
    nameAr: 'يوتيوب',
    domain: 'youtube.com',
    placeholder: 'Paste YouTube Channel or Playlist URL (e.g., youtube.com/@mkbhd)',
    placeholderAr: 'الصق رابط قناة أو قائمة تشغيل يوتيوب (مثال: youtube.com/@mkbhd)',
    brandColor: '#FF0000',
    badgeBg: 'bg-red-50 text-red-600 border-red-200',
    badgeText: '#FF0000',
    iconName: 'youtube',
    description: 'Get notified of new video uploads, shorts, and community posts',
    descriptionAr: 'احصل على تنبيهات بالفيديوهات الجديدة ومقاطع شورتس وقوائم التشغيل',
    sampleUrls: [
      { label: 'MKBHD', url: 'https://youtube.com/@mkbhd', handle: '@mkbhd' },
      { label: 'Veritasium', url: 'https://youtube.com/@veritasium', handle: '@veritasium' },
      { label: 'Fireship', url: 'https://youtube.com/@fireship', handle: '@fireship' },
      { label: 'TED Talks', url: 'https://youtube.com/@TED', handle: '@TED' }
    ]
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    nameAr: 'انستغرام',
    domain: 'instagram.com',
    placeholder: 'Paste Instagram Profile or Tag URL (e.g., instagram.com/nasa)',
    placeholderAr: 'الصق رابط حساب أو هاشتاغ انستغرام (مثال: instagram.com/nasa)',
    brandColor: '#E4405F',
    badgeBg: 'bg-pink-50 text-pink-600 border-pink-200',
    badgeText: '#E4405F',
    iconName: 'instagram',
    description: 'Track photos, reels, and stories without an Instagram login',
    descriptionAr: 'تتبّع الصور والريلز والمنشورات بدون الحاجة لتسجيل دخول انستغرام',
    sampleUrls: [
      { label: 'NASA Space', url: 'https://instagram.com/nasa', handle: 'nasa' },
      { label: 'NatGeo Travel', url: 'https://instagram.com/natgeotravel', handle: 'natgeotravel' },
      { label: 'DesignBoom', url: 'https://instagram.com/designboom', handle: 'designboom' }
    ]
  },
  tiktok: {
    id: 'tiktok',
    name: 'TikTok',
    nameAr: 'تيك توك',
    domain: 'tiktok.com',
    placeholder: 'Paste TikTok Creator URL (e.g., tiktok.com/@khaby.lame)',
    placeholderAr: 'الصق رابط منشئ محتوى تيك توك (مثال: tiktok.com/@khaby.lame)',
    brandColor: '#000000',
    badgeBg: 'bg-neutral-100 text-neutral-800 border-neutral-300',
    badgeText: '#000000',
    iconName: 'tiktok',
    description: 'Stream trending videos and creator uploads directly into RSS',
    descriptionAr: 'تابع مقاطع الفيديو الرائجة ومنشئي المحتوى مباشرة عبر خلاصات RSS',
    sampleUrls: [
      { label: 'Khaby Lame', url: 'https://tiktok.com/@khaby.lame', handle: '@khaby.lame' },
      { label: 'Gordon Ramsay', url: 'https://tiktok.com/@gordonramsayofficial', handle: '@gordonramsayofficial' },
      { label: 'Zach King', url: 'https://tiktok.com/@zachking', handle: '@zachking' }
    ]
  },
  reddit: {
    id: 'reddit',
    name: 'Reddit',
    nameAr: 'ريديت',
    domain: 'reddit.com',
    placeholder: 'Paste Subreddit or User URL (e.g., reddit.com/r/technology)',
    placeholderAr: 'الصق رابط مجتمع أو مستخدم ريديت (مثال: reddit.com/r/technology)',
    brandColor: '#FF4500',
    badgeBg: 'bg-orange-50 text-orange-600 border-orange-200',
    badgeText: '#FF4500',
    iconName: 'reddit',
    description: 'Aggregate top threads, rising discussions, and breaking news from Reddit',
    descriptionAr: 'تجميع أهم النقاشات والموضوعات الصاعدة والأخبار العاجلة من مجتمعات ريديت',
    sampleUrls: [
      { label: 'r/technology', url: 'https://reddit.com/r/technology', handle: 'r/technology' },
      { label: 'r/programming', url: 'https://reddit.com/r/programming', handle: 'r/programming' },
      { label: 'r/worldnews', url: 'https://reddit.com/r/worldnews', handle: 'r/worldnews' },
      { label: 'r/webdev', url: 'https://reddit.com/r/webdev', handle: 'r/webdev' }
    ]
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    nameAr: 'لينكد إن',
    domain: 'linkedin.com',
    placeholder: 'Paste Company Page URL (e.g., linkedin.com/company/google)',
    placeholderAr: 'الصق رابط صفحة شركة لينكد إن (مثال: linkedin.com/company/google)',
    brandColor: '#0A66C2',
    badgeBg: 'bg-sky-50 text-sky-600 border-sky-200',
    badgeText: '#0A66C2',
    iconName: 'linkedin',
    description: 'Monitor enterprise press releases, hiring posts, and executive updates',
    descriptionAr: 'متابعة بيانات الشركات وتحديثات التوظيف ومنشورات القادة التنفيذيين',
    sampleUrls: [
      { label: 'Google', url: 'https://linkedin.com/company/google', handle: 'company/google' },
      { label: 'Microsoft', url: 'https://linkedin.com/company/microsoft', handle: 'company/microsoft' },
      { label: 'Apple', url: 'https://linkedin.com/company/apple', handle: 'company/apple' }
    ]
  },
  telegram: {
    id: 'telegram',
    name: 'Telegram',
    nameAr: 'تيليجرام',
    domain: 't.me',
    placeholder: 'Paste Telegram Public Channel URL (e.g., t.me/telegram)',
    placeholderAr: 'الصق رابط قناة تيليجرام عامة (مثال: t.me/telegram)',
    brandColor: '#26A5E4',
    badgeBg: 'bg-cyan-50 text-cyan-600 border-cyan-200',
    badgeText: '#26A5E4',
    iconName: 'telegram',
    description: 'Turn any public Telegram broadcast channel into a clean feed',
    descriptionAr: 'حوّل أي قناة تيليجرام عامة إلى تدفق إخباري نقي وخلاصة RSS',
    sampleUrls: [
      { label: 'Telegram News', url: 'https://t.me/telegram', handle: 'telegram' },
      { label: 'Durov Channel', url: 'https://t.me/durov', handle: 'durov' },
      { label: 'AlJazeera Channel', url: 'https://t.me/ajmchannel', handle: 'ajmchannel' }
    ]
  },
  pinterest: {
    id: 'pinterest',
    name: 'Pinterest',
    nameAr: 'بينتريست',
    domain: 'pinterest.com',
    placeholder: 'Paste Pinterest Board or User URL (e.g., pinterest.com/archdigest)',
    placeholderAr: 'الصق رابط لوحة أو حساب بينتريست (مثال: pinterest.com/archdigest)',
    brandColor: '#E60023',
    badgeBg: 'bg-rose-50 text-rose-600 border-rose-200',
    badgeText: '#E60023',
    iconName: 'pinterest',
    description: 'Export curated pins, visual moodboards, and design inspirations',
    descriptionAr: 'تصدير المنشورات المصورة ولوحات الإلهام والتصاميم بسهولة',
    sampleUrls: [
      { label: 'Architectural Digest', url: 'https://pinterest.com/archdigest', handle: 'archdigest' },
      { label: 'Vogue', url: 'https://pinterest.com/vogue', handle: 'vogue' }
    ]
  },
  threads: {
    id: 'threads',
    name: 'Threads',
    nameAr: 'ثريدز',
    domain: 'threads.net',
    placeholder: 'Paste Threads profile URL (e.g., threads.net/@zuck)',
    placeholderAr: 'الصق رابط حساب ثريدز (مثال: threads.net/@zuck)',
    brandColor: '#000000',
    badgeBg: 'bg-zinc-100 text-zinc-900 border-zinc-300',
    badgeText: '#000000',
    iconName: 'threads',
    description: 'Follow conversational posts, threads, and updates effortlessly',
    descriptionAr: 'تابع السلاسل النصية والنقاشات الحوارية في ثريدز بسلاسة',
    sampleUrls: [
      { label: 'Mark Zuckerberg', url: 'https://threads.net/@zuck', handle: '@zuck' },
      { label: 'The Economist', url: 'https://threads.net/@theeconomist', handle: '@theeconomist' }
    ]
  },
  mastodon: {
    id: 'mastodon',
    name: 'Mastodon',
    nameAr: 'ماستودون',
    domain: 'mastodon.social',
    placeholder: 'Paste Mastodon user handle or URL (e.g., mastodon.social/@Gargron)',
    placeholderAr: 'الصق حساب أو رابط ماستودون (مثال: mastodon.social/@Gargron)',
    brandColor: '#6364FF',
    badgeBg: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    badgeText: '#6364FF',
    iconName: 'mastodon',
    description: 'Federated social posts with native decentralized feed support',
    descriptionAr: 'منشورات الشبكة اللامركزية المفتوحة مع دعم فوري لبروتوكول RSS',
    sampleUrls: [
      { label: 'Gargron (Founder)', url: 'https://mastodon.social/@Gargron', handle: '@Gargron' }
    ]
  },
  googlenews: {
    id: 'googlenews',
    name: 'Google News',
    nameAr: 'أخبار جوجل',
    domain: 'news.google.com',
    placeholder: 'Paste Topic or Search Keyword (e.g., Artificial Intelligence)',
    placeholderAr: 'الصق موضوع أو كلمة مفتاحية (مثال: الذكاء الاصطناعي)',
    brandColor: '#4285F4',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    badgeText: '#4285F4',
    iconName: 'googlenews',
    description: 'Instant topical feeds from thousands of verified global news outlets',
    descriptionAr: 'خلاصات فورية لأي موضوع إخباري من آلاف الصحف ووكالات الأنباء المعتمدة',
    sampleUrls: [
      { label: 'Artificial Intelligence', url: 'https://news.google.com/search?q=Artificial+Intelligence', handle: 'AI' },
      { label: 'Tech Economy', url: 'https://news.google.com/search?q=Tech+Economy', handle: 'Economy' }
    ]
  },
  medium: {
    id: 'medium',
    name: 'Medium',
    nameAr: 'ميديوم',
    domain: 'medium.com',
    placeholder: 'Paste Medium publication or writer URL (e.g., medium.com/@netflixtechblog)',
    placeholderAr: 'الصق رابط كاتب أو مدونة ميديوم (مثال: medium.com/@netflixtechblog)',
    brandColor: '#242424',
    badgeBg: 'bg-neutral-100 text-neutral-800 border-neutral-300',
    badgeText: '#242424',
    iconName: 'medium',
    description: 'In-depth longform essays, technical blog posts, and thought leadership',
    descriptionAr: 'مقالات تقنية معمقة ورؤى هندسية من أبرز المنشورات التقنية',
    sampleUrls: [
      { label: 'Netflix TechBlog', url: 'https://medium.com/@netflixtechblog', handle: '@netflixtechblog' }
    ]
  }
};
