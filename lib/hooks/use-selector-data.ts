import { useEffect, useState } from "react";

// Types for selector options
export interface SelectorOption {
  value: string;
  label: string;
  group?: string;
}

export interface SelectorData {
  countries: SelectorOption[];
  cities: SelectorOption[];
  occupations: SelectorOption[];
  educationLevels: SelectorOption[];
  nationalities: SelectorOption[];
}

// Simulate API delay
const simulateApiDelay = (ms: number = 500): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Fetch functions that simulate backend calls
export const fetchCountries = async (): Promise<SelectorOption[]> => {
  await simulateApiDelay(300);
  const { countries } = await import("@/lib/static-data/countries");
  return countries.map((country) => ({
    value: country.value,
    label: country.label,
    ...(country.group && { group: country.group }),
  }));
};

export const fetchCities = async (): Promise<SelectorOption[]> => {
  await simulateApiDelay(300);
  const { cities } = await import("@/lib/static-data/cities");
  return cities.map((city) => ({
    value: city.value,
    label: city.label,
    group: city.countryLabel,
  }));
};

export const fetchOccupations = async (): Promise<SelectorOption[]> => {
  await simulateApiDelay(300);
  const { occupations } = await import("@/lib/static-data/occupations");
  return occupations.map((occupation) => ({
    value: occupation.value,
    label: occupation.label,
    group: occupation.category,
  }));
};

export const fetchEducationLevels = async (): Promise<SelectorOption[]> => {
  await simulateApiDelay(300);
  const { educationLevels } = await import("@/lib/static-data/education");
  return educationLevels.map((education) => ({
    value: education.value,
    label: education.label,
    group: "المستوى التعليمي",
  }));
};

export const fetchNationalities = async (): Promise<SelectorOption[]> => {
  await simulateApiDelay(300);
  const { nationalities } = await import("@/lib/static-data/nationalities");
  return nationalities.map((nationality) => ({
    value: nationality.value,
    label: nationality.label,
    group: nationality.group,
  }));
};

// Combined hook to fetch all selector data
export const useSelectorData = () => {
  const [data, setData] = useState<SelectorData>({
    countries: [],
    cities: [],
    occupations: [],
    educationLevels: [],
    nationalities: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [countries, cities, occupations, educationLevels, nationalities] =
          await Promise.all([
            fetchCountries(),
            fetchCities(),
            fetchOccupations(),
            fetchEducationLevels(),
            fetchNationalities(),
          ]);

        setData({
          countries,
          cities,
          occupations,
          educationLevels,
          nationalities,
        });
      } catch (err) {
        setError("فشل في تحميل البيانات. يرجى المحاولة مرة أخرى.");
        console.error("Error fetching selector data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return { data, loading, error };
};

// Individual hooks for specific data types
export const useCountries = () => {
  const [countries, setCountries] = useState<SelectorOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCountries();
        setCountries(data);
      } catch (err) {
        setError("فشل في تحميل قائمة البلدان");
        console.error("Error fetching countries:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  return { countries, loading, error };
};

export const useCities = () => {
  const [cities, setCities] = useState<SelectorOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCities = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCities();
        setCities(data);
      } catch (err) {
        setError("فشل في تحميل قائمة المدن");
        console.error("Error fetching cities:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, []);

  return { cities, loading, error };
};

export const useOccupations = () => {
  const [occupations, setOccupations] = useState<SelectorOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOccupations = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchOccupations();
        setOccupations(data);
      } catch (err) {
        setError("فشل في تحميل قائمة المهن");
        console.error("Error fetching occupations:", err);
      } finally {
        setLoading(false);
      }
    };

    loadOccupations();
  }, []);

  return { occupations, loading, error };
};

export const useEducationLevels = () => {
  const [educationLevels, setEducationLevels] = useState<SelectorOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEducationLevels = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchEducationLevels();
        setEducationLevels(data);
      } catch (err) {
        setError("فشل في تحميل قائمة المستويات التعليمية");
        console.error("Error fetching education levels:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEducationLevels();
  }, []);

  return { educationLevels, loading, error };
};

export const useNationalities = () => {
  const [nationalities, setNationalities] = useState<SelectorOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNationalities = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchNationalities();
        setNationalities(data);
      } catch (err) {
        setError("فشل في تحميل قائمة الجنسيات");
        console.error("Error fetching nationalities:", err);
      } finally {
        setLoading(false);
      }
    };

    loadNationalities();
  }, []);

  return { nationalities, loading, error };
};
