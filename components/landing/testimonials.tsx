"use client";

export function LandingTestimonials() {
  const testimonials = [
    {
      name: "أحمد محمد",
      location: "الرياض، السعودية",
      text: "وجدت زوجتي عبر هذه المنصة الرائعة. كانت التجربة آمنة ومريحة، والفريق متعاون جداً. أنصح بها بشدة.",
      rating: 5,
    },
    {
      name: "فاطمة علي",
      location: "القاهرة، مصر",
      text: "منصة محترمة تراعي القيم الإسلامية. البحث سهل والخصوصية مضمونة. تمكنت من العثور على شريك مناسب.",
      rating: 5,
    },
    {
      name: "خالد حسن",
      location: "دبي، الإمارات",
      text: "خدمة ممتازة ودعم فني رائع. المنصة سهلة الاستخدام والملفات الشخصية محدثة ومراجعة.",
      rating: 5,
    },
    {
      name: "عائشة سالم",
      location: "عمّان، الأردن",
      text: "تجربة إيجابية جداً. الموقع يحترم التقاليد ويوفر بيئة آمنة للتعارف المشروع.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-section-title font-heading text-text mb-4 arabic-optimized">
            آراء أعضائنا
          </h2>
          <p className="text-body-large text-text-secondary max-w-2xl mx-auto arabic-optimized text-pretty">
            اقرأ تجارب حقيقية لأعضاء نجحوا في العثور على شريك الحياة عبر منصتنا
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg border border-border"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-semibold font-display">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="mr-4">
                  <h4 className="text-arabic-name font-medium text-text arabic-optimized">
                    {testimonial.name}
                  </h4>
                  <p className="text-body-small text-text-secondary arabic-optimized">
                    {testimonial.location}
                  </p>
                </div>
                <div className="mr-auto flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-profile-intro text-text-secondary leading-relaxed italic arabic-optimized">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
