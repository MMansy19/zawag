import { Metadata } from "next";
import { PublicLayout } from "@/components/layouts/public-layout";
import { InfoPageLayout } from "@/components/layouts/info-page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Shield,
  Users,
  Star,
  ExternalLink,
  Building2,
  Target,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "حولنا - من نحن ورؤيتنا في الزواج السعيد",
  description:
    "تعرف على رؤيتنا ورسالتنا في تقديم خدمة زواج إسلامية ملتزمة بالشريعة، وكيف نسعى لتكوين مجتمع إسلامي قوي قائم على العفاف والفضيلة.",
  keywords: [
    "حولنا",
    "رؤية الزواج السعيد",
    "الزواج الإسلامي الملتزم",
    "العفاف والاحصان",
    "الزواج الشرعي",
    "القيم الإسلامية",
    "البناء الأسري السليم",
  ],
  openGraph: {
    title: "حولنا - رؤيتنا في الزواج الإسلامي السعيد",
    description:
      "منصة زواج إسلامية ملتزمة بالشريعة تهدف لنشر العفاف والفضيلة في المجتمع الإسلامي.",
    type: "article",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  const values = [
    {
      title: "الالتزام بالشريعة",
      description: "تقديم خدمة متوافقة مع الإسلام وأخلاقه ومبادئه النبيلة",
      icon: Building2,
      color: "bg-green-50 border-green-200",
    },
    {
      title: "العفاف والفضيلة",
      description: "الحرص على العفاف والإعفاف وسد سبل الفتنة والتلاعب",
      icon: Shield,
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "النصيحة والإرشاد",
      description:
        "الأمر بالمعروف والنهي عن المنكر ونشر الثقافة الزوجية السليمة",
      icon: MessageCircle,
      color: "bg-purple-50 border-purple-200",
    },
    {
      title: "البناء الأسري",
      description: "تأسيس زيجات ناجحة وبناء أسري سليم من لبنته الأولى",
      icon: Users,
      color: "bg-orange-50 border-orange-200",
    },
  ];

  const goals = [
    {
      title: "تجنب السلبيات",
      description:
        "تفادي المفاسد الشائعة في مواقع الزواج غير الملتزمة من خلوة واختلاط وفتح ذرائع الإفساد",
      icon: Shield,
    },
    {
      title: "التأثير الإيجابي",
      description:
        "تحقيق تأثير إيجابي طويل الأمد على المجتمعات العربية الإسلامية",
      icon: Target,
    },
    {
      title: "القيادة في الخير",
      description:
        "أن نكون قائدين ونبراساً في هذا الخير مع الالتزام بقيمنا الإسلامية الأصيلة",
      icon: Star,
    },
    {
      title: "خدمة المجتمع",
      description:
        "تحقيق النفع لأهل الصلاح والالتزام وتلبية حاجة المجتمع المسلم للعفاف والإحصان",
      icon: Heart,
    },
  ];

  return (
    <PublicLayout>
      <InfoPageLayout
        title="حولنا"
        subtitle="منصة زواج إسلامية ملتزمة بالشريعة، نسعى لتكوين مجتمع إسلامي قوي قائم على العفاف والفضيلة"
        badgeText="من نحن"
        badgeIcon={Building2}
      >
          {/* Mission Statement */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="border-2 border-blue-100 shadow-lg">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold text-blue-800 mb-2 font-amiri">
                  رسالتنا ورؤيتنا
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-lg leading-relaxed text-gray-700">
                <p>
                  تتمحور أهدافنا حول تقديم خدمة مميزة من خلال تفادي السلبيات
                  والمفاسد الشائعة في مواقع الزواج غير الملتزمة الأخرى قدر
                  المستطاع من خلوة واختلاط وفتح ذرائع الافساد والرذيلة والعون
                  على الفحش والفاحشة. وتقديم خدمة متوافقة مع الاسلام وأخلاقه
                  ومبادؤه النبيلة التي يدعو لها وعلى أساسها الفضيلة و العفاف
                  والاعفاف وسد سبل الفتنة والتلاعب بالأعراض.
                </p>

                <p>
                  بالإضافة لحرصنا على النصيحة في ذلك متى ما اقتضتها الحاجة في
                  التوفيق للزواج و على الأمر بالمعروف والنهي عن المنكر والسعي
                  لنشر أسس الثقافة الزوجية الشرعية السليمة التي تقوم عليها
                  الزيجات الناجحة والبناء الأسري السليم بداية من لَبِنَتهِ
                  الأولى ألا وهي الزواج.
                </p>

                <p>
                  ورؤيتنا هذه نطمح أن تكون باذن الله ذات تأثير ايجابي طويل الأمد
                  على مجتمعاتنا خاصة منها العربية الاسلامية.
                </p>

                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mt-8">
                  <p className="font-semibold text-blue-800 mb-4">
                    باختصار نحن نعتزم أن نكون قائدين ونبراسا في هذا الخير لغيرنا
                    و أن يكون نصب أعيننا دوما الالتزام بقيمنا الاسلامية الراقية
                    الأصيلة وتعاليمه الحكيمة المُحكمة المستمدة من كتاب الله وسنة
                    رسوله عليه الصلاة والسلام.
                  </p>

                  <p className="text-blue-700">
                    جاهدين في ذلك أن نحقق النفع لإخواننا وأخواتنا من أهل الصلاح
                    والالتزام خاصة و أن نلبي حاجتهم و حاجة مجتمعنا المسلم عامّة
                    للعفاف والاحصان سائلين المولى عزوجل التوفيق في ذلك والمعونة
                    والسداد والقبول وأن يجعلنا مفاتيح للخير مغاليق للشر في كل
                    وقت وحين وما توفيقنا الا بالله.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 font-amiri">
                قيمنا ومبادئنا
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                نسعى لتحقيق هذه القيم في كل جانب من جوانب خدمتنا
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className={`${value.color} transition-all duration-300 hover:shadow-lg hover:scale-105`}
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md">
                      <value.icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg font-bold text-gray-800">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Goals Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 font-amiri">
                أهدافنا الرئيسية
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                نسعى لتحقيق هذه الأهداف السامية في خدمة المجتمع الإسلامي
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {goals.map((goal, index) => (
                <Card
                  key={index}
                  className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 space-x-reverse">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <goal.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                          {goal.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {goal.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Reference Link Section */}
          <div className="max-w-2xl mx-auto">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                  <ExternalLink className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 font-amiri">
                  للمزيد من التفاصيل
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  لمعرفة المزيد عن خدماتنا ورؤيتنا الشاملة، يمكنكم زيارة موقعنا
                  الرئيسي
                </p>
                <a
                  href="https://alzawajalsaeid.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 button-secondary text-white hover:text-white font-semibold rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  <ExternalLink className="w-5 h-5 ml-2" />
                  زيارة الموقع الرئيسي
                </a>
                <p className="text-sm text-gray-500 mt-4 font-mono">
                  alzawajalsaeid.com
                </p>
              </CardContent>
            </Card>
          </div>
      </InfoPageLayout>
    </PublicLayout>
  );
}
