"use client";

import Link from "next/link";
import Image from "next/image";
import { Youtube, Facebook, Music, MessageCircle, Twitter } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/logo.png"
                alt="الزواج السعيد - شعار منصة الزواج الإسلامية"
                width={40}
                height={48}
                className="h-10 w-auto"
              />
              <h3 className="text-xl font-bold">الزواج السعيد</h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
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
                  عن المنصة
                </Link>
              </li>
              <li>
                <a
                  href="https://alzawajalsaeid.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  المدونة والمقالات
                </a>
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
                  href="/success-stories"
                  className="text-gray-300 hover:text-white"
                >
                  قصص النجاح
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-white">
                  الأسئلة الشائعة
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">الدعم</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white"
                >
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-300 hover:text-white">
                  المساعدة
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-300 hover:text-white"
                >
                  سياسة الخصوصية
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-privacy"
                  className="text-gray-300 hover:text-white"
                >
                  الشروط والأحكام
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} الزواج السعيد. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
