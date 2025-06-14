/**
 * Nationalities data for the Islamic marriage platform
 * Simulates backend data for nationality selection
 */

export interface Nationality {
  value: string;
  label: string;
  group: string;
}

export const nationalities: Nationality[] = [
  // Gulf Countries
  { value: "سعودي", label: "سعودي/ة", group: "الخليج العربي" },
  { value: "إماراتي", label: "إماراتي/ة", group: "الخليج العربي" },
  { value: "كويتي", label: "كويتي/ة", group: "الخليج العربي" },
  { value: "قطري", label: "قطري/ة", group: "الخليج العربي" },
  { value: "بحريني", label: "بحريني/ة", group: "الخليج العربي" },
  { value: "عماني", label: "عماني/ة", group: "الخليج العربي" },

  // Levant Countries
  { value: "سوري", label: "سوري/ة", group: "بلاد الشام" },
  { value: "لبناني", label: "لبناني/ة", group: "بلاد الشام" },
  { value: "أردني", label: "أردني/ة", group: "بلاد الشام" },
  { value: "فلسطيني", label: "فلسطيني/ة", group: "بلاد الشام" },

  // North African Countries
  { value: "مصري", label: "مصري/ة", group: "شمال أفريقيا" },
  { value: "ليبي", label: "ليبي/ة", group: "شمال أفريقيا" },
  { value: "تونسي", label: "تونسي/ة", group: "شمال أفريقيا" },
  { value: "جزائري", label: "جزائري/ة", group: "شمال أفريقيا" },
  { value: "مغربي", label: "مغربي/ة", group: "شمال أفريقيا" },
  { value: "سوداني", label: "سوداني/ة", group: "شمال أفريقيا" },

  // Other Arab Countries
  { value: "عراقي", label: "عراقي/ة", group: "دول عربية أخرى" },
  { value: "يمني", label: "يمني/ة", group: "دول عربية أخرى" },
  { value: "صومالي", label: "صومالي/ة", group: "دول عربية أخرى" },
  { value: "جيبوتي", label: "جيبوتي/ة", group: "دول عربية أخرى" },
  { value: "موريتاني", label: "موريتاني/ة", group: "دول عربية أخرى" },
  { value: "قمري", label: "قمري/ة", group: "دول عربية أخرى" },

  // Non-Arab Muslim Countries
  { value: "تركي", label: "تركي/ة", group: "دول إسلامية" },
  { value: "إيراني", label: "إيراني/ة", group: "دول إسلامية" },
  { value: "باكستاني", label: "باكستاني/ة", group: "دول إسلامية" },
  { value: "بنغلاديشي", label: "بنغلاديشي/ة", group: "دول إسلامية" },
  { value: "إندونيسي", label: "إندونيسي/ة", group: "دول إسلامية" },
  { value: "ماليزي", label: "ماليزي/ة", group: "دول إسلامية" },
  { value: "أفغاني", label: "أفغاني/ة", group: "دول إسلامية" },

  // Western Countries
  { value: "أمريكي", label: "أمريكي/ة", group: "دول غربية" },
  { value: "كندي", label: "كندي/ة", group: "دول غربية" },
  { value: "بريطاني", label: "بريطاني/ة", group: "دول غربية" },
  { value: "فرنسي", label: "فرنسي/ة", group: "دول غربية" },
  { value: "ألماني", label: "ألماني/ة", group: "دول غربية" },
  { value: "أسترالي", label: "أسترالي/ة", group: "دول غربية" },

  { value: "أخرى", label: "أخرى", group: "دول أخرى" },
];

/**
 * Simulates fetching nationalities from backend
 * In a real app, this would be an API call
 */
export const fetchNationalities = async (): Promise<Nationality[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 350));
  return nationalities;
};

/**
 * Get nationalities grouped by region
 */
export const getNationalitiesByGroup = (): Record<string, Nationality[]> => {
  const grouped: Record<string, Nationality[]> = {};

  nationalities.forEach((nationality) => {
    const group = nationality.group;
    if (!grouped[group]) {
      grouped[group] = [];
    }
    grouped[group].push(nationality);
  });

  return grouped;
};

/**
 * Get nationality by value
 */
export const getNationalityByValue = (
  value: string,
): Nationality | undefined => {
  return nationalities.find((nationality) => nationality.value === value);
};
