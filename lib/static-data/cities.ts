/**
 * Cities data for the Islamic marriage platform
 * Simulates backend data for city selection
 */

export interface City {
  value: string;
  label: string;
  country: string;
  countryLabel: string;
}

export const cities: City[] = [
  // Saudi Cities
  {
    value: "الرياض",
    label: "الرياض",
    country: "السعودية",
    countryLabel: "السعودية",
  },
  { value: "جدة", label: "جدة", country: "السعودية", countryLabel: "السعودية" },
  {
    value: "مكة المكرمة",
    label: "مكة المكرمة",
    country: "السعودية",
    countryLabel: "السعودية",
  },
  {
    value: "المدينة المنورة",
    label: "المدينة المنورة",
    country: "السعودية",
    countryLabel: "السعودية",
  },
  {
    value: "الدمام",
    label: "الدمام",
    country: "السعودية",
    countryLabel: "السعودية",
  },
  {
    value: "الخبر",
    label: "الخبر",
    country: "السعودية",
    countryLabel: "السعودية",
  },
  {
    value: "تبوك",
    label: "تبوك",
    country: "السعودية",
    countryLabel: "السعودية",
  },
  {
    value: "بريدة",
    label: "بريدة",
    country: "السعودية",
    countryLabel: "السعودية",
  },
  {
    value: "خميس مشيط",
    label: "خميس مشيط",
    country: "السعودية",
    countryLabel: "السعودية",
  },
  {
    value: "حائل",
    label: "حائل",
    country: "السعودية",
    countryLabel: "السعودية",
  },

  // UAE Cities
  { value: "دبي", label: "دبي", country: "الإمارات", countryLabel: "الإمارات" },
  {
    value: "أبوظبي",
    label: "أبوظبي",
    country: "الإمارات",
    countryLabel: "الإمارات",
  },
  {
    value: "الشارقة",
    label: "الشارقة",
    country: "الإمارات",
    countryLabel: "الإمارات",
  },
  {
    value: "عجمان",
    label: "عجمان",
    country: "الإمارات",
    countryLabel: "الإمارات",
  },
  {
    value: "الفجيرة",
    label: "الفجيرة",
    country: "الإمارات",
    countryLabel: "الإمارات",
  },
  {
    value: "رأس الخيمة",
    label: "رأس الخيمة",
    country: "الإمارات",
    countryLabel: "الإمارات",
  },
  {
    value: "أم القيوين",
    label: "أم القيوين",
    country: "الإمارات",
    countryLabel: "الإمارات",
  },

  // Egyptian Cities
  { value: "القاهرة", label: "القاهرة", country: "مصر", countryLabel: "مصر" },
  {
    value: "الإسكندرية",
    label: "الإسكندرية",
    country: "مصر",
    countryLabel: "مصر",
  },
  { value: "الجيزة", label: "الجيزة", country: "مصر", countryLabel: "مصر" },
  { value: "الأقصر", label: "الأقصر", country: "مصر", countryLabel: "مصر" },
  { value: "أسوان", label: "أسوان", country: "مصر", countryLabel: "مصر" },
  { value: "المنصورة", label: "المنصورة", country: "مصر", countryLabel: "مصر" },
  { value: "طنطا", label: "طنطا", country: "مصر", countryLabel: "مصر" },

  // Other Major Arab Cities
  { value: "عمان", label: "عمان", country: "الأردن", countryLabel: "الأردن" },
  { value: "بيروت", label: "بيروت", country: "لبنان", countryLabel: "لبنان" },
  { value: "دمشق", label: "دمشق", country: "سوريا", countryLabel: "سوريا" },
  { value: "بغداد", label: "بغداد", country: "العراق", countryLabel: "العراق" },
  { value: "الدوحة", label: "الدوحة", country: "قطر", countryLabel: "قطر" },
  {
    value: "المنامة",
    label: "المنامة",
    country: "البحرين",
    countryLabel: "البحرين",
  },
  { value: "مسقط", label: "مسقط", country: "عمان", countryLabel: "عمان" },
  {
    value: "الكويت",
    label: "الكويت",
    country: "الكويت",
    countryLabel: "الكويت",
  },
  { value: "تونس", label: "تونس", country: "تونس", countryLabel: "تونس" },
  {
    value: "الجزائر",
    label: "الجزائر",
    country: "الجزائر",
    countryLabel: "الجزائر",
  },
  {
    value: "الرباط",
    label: "الرباط",
    country: "المغرب",
    countryLabel: "المغرب",
  },
  {
    value: "الدار البيضاء",
    label: "الدار البيضاء",
    country: "المغرب",
    countryLabel: "المغرب",
  },
];

/**
 * Simulates fetching cities from backend
 * In a real app, this would be an API call
 */
export const fetchCities = async (): Promise<City[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600));
  return cities;
};

/**
 * Get cities by country
 */
export const getCitiesByCountry = (country: string): City[] => {
  return cities.filter((city) => city.country === country);
};

/**
 * Get cities grouped by country
 */
export const getCitiesGroupedByCountry = (): Record<string, City[]> => {
  const grouped: Record<string, City[]> = {};

  cities.forEach((city) => {
    const country = city.countryLabel;
    if (!grouped[country]) {
      grouped[country] = [];
    }
    grouped[country].push(city);
  });

  return grouped;
};

/**
 * Get city by value
 */
export const getCityByValue = (value: string): City | undefined => {
  return cities.find((city) => city.value === value);
};
