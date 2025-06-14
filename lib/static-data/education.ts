/**
 * Education levels data for the Islamic marriage platform
 * Simulates backend data for education selection
 */

export interface EducationLevel {
  value: string;
  label: string;
  order: number;
}

export const educationLevels: EducationLevel[] = [
  { value: "أقل من الثانوية", label: "أقل من الثانوية العامة", order: 1 },
  { value: "الثانوية العامة", label: "الثانوية العامة", order: 2 },
  { value: "دبلوم", label: "دبلوم متوسط", order: 3 },
  { value: "بكالوريوس", label: "بكالوريوس", order: 4 },
  { value: "ماجستير", label: "ماجستير", order: 5 },
  { value: "دكتوراه", label: "دكتوراه", order: 6 },
  { value: "دراسات شرعية", label: "دراسات شرعية", order: 7 },
  { value: "حفظ القرآن", label: "حافظ/ة للقرآن الكريم", order: 8 },
];

/**
 * Simulates fetching education levels from backend
 * In a real app, this would be an API call
 */
export const fetchEducationLevels = async (): Promise<EducationLevel[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return educationLevels.sort((a, b) => a.order - b.order);
};

/**
 * Get education level by value
 */
export const getEducationLevelByValue = (
  value: string,
): EducationLevel | undefined => {
  return educationLevels.find((level) => level.value === value);
};
