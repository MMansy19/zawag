import { Metadata } from "next";
import { CommonFAQ } from "@/components/common/faq";
import { allTipsGuidanceFaqData } from "@/lib/constants/faq-data";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "نصائح وتوجيهات | موقع الزواج الإسلامي",
  description:
    "إجابات شاملة لأهم الأسئلة المتعلقة بالزواج الإسلامي، مُستندين إلى القرآن الكريم والسنة النبوية الشريفة",
  keywords:
    "نصائح الزواج الإسلامي, توجيهات الزواج, الزواج في الإسلام, فتاوى الزواج, أحكام الزواج",
};

export default function TipsGuidancePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-primary/5 to-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              نصائح وتوجيهات
            </h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                نسعى في هذه الصفحة إلى تقديم إجابات شاملة لأهم الأسئلة المتعلقة
                بالزواج الإسلامي، مُستندين إلى القرآن الكريم والسنة النبوية
                الشريفة. كما نحرص على نشر نصائح وإرشادات هادفة مُستمدة من تعاليم
                الإسلام من خلال منصات التواصل الاجتماعي الخاصة بنا.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                نتمنى أن تساهم هذه المعلومات في توعية الراغبين في الزواج بأهميته
                وأهدافه السامية في الإسلام، ونسعى جاهدين لتقديم المزيد من الدعم
                والإرشاد لبناء حياة زوجية سعيدة مُستَنِدَةٍ إلى تعاليم الإسلام
                تُسعدكم في الدنيا والآخرة.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  لا تترددوا في تصفح الأسئلة أدناه، وإذا كان لديكم أي سؤال لم
                  يتم الإجابة عليه، فلا تترددوا في الاتصال بنا للحصول على
                  المساعدة. يسعدنا تقديم معلومات عامة حول الزواج من منظور شرعي،
                  ونشجعك على طرح أي أسئلة لديك دون تردد.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  <strong>
                    مع ذلك، نودّ التأكيد على أننا لا نستطيع تقديم فتاوى دينية
                    مُلزمة أو إجابات مُحددة على جميع الأسئلة.
                  </strong>{" "}
                  في حال رغبتك باستشارة مُتخصصة، مثل مفتٍ أو مُختصٍّ في الشأن
                  الشرعي، يُمكننا مساعدتك في العثور على الجهة المُناسبة للحصول
                  على المساعدة المُلائمة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <CommonFAQ
        faqs={allTipsGuidanceFaqData}
        title="الأسئلة والأجوبة الشرعية"
        subtitle="إجابات شاملة مُستندة إلى القرآن الكريم والسنة النبوية الشريفة"
        helperText="يرجى النقر على السؤال لتظهر لك الإجابة."
        initialDisplayCount={5}
        showToggle={true}
        showContactButton={true}
        contactButtonText="تواصل معنا للمزيد من المساعدة"
        contactButtonHref="/contact"
        contactButtonIcon={<Mail className="w-5 h-5" />}
        className="bg-white"
      />
    </div>
  );
}
