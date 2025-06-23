"use client";

import Link from "next/link";
import Image from "next/image";
import { Youtube, Facebook, Music, MessageCircle, Twitter } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo-footer.png"
                alt="الزواج السعيد - شعار منصة الزواج الإسلامية"
                width={40}
                height={48}
                className="h-20 sm:h-20 w-auto"
                priority
                quality={100}
                sizes="(max-width: 768px) 64px, (max-width: 1280px) 80px, 96px"
              />
              <h3 className="text-card-title font-heading sm:mt-4 mt-2 arabic-optimized">
                الزواج السعيد
              </h3>
            </div>
            <p className="text-body text-gray-300 mb-4 max-w-md arabic-optimized text-pretty">
              منصة الزواج الإسلامية الأولى في المنطقة العربية. نساعدك في العثور
              على شريك الحياة المناسب وفق الشريعة الإسلامية مع ضمان الأمان
              والخصوصية.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.youtube.com/@Al-Zawaj"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="يوتيوب"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://www.facebook.com/Al.Zawaj2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="فيسبوك"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@alzawaj.alsaeid"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="تيك توك"
              >
                <Music className="h-5 w-5" />
              </a>
              <a
                href="https://api.whatsapp.com/send/?phone=21695765691&text&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="واتساب"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/Al_Zawaj_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="تويتر"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  حولنا
                </Link>
              </li>
              <li>
                <Link
                  href="/how-we-work"
                  className="text-gray-300 hover:text-white"
                >
                  كيف نعمل
                </Link>
              </li>
              <li>
                <Link
                  href="/tips-guidance"
                  className="text-gray-300 hover:text-white"
                >
                  نصائح وإرشادات
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-privacy"
                  className="text-gray-300 hover:text-white"
                >
                  الشروط والخصوصية
                </Link>
              </li>
              <li>
                <a
                  href="https://alzawajalsaeid.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  الموقع الرئيسي
                </a>
              </li>
            </ul>
          </div>

          {/* Support & Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">الخدمات والدعم</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/auth/register"
                  className="text-gray-300 hover:text-white"
                >
                  إنشاء حساب
                </Link>
              </li>
              <li>
                <Link
                  href="/auth/login"
                  className="text-gray-300 hover:text-white"
                >
                  تسجيل الدخول
                </Link>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send/?phone=21695765691&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  تواصل معنا
                </a>
              </li>
              <li>
                <a
                  href="https://mahmoud-mansy.vercel.app/ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  مطور الموقع
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400">
              © {new Date().getFullYear()} -{" "}
              {new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
                year: "numeric",
                month: "long",
              }).format(new Date())}
              <a
                href="https://alzawajalsaeid.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-gray-300 transition-colors mr-1">
                  {" "}
                  الزواج السعيد
                </span>
              </a>
              . جميع الحقوق محفوظة.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
