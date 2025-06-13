"use client";

export function LandingStats() {
  const stats = [
    {
      number: "1000+",
      label: "عضو مسجل",
      description: "أعضاء موثقون ومراجعون",
    },
    {
      number: "200+",
      label: "زواج ناجح",
      description: "قصص نجاح حقيقية",
    },
    {
      number: "95%",
      label: "رضا المستخدمين",
      description: "تقييم إيجابي من أعضائنا",
    },
    {
      number: "24/7",
      label: "دعم فني",
      description: "متاح في جميع الأوقات",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            أرقام تتحدث عن نجاحنا
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            ثقة الآلاف من المستخدمين ونجاحات حقيقية في إتمام الزيجات المباركة
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-text mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-text-secondary">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
