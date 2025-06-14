/**
 * Custom hook for managing selector data
 * Simulates backend data fetching for the registration wizard
 */

import { useState, useEffect } from "react";
import {
  fetchCountries,
  fetchEducationLevels,
  fetchOccupations,
  fetchCities,
  fetchNationalities,
  type Country,
  type EducationLevel,
  type Occupation,
  type City,
  type Nationality,
} from "@/lib/static-data";

interface SelectorDataState {
  countries: Country[];
  educationLevels: EducationLevel[];
  occupations: Occupation[];
  cities: City[];
  nationalities: Nationality[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook to fetch and manage all selector data
 */
export const useSelectorData = () => {
  const [state, setState] = useState<SelectorDataState>({
    countries: [],
    educationLevels: [],
    occupations: [],
    cities: [],
    nationalities: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        // Fetch all data in parallel to simulate real backend behavior
        const [countries, educationLevels, occupations, cities, nationalities] =
          await Promise.all([
            fetchCountries(),
            fetchEducationLevels(),
            fetchOccupations(),
            fetchCities(),
            fetchNationalities(),
          ]);

        setState({
          countries,
          educationLevels,
          occupations,
          cities,
          nationalities,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            error instanceof Error
              ? error.message
              : "حدث خطأ في تحميل البيانات",
        }));
      }
    };

    loadData();
  }, []);

  return state;
};

/**
 * Hook to fetch countries only
 */
export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
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
        setError(
          err instanceof Error ? err.message : "حدث خطأ في تحميل البلدان",
        );
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  return { countries, loading, error };
};

/**
 * Hook to fetch education levels only
 */
export const useEducationLevels = () => {
  const [educationLevels, setEducationLevels] = useState<EducationLevel[]>([]);
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
        setError(
          err instanceof Error
            ? err.message
            : "حدث خطأ في تحميل المستويات التعليمية",
        );
      } finally {
        setLoading(false);
      }
    };

    loadEducationLevels();
  }, []);

  return { educationLevels, loading, error };
};
