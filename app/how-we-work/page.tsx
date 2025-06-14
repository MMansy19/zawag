import { Metadata } from "next";
import { PublicLayout } from "@/components/layouts/public-layout";
import { InfoPageLayout } from "@/components/layouts/info-page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Users,
  Heart,
  Shield,
  MessageCircle,
  UserCheck,
  BookOpen,
  Phone,
  Mail,
  AlertTriangle,
  Info,
  Cog,
} from "lucide-react";

export const metadata: Metadata = {
  title: "كيف نعمل - طريقة عمل منصة الزواج السعيد",
  description:
    "تعرف على طريقة عملنا في تيسير الزواج الحلال وفقاً للضوابط الشرعية. خطوات واضحة وآمنة للبحث عن شريك الحياة المناسب.",
  keywords: [
    "كيف نعمل",
    "طريقة عمل الزواج السعيد",
    "خطوات الزواج الإسلامي",
    "الزواج وفق الشريعة",
    "ضوابط الزواج الحلال",
    "آلية عمل موقع الزواج",
  ],
  openGraph: {
    title: "كيف نعمل - طريقة عمل منصة الزواج السعيد",
    description:
      "خطوات واضحة وآمنة للبحث عن شريك الحياة وفق الشريعة الإسلامية.",
    type: "article",
  },
  alternates: {
    canonical: "/how-we-work",
  },
};

