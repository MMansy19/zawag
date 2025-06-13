// Social Media Configuration for Al-Zawaj Platform

export const SOCIAL_MEDIA_LINKS = {
  youtube: {
    url: "https://www.youtube.com/@Al-Zawaj",
    name: "يوتيوب",
    handle: "@Al-Zawaj",
    description: "مقاطع تعليمية ونصائح للزواج الإسلامي"
  },
  facebook: {
    url: "https://www.facebook.com/Al.Zawaj2",
    name: "فيسبوك", 
    handle: "Al.Zawaj2",
    description: "تابعنا للحصول على التحديثات"
  },
  tiktok: {
    url: "https://www.tiktok.com/@alzawaj.alsaeid",
    name: "تيك توك",
    handle: "@alzawaj.alsaeid", 
    description: "محتوى قصير ومفيد"
  },
  twitter: {
    url: "https://x.com/Al_Zawaj_",
    name: "تويتر",
    handle: "@Al_Zawaj_",
    description: "آخر الأخبار والتحديثات"
  },
  whatsapp: {
    url: "https://api.whatsapp.com/send/?phone=21695765691&text&type=phone_number&app_absent=0",
    name: "واتساب",
    phone: "21695765691",
    description: "تواصل مباشر"
  },
  website: {
    url: "https://alzawajalsaeid.com/",
    name: "الموقع الرسمي",
    description: "المدونة والمقالات والمزيد"
  }
} as const;

// Array format for easy iteration
export const SOCIAL_MEDIA_ARRAY = [
  SOCIAL_MEDIA_LINKS.youtube,
  SOCIAL_MEDIA_LINKS.facebook,
  SOCIAL_MEDIA_LINKS.tiktok,
  SOCIAL_MEDIA_LINKS.twitter,
  SOCIAL_MEDIA_LINKS.whatsapp
];

// URLs only for structured data
export const SOCIAL_MEDIA_URLS = [
  SOCIAL_MEDIA_LINKS.facebook.url,
  SOCIAL_MEDIA_LINKS.youtube.url,
  SOCIAL_MEDIA_LINKS.tiktok.url,
  SOCIAL_MEDIA_LINKS.twitter.url,
  SOCIAL_MEDIA_LINKS.website.url
];

// Contact information
export const CONTACT_INFO = {
  email: "info@alzawajalsaeid.com",
  phone: "21695765691",
  whatsapp: SOCIAL_MEDIA_LINKS.whatsapp.url,
  website: SOCIAL_MEDIA_LINKS.website.url
} as const;
