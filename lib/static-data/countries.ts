/**
 * Countries data for the Islamic marriage platform
 * Simulates backend data for country selection
 */

export interface Country {
  value: string;
  label: string;
  group?: string;
}

export const countries: Country[] = [
  // Gulf Countries
  {
    value: "السعودية",
    label: "المملكة العربية السعودية",
    group: "الخليج العربي",
  },
  {
    value: "الإمارات",
    label: "دولة الإمارات العربية المتحدة",
    group: "الخليج العربي",
  },
  { value: "الكويت", label: "دولة الكويت", group: "الخليج العربي" },
  { value: "قطر", label: "دولة قطر", group: "الخليج العربي" },
  { value: "البحرين", label: "مملكة البحرين", group: "الخليج العربي" },
  { value: "عمان", label: "سلطنة عُمان", group: "الخليج العربي" },

  // Levant Countries
  { value: "سوريا", label: "الجمهورية العربية السورية", group: "بلاد الشام" },
  { value: "لبنان", label: "الجمهورية اللبنانية", group: "بلاد الشام" },
  { value: "الأردن", label: "المملكة الأردنية الهاشمية", group: "بلاد الشام" },
  { value: "فلسطين", label: "دولة فلسطين", group: "بلاد الشام" },

  // North African Countries
  { value: "مصر", label: "جمهورية مصر العربية", group: "شمال أفريقيا" },
  { value: "ليبيا", label: "دولة ليبيا", group: "شمال أفريقيا" },
  { value: "تونس", label: "الجمهورية التونسية", group: "شمال أفريقيا" },
  {
    value: "الجزائر",
    label: "الجمهورية الجزائرية الديمقراطية الشعبية",
    group: "شمال أفريقيا",
  },
  { value: "المغرب", label: "المملكة المغربية", group: "شمال أفريقيا" },
  { value: "السودان", label: "جمهورية السودان", group: "شمال أفريقيا" },

  // Other Arab Countries
  { value: "العراق", label: "جمهورية العراق", group: "دول عربية أخرى" },
  { value: "اليمن", label: "الجمهورية اليمنية", group: "دول عربية أخرى" },
  { value: "الصومال", label: "جمهورية الصومال", group: "دول عربية أخرى" },
  { value: "جيبوتي", label: "جمهورية جيبوتي", group: "دول عربية أخرى" },
  {
    value: "موريتانيا",
    label: "الجمهورية الإسلامية الموريتانية",
    group: "دول عربية أخرى",
  },
  { value: "جزر القمر", label: "الاتحاد القمري", group: "دول عربية أخرى" },

  // Countries with significant Arab populations
  { value: "تشاد", label: "جمهورية تشاد", group: "دول أخرى" },
  { value: "إريتريا", label: "دولة إريتريا", group: "دول أخرى" },

  // Non-Arab Muslim Countries
  { value: "تركيا", label: "جمهورية تركيا", group: "دول إسلامية" },
  { value: "إيران", label: "جمهورية إيران الإسلامية", group: "دول إسلامية" },
  {
    value: "باكستان",
    label: "جمهورية باكستان الإسلامية",
    group: "دول إسلامية",
  },
  {
    value: "بنغلاديش",
    label: "جمهورية بنغلاديش الشعبية",
    group: "دول إسلامية",
  },
  { value: "إندونيسيا", label: "جمهورية إندونيسيا", group: "دول إسلامية" },
  { value: "ماليزيا", label: "ماليزيا", group: "دول إسلامية" },
  {
    value: "أفغانستان",
    label: "جمهورية أفغانستان الإسلامية",
    group: "دول إسلامية",
  },

  // Western Countries with Muslim populations
  {
    value: "الولايات المتحدة",
    label: "الولايات المتحدة الأمريكية",
    group: "دول غربية",
  },
  { value: "كندا", label: "كندا", group: "دول غربية" },
  { value: "بريطانيا", label: "المملكة المتحدة", group: "دول غربية" },
  { value: "فرنسا", label: "الجمهورية الفرنسية", group: "دول غربية" },
  { value: "ألمانيا", label: "جمهورية ألمانيا الاتحادية", group: "دول غربية" },
  { value: "أستراليا", label: "أستراليا", group: "دول غربية" },
];

/**
 * Simulates fetching countries from backend
 * In a real app, this would be an API call
 */
export const fetchCountries = async (): Promise<Country[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return countries;
};

/**
 * Get countries grouped by region
 */
export const getCountriesByGroup = (): Record<string, Country[]> => {
  const grouped: Record<string, Country[]> = {};

  countries.forEach((country) => {
    const group = country.group || "أخرى";
    if (!grouped[group]) {
      grouped[group] = [];
    }
    grouped[group].push(country);
  });

  return grouped;
};