export default function HowWeWorkPage() {
  const steps = [
    {
      number: 1,
      title: "تصفّح الموقع وفهم طريقة عمله جيدًا",
      description:
        "قبل أي خطوة، نرجو من كل من الأخ أو الأخت تصفّح الموقع جيدًا وقراءة الأقسام المهمة: الشروط، طريقة العمل، السياسات، المميزات… إلخ.",
      icon: BookOpen,
      color: "bg-blue-50 border-blue-200",
    },
    {
      number: 2,
      title: "استشارة الأهل وأخذ موافقتهم",
      description:
        "بعد الاطلاع الكامل على الموقع وفهم طريقة عمله، ننصح بشدة أن تستشير الأخت أو الأخ أهلهم، وتطلب منهم رأيهم وموافقتهم على التقديم.",
      icon: Users,
      color: "bg-green-50 border-green-200",
    },
    {
      number: 3,
      title: "صلاة الاستخارة",
      description:
        "بعد استشارة الأهل وموافقتهم، ننصح بأداء صلاة الاستخارة قبل تعبئة الاستمارة. فطلب التوفيق من الله مهم جدًا في بداية الطريق.",
      icon: Heart,
      color: "bg-purple-50 border-purple-200",
    },
    {
      number: 4,
      title: "تعبئة الاستمارة",
      description:
        'بعد الخطوات السابقة، إن قرر الأخ أو الأخت التقديم، يدخل إلى صفحة "تقديم الطلب" ويقوم بتعبئتها بدقة وصدق وبدون استعجال.',
      icon: UserCheck,
      color: "bg-orange-50 border-orange-200",
    },
    {
      number: 5,
      title: "مراجعة الطلب",
      description:
        'بعد الضغط على زر "تأكيد"، تصلنا الاستمارة. نقوم خلال 48 ساعة بمراجعتها والتأكد من مطابقتها لشروط الموقع.',
      icon: CheckCircle,
      color: "bg-teal-50 border-teal-200",
    },
    {
      number: 6,
      title: "الاطلاع على ملفك بعد القبول",
      description:
        "بعد قبول الطلب، تصلك رسالة فيها رابط ملفك على الموقع وكلمة المرور الخاصة للدخول إلى قسم طلبات الزواج.",
      icon: Mail,
      color: "bg-indigo-50 border-indigo-200",
    },
  ];

  const privacyPolicies = [
    {
      title: "بالنسبة للأخ",
      description:
        "نقوم بحذف بيانات الاتصال (البريد والواتساب) من ملفه عند النشر، وتبقى فقط عند الإدارة لاستخدامها في المتابعة.",
    },
    {
      title: "بالنسبة للأخت",
      description:
        "نقوم بحذف البريد ورقمها الشخصي، ولا يظهر للزوار. فقط وسيلة التواصل الخاصة بولي أمرها أو قريبها يُعرض في الملف، ويكون ظاهرًا فقط للمتقدمين المسجلين في الموقع والمقبولين.",
    },
  ];

  const importantNotes = [
    {
      title: "وسيلة تواصل المسؤول عن الطلب",
      content:
        "في خانة وسيلة تواصل المسؤول عن الطلب في استمارة التقديم يمكن للمتقدّمة إدخال وسيلة تواصل خاصة بأحد محارمها من الرجال، مثل: الأب، الأخ، العم، الخال، الجد، الابن، أو أحد أبناء الإخوة.",
      type: "info",
    },
    {
      title: "التقديم نيابة عن الغير",
      content:
        "يمكن لأي قريب أو قريبة، مثل: الأب، الأم، الأخ، الأخت، أحد الأقارب أو الصديقات، التقدّم بطلب التقديم نيابةً عن المتقدّم أو المتقدّمة، ولكن يُفضّل أخذ إذن صاحب الطلب وموافقته قبل ذلك.",
      type: "info",
    },
    {
      title: "الالتزام بالضوابط الشرعية",
      content:
        "يُمنع وضع وسيلة تواصل خاصة بالمتقدّمة أو وسيلة تواصل أي امرأة في خانة وسيلة تواصل المسؤول، لأن التواصل يتم من قِبل رجال، ويجب أن يكون المتابع للطلبات هو ولي أمر المتقدّمة أو أحد محارمها من الرجال.",
      type: "warning",
    },
    {
      title: "التحقق من صحة المعلومات",
      content:
        "من الضروري قبل الخطبة أن يسأل كل طرف عن الطرف الآخر من معارفه أو أصدقائه أو جيرانه، ويتأكد من صحة المعلومات المذكورة في الملف.",
      type: "warning",
    },
  ];

  return (
    <PublicLayout>
      <InfoPageLayout
        title="كيف نعمل"
        subtitle="نحن نسعى جاهدين لتيسير عملية زواجكم من خلال دمج الأساليب التقليدية مع التقنيات الحديثة"
        badgeText="طريقة العمل"
        badgeIcon={Cog}
      >
        <div className="max-w-4xl mx-auto">
          {/* Main Steps */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 font-amiri">
              الخطوات التي نتبعها
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {steps.map((step) => (
                <Card
                  key={step.number}
                  className={`${step.color} hover:shadow-lg transition-shadow duration-300`}
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md">
                      <step.icon className="w-8 h-8 text-gray-700" />
                    </div>
                    <Badge variant="secondary" className="w-fit mx-auto mb-2 text-white">
                      الخطوة {step.number}
                    </Badge>
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          {/* Additional Steps */}
          <div className="grid gap-8 md:grid-cols-2 mb-16">
            {/* Privacy Policy */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Shield className="w-6 h-6 text-blue-600" />
                  سياسة الخصوصية في عرض الملفات
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {privacyPolicies.map((policy, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {policy.title}
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {policy.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Communication Rules */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                  قواعد التواصل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    التصفح فقط وليس التواصل
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>
                      • الإخوة فقط يمكنهم التواصل واختيار من يرغبون من الأخوات
                    </li>
                    <li>• الأخوات لا يمكنهن التواصل مع الإخوة</li>
                    <li>
                      • معلومات الاتصال الخاصة بالإخوة لا تُعرض في ملفاتهم
                    </li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    كيفية التواصل
                  </h4>
                  <p className="text-sm text-gray-700">
                    يجد الأخ في ملف الأخت رقم ولي أمرها أو قريبها مع توضيح من هو
                    بالضبط، ويرسل رسالة محترمة يعرّف فيها بنفسه ويضع رقم طلبه
                    ورابط ملفه.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Process Steps */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-center">
                  التواصل في حال وجود أسئلة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 leading-relaxed">
                  إن أراد أحد الطرفين طرح أسئلة أو الاستفسار أكثر، يتم التواصل
                  فقط عن طريق ولي الأمر أو القريب، ويستمر هو في التوسط في كل
                  الحديث، ولا يُسمح بتواصل مباشر بين الأخ والأخت.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-center">
                  التنسيق للرؤية الشرعية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 leading-relaxed">
                  إذا حصل توافق مبدئي، يتم التنسيق مع ولي الأمر أو القريب لتحديد
                  موعد ومكان الرؤية الشرعية، وغالبًا تكون في بيت الأخت، وبحضور
                  أحد محارمها.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-center">
                  حذف الملف بعد الخطبة أو الزواج
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 leading-relaxed">
                  إذا تم الاتفاق على الخطبة أو الزواج، نرجو من الطرفين التواصل
                  معنا لحذف ملفاتهم من الموقع، وذلك لإفساح المجال لغيرهم، وحتى
                  لا تُعرض ملفاتهم بعد الارتباط.
                </p>
              </CardContent>
            </Card>
          </div>
          {/* Important Notes */}
          <Card className="bg-white shadow-lg mb-16">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Info className="w-7 h-7 text-yellow-600" />
                💡 ملاحظات ونصائح مهمة جدًا
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {importantNotes.map((note, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    note.type === "warning"
                      ? "bg-red-50 border-red-400"
                      : "bg-blue-50 border-blue-400"
                  }`}
                >
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    {note.type === "warning" ? (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    ) : (
                      <Info className="w-5 h-5 text-blue-600" />
                    )}
                    {note.title}
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {note.content}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
          {/* Contact Information */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-center">
                <Phone className="w-6 h-6 text-green-600" />
                تواصل معنا
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-700 mb-4">
                في حال واجهتك أي مشكلة أو كان لديك استفسار، لا تتردد في التواصل
                معنا
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Badge variant="outline" className="p-2 bg-white">
                  واتساب: 0021695765691
                </Badge>
                <p className="text-sm text-gray-600">
                  نحن هنا لمساعدتك في رحلة البحث عن شريك الحياة المناسب
                </p>
              </div>
            </CardContent>
          </Card>
          {/* Final Note */}
          <div className="text-center mt-12 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              🤲 دعواتنا لكم بالتوفيق
            </h3>
            <p className="text-gray-700 leading-relaxed">
              نسأل الله العظيم أن ييسر لكم الزواج الصالح، وأن يبارك لكم فيما
              اختاره لكم، وأن يجعل زواجكم عونًا لكم على طاعة الله وعبادته. آمين
              يا رب العالمين.
            </p>
          </div>
          {/* Process Flow Diagram */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              مسار العملية
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">البحث والفهم</h3>
                <p className="text-sm text-gray-600">
                  تصفح الموقع وفهم طريقة العمل
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">الاستشارة</h3>
                <p className="text-sm text-gray-600">
                  استشارة الأهل وأخذ موافقتهم
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Heart className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">الاستخارة</h3>
                <p className="text-sm text-gray-600">
                  صلاة الاستخارة وطلب التوفيق
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <UserCheck className="w-10 h-10 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">التقديم</h3>
                <p className="text-sm text-gray-600">
                  تعبئة الاستمارة والتقديم
                </p>
              </div>
            </div>
          </div>
          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
              الأسئلة الشائعة
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">
                    ماذا لو لم تصلني رسالة خلال 48 ساعة؟
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    إذا مرّت 48 ساعة ولم تصلك رسالة، فهذا يعني أحد أمرين: إما
                    أنك لم ترسل الطلب بشكل صحيح، أو أنك أدخلت بريدًا إلكترونيًا
                    خاطئًا. في هذه الحالة، تواصل معنا على واتساب: 0021695765691
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">
                    هل يمكنني تعديل معلوماتي بعد القبول؟
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    لا يمكنك التعديل بنفسك مباشرة، لذلك نرجو الحرص من البداية
                    على دقة المعلومات. إن رغبت في تعديل أي شيء، أخبرنا ونحن
                    نعدّله لك.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">كيف أحمي خصوصيتي؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    نحن نحذف بيانات الاتصال الشخصية من الملفات المعروضة. بالنسبة
                    للأخوات، فقط وسيلة التواصل الخاصة بولي الأمر تظهر للمتقدمين
                    المسجلين والمقبولين فقط.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">
                    ماذا بعد الموافقة المبدئية؟
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">
                    بعد الموافقة المبدئية، يتم التنسيق للرؤية الشرعية عن طريق
                    ولي الأمر. كما يُنصح بالسؤال والاستفسار عن الطرف الآخر
                    للتأكد من صحة المعلومات.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
          {/* Guidelines Section */}
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg mb-16">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <AlertTriangle className="w-7 h-7 text-orange-600" />
                إرشادات مهمة للنجاح
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900">
                    للإخوة المتقدمين
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>اقرأ الملف بعناية قبل التواصل</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>تأكد من التكافؤ في العمر والظروف</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>احترم شروط الأخت المذكورة في الملف</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>أرسل رابط ملفك مع رسالة التواصل</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900">
                    للأخوات المتقدمات
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>خذي موافقة ولي الأمر قبل التقديم</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>تأكدي من صحة بيانات الاتصال</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>اكتبي شروطك بوضوح في الاستمارة</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>لا تضعي بياناتك الشخصية في خانة المسؤول</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Safety Tips */}
          <Card className="bg-red-50 border-red-200 shadow-lg mb-16">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl text-red-800">
                <Shield className="w-6 h-6" />
                تحذيرات مهمة للأمان
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-800 mb-1">
                        لا تحوّل أموال
                      </h4>
                      <p className="text-sm text-red-700">
                        يُمنع تماماً إرسال أي مبلغ مالي لأي شخص قبل عقد الزواج
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-800 mb-1">
                        احذر من المحتالين
                      </h4>
                      <p className="text-sm text-red-700">
                        بعض الأشخاص قد يسجلون بنوايا غير سليمة للسفر أو الحصول
                        على جنسية
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-800 mb-1">
                        تحقق من المعلومات
                      </h4>
                      <p className="text-sm text-red-700">
                        اسأل عن الطرف الآخر من معارفك قبل اتخاذ أي قرار
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-800 mb-1">
                        أبلغ عن المخالفات
                      </h4>
                      <p className="text-sm text-red-700">
                        أبلغنا فوراً عن أي إزعاج أو تواصل غير لائق
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </InfoPageLayout>
    </PublicLayout>
  );
}
