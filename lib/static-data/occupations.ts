/**
 * Occupations data for the Islamic marriage platform
 * Simulates backend data for occupation selection
 */

export interface Occupation {
  value: string;
  label: string;
  category: string;
}

export const occupations: Occupation[] = [
  // Medical & Healthcare
  { value: "طبيب", label: "طبيب", category: "الطب والرعاية الصحية" },
  { value: "ممرض", label: "ممرض/ممرضة", category: "الطب والرعاية الصحية" },
  { value: "صيدلي", label: "صيدلي", category: "الطب والرعاية الصحية" },
  {
    value: "طبيب أسنان",
    label: "طبيب أسنان",
    category: "الطب والرعاية الصحية",
  },

  // Engineering & Technology
  { value: "مهندس", label: "مهندس", category: "الهندسة والتكنولوجيا" },
  {
    value: "مطور برمجيات",
    label: "مطور برمجيات",
    category: "الهندسة والتكنولوجيا",
  },
  { value: "مبرمج", label: "مبرمج", category: "الهندسة والتكنولوجيا" },
  {
    value: "محلل أنظمة",
    label: "محلل أنظمة",
    category: "الهندسة والتكنولوجيا",
  },

  // Education
  { value: "معلم", label: "معلم/معلمة", category: "التعليم" },
  { value: "أستاذ جامعي", label: "أستاذ جامعي", category: "التعليم" },
  { value: "مدير مدرسة", label: "مدير مدرسة", category: "التعليم" },

  // Business & Finance
  { value: "محاسب", label: "محاسب", category: "الأعمال والمالية" },
  { value: "مدير", label: "مدير", category: "الأعمال والمالية" },
  { value: "موظف بنك", label: "موظف بنك", category: "الأعمال والمالية" },
  { value: "مستشار مالي", label: "مستشار مالي", category: "الأعمال والمالية" },
  { value: "رجل أعمال", label: "رجل أعمال", category: "الأعمال والمالية" },

  // Legal & Government
  { value: "محامي", label: "محامي", category: "القانون والحكومة" },
  { value: "قاضي", label: "قاضي", category: "القانون والحكومة" },
  { value: "موظف حكومي", label: "موظف حكومي", category: "القانون والحكومة" },

  // Religious & Social
  { value: "إمام", label: "إمام", category: "الدين والمجتمع" },
  { value: "معلم قرآن", label: "معلم/ة قرآن", category: "الدين والمجتمع" },
  { value: "داعية", label: "داعية", category: "الدين والمجتمع" },
  {
    value: "أخصائي اجتماعي",
    label: "أخصائي اجتماعي",
    category: "الدين والمجتمع",
  },

  // Other Professions
  { value: "طيار", label: "طيار", category: "مهن أخرى" },
  { value: "عسكري", label: "عسكري", category: "مهن أخرى" },
  { value: "فني", label: "فني", category: "مهن أخرى" },
  { value: "تاجر", label: "تاجر", category: "مهن أخرى" },
  { value: "طالب", label: "طالب/ة", category: "مهن أخرى" },
  { value: "ربة منزل", label: "ربة منزل", category: "مهن أخرى" },
  { value: "متقاعد", label: "متقاعد/ة", category: "مهن أخرى" },
  { value: "باحث عن عمل", label: "باحث عن عمل", category: "مهن أخرى" },
  { value: "أخرى", label: "أخرى", category: "مهن أخرى" },
];

/**
 * Simulates fetching occupations from backend
 * In a real app, this would be an API call
 */
export const fetchOccupations = async (): Promise<Occupation[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return occupations;
};

/**
 * Get occupations grouped by category
 */
export const getOccupationsByCategory = (): Record<string, Occupation[]> => {
  const grouped: Record<string, Occupation[]> = {};

  occupations.forEach((occupation) => {
    const category = occupation.category;
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(occupation);
  });

  return grouped;
};

/**
 * Get occupation by value
 */
export const getOccupationByValue = (value: string): Occupation | undefined => {
  return occupations.find((occupation) => occupation.value === value);
};
