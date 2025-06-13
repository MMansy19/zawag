"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Youtube,
  Facebook,
  Music,
  MessageCircle,
  Twitter,
  Star,
} from "lucide-react";

export function LandingSocial() {
  const socialLinks = [
    {
      name: "يوتيوب",
      icon: Youtube,
      url: "#",
      color: "bg-red-50 border-red-200 text-red-700 hover:bg-red-100",
      description: "مقاطع تعليمية ونصائح للزواج الإسلامي",
    },
    {
      name: "فيسبوك",
      icon: Facebook,
      url: "#",
      color: "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100",
      description: "تابعنا للحصول على التحديثات",
    },
    {
      name: "تيك توك",
      icon: Music,
      url: "#",
      color:
        "bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100",
      description: "محتوى قصير ومفيد",
    },
    {
      name: "واتساب",
      icon: MessageCircle,
      url: "https://wa.me/+21695765691",
      color: "bg-green-50 border-green-200 text-green-700 hover:bg-green-100",
      description: "تواصل مباشر",
    },
    {
      name: "تويتر",
      icon: Twitter,
      url: "#",
      color: "bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100",
      description: "آخر الأخبار والتحديثات",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">تابعنا</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            تابعونا على وسائل التواصل الاجتماعي حيث ننشر نصائح مفيدة ومقاطع
            دعوية نافعة
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {socialLinks.map((social, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block text-center p-4 rounded-lg border-2 transition-all duration-300 ${social.color}`}
                >
                  <div className="mb-3">
                    <social.icon className="h-10 w-10 mx-auto" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{social.name}</h3>
                  <p className="text-sm opacity-80">{social.description}</p>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>{" "}
        <div className="text-center mt-12">
          <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-md">
            <Star className="h-6 w-6 mr-2 text-yellow-500" />
            <span className="text-gray-700 font-medium">
              انضم إلى مجتمعنا المتنامي من المسلمين الباحثين عن الزواج الحلال
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
