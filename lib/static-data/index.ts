/**
 * Central export file for all static data used in selectors
 * This simulates a backend API layer for the Islamic marriage platform
 */

// Countries
export * from "./countries";

// Education levels
export * from "./education";

// Occupations
export * from "./occupations";

// Cities
export * from "./cities";

// Nationalities
export * from "./nationalities";

/**
 * Centralized function to fetch all selector data
 * This simulates fetching all required data from backend in one go
 */
export const fetchAllSelectorData = async () => {
  const { fetchCountries } = await import("./countries");
  const { fetchEducationLevels } = await import("./education");
  const { fetchOccupations } = await import("./occupations");
  const { fetchCities } = await import("./cities");
  const { fetchNationalities } = await import("./nationalities");

  // Fetch all data in parallel to simulate real backend behavior
  const [countries, educationLevels, occupations, cities, nationalities] =
    await Promise.all([
      fetchCountries(),
      fetchEducationLevels(),
      fetchOccupations(),
      fetchCities(),
      fetchNationalities(),
    ]);

  return {
    countries,
    educationLevels,
    occupations,
    cities,
    nationalities,
  };
};

/**
 * Types for all selector data
 */
export type SelectorData = {
  countries: import("./countries").Country[];
  educationLevels: import("./education").EducationLevel[];
  occupations: import("./occupations").Occupation[];
  cities: import("./cities").City[];
  nationalities: import("./nationalities").Nationality[];
};
