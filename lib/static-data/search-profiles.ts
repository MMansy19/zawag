import {
  Profile,
  MaleProfile,
  FemaleProfile,
  SearchFilters,
  isMaleProfile,
  isFemaleProfile,
} from "@/lib/types";
import { PrivacySettings } from "@/lib/types/auth.types";
import {
  filterProfilesByPrivacy,
  ViewerContext,
  canViewProfile,
  canSendContactRequest,
  canSendMessage,
} from "@/lib/utils/privacy-filter";

// Helper functions to create complete gender-specific profile objects
const createMaleProfile = (profileData: Partial<MaleProfile>): MaleProfile => {
  const defaultPrivacySettings: PrivacySettings = {
    showProfilePicture: "everyone",
    showAge: true,
    showLocation: true,
    showOccupation: true,
    allowMessagesFrom: "everyone",
  };

  return {
    id: profileData.id || "",
    userId: profileData.userId || "",
    name: profileData.name || "",
    age: profileData.age || 25,
    gender: "m",
    country: profileData.country || "السعودية",
    city: profileData.city || "الرياض",
    nationality: profileData.nationality || "سعودي",
    maritalStatus: profileData.maritalStatus || "single",
    religiousLevel: profileData.religiousLevel || "practicing",
    education: profileData.education || "",
    occupation: profileData.occupation || "",
    bio: profileData.bio || "",
    profilePicture: profileData.profilePicture || "",
    preferences: profileData.preferences || { ageRange: { min: 20, max: 35 } },
    status: profileData.status || "approved",
    createdAt: profileData.createdAt || "2024-01-01T00:00:00Z",
    updatedAt: profileData.updatedAt || "2024-01-01T00:00:00Z",
    isComplete: profileData.isComplete || true,
    isApproved: profileData.isApproved || true,
    isVerified: profileData.isVerified || true,
    privacySettings: profileData.privacySettings || defaultPrivacySettings,

    // Common religious & family fields
    isPrayerRegular: profileData.isPrayerRegular ?? true,
    areParentsAlive: profileData.areParentsAlive || "both",
    parentRelationship: profileData.parentRelationship || "good",
    wantsChildren: profileData.wantsChildren || "yes",

    // Physical appearance
    height: profileData.height || 175,
    weight: profileData.weight || 70,
    appearance: profileData.appearance || "average",
    skinColor: profileData.skinColor || "medium",
    bodyType: profileData.bodyType || "average",

    // Personal information
    interests: profileData.interests || ["reading", "sports"],
    marriageGoals: profileData.marriageGoals || "starting family",
    personalityDescription:
      profileData.personalityDescription || "شخص طيب ومتدين",
    familyPlans: profileData.familyPlans || "children soon",
    relocationPlans: profileData.relocationPlans || "flexible",
    marriageTimeline: profileData.marriageTimeline || "within year",

    // Male-specific fields
    hasBeard: profileData.hasBeard ?? true,
    prayingLocation: profileData.prayingLocation || "mosque",
    isRegularAtMosque: profileData.isRegularAtMosque ?? true,
    smokes: profileData.smokes ?? false,
    financialSituation: profileData.financialSituation || "good",
    housingLocation: profileData.housingLocation || "family home",
    housingOwnership: profileData.housingOwnership || "family-owned",
    housingType: profileData.housingType || "family",
    ...(profileData.monthlyIncome !== undefined && {
      monthlyIncome: profileData.monthlyIncome,
    }),
    providerView: profileData.providerView || "sole provider",
    householdChores: profileData.householdChores || "willing",
  };
};

const createFemaleProfile = (
  profileData: Partial<FemaleProfile>,
): FemaleProfile => {
  const defaultPrivacySettings: PrivacySettings = {
    showProfilePicture: "matches-only",
    showAge: true,
    showLocation: true,
    showOccupation: true,
    allowMessagesFrom: "matches-only",
  };

  return {
    id: profileData.id || "",
    userId: profileData.userId || "",
    name: profileData.name || "",
    age: profileData.age || 23,
    gender: "f",
    country: profileData.country || "السعودية",
    city: profileData.city || "الرياض",
    nationality: profileData.nationality || "سعودي",
    maritalStatus: profileData.maritalStatus || "single",
    religiousLevel: profileData.religiousLevel || "practicing",
    education: profileData.education || "",
    occupation: profileData.occupation || "",
    bio: profileData.bio || "",
    profilePicture: profileData.profilePicture || "",
    preferences: profileData.preferences || { ageRange: { min: 25, max: 40 } },
    status: profileData.status || "approved",
    createdAt: profileData.createdAt || "2024-01-01T00:00:00Z",
    updatedAt: profileData.updatedAt || "2024-01-01T00:00:00Z",
    isComplete: profileData.isComplete || true,
    isApproved: profileData.isApproved || true,
    isVerified: profileData.isVerified || true,
    privacySettings: profileData.privacySettings || defaultPrivacySettings,

    // Common religious & family fields
    isPrayerRegular: profileData.isPrayerRegular ?? true,
    areParentsAlive: profileData.areParentsAlive || "both",
    parentRelationship: profileData.parentRelationship || "good",
    wantsChildren: profileData.wantsChildren || "yes",

    // Physical appearance
    height: profileData.height || 160,
    weight: profileData.weight || 55,
    appearance: profileData.appearance || "attractive",
    skinColor: profileData.skinColor || "medium",
    bodyType: profileData.bodyType || "slim",

    // Personal information
    interests: profileData.interests || ["reading", "cooking"],
    marriageGoals: profileData.marriageGoals || "starting family",
    personalityDescription:
      profileData.personalityDescription || "شخصية طيبة ومتدينة",
    familyPlans: profileData.familyPlans || "children soon",
    relocationPlans: profileData.relocationPlans || "flexible",
    marriageTimeline: profileData.marriageTimeline || "within year",

    // Female-specific fields
    guardianName: profileData.guardianName || "والدها",
    guardianPhone: profileData.guardianPhone || "+966501234567",
    ...(profileData.guardianEmail && {
      guardianEmail: profileData.guardianEmail,
    }),
    guardianRelationship: profileData.guardianRelationship || "father",
    ...(profileData.guardianNotes && {
      guardianNotes: profileData.guardianNotes,
    }),
    wearHijab: profileData.wearHijab ?? true,
    wearNiqab: profileData.wearNiqab ?? false,
    clothingStyle: profileData.clothingStyle || "modest-covering",
    prayingLocation: profileData.prayingLocation || "home",
    ...(profileData.mahramAvailable !== undefined && {
      mahramAvailable: profileData.mahramAvailable,
    }),
    workAfterMarriage: profileData.workAfterMarriage || "undecided",
    childcarePreference: profileData.childcarePreference || "self",
  };
};

// Static search profiles data - Male profiles
export const staticMaleProfiles: Profile[] = [
  createMaleProfile({
    id: "search_male_001",
    userId: "search_male_001",
    name: "عبدالله أحمد المالكي",
    age: 29,
    city: "الرياض",
    country: "السعودية",
    nationality: "سعودي",
    maritalStatus: "single",
    hasBeard: true,
    religiousLevel: "practicing",
    education: "ماجستير إدارة أعمال",
    occupation: "مدير مشاريع",
    profilePicture: "/images/profiles/search-male-1.jpg",
    bio: "مدير مشاريع في شركة كبرى، أحب القراءة والرياضة، ملتزم بتعاليم الدين، أسعى لبناء أسرة مسلمة صالحة.",
    isVerified: true,
    createdAt: "2024-01-15T08:00:00Z",
    updatedAt: "2024-03-01T10:30:00Z",
    prayingLocation: "mosque",
    isRegularAtMosque: true,
    smokes: false,
    financialSituation: "good",
    housingLocation: "منزل مستقل",
    housingOwnership: "owned",
    housingType: "family",
  }),
  createMaleProfile({
    id: "search_male_002",
    userId: "search_male_002",
    name: "د. محمد سعد الغامدي",
    age: 33,
    gender: "m",
    city: "جدة",
    country: "السعودية",
    nationality: "سعودي",
    maritalStatus: "single",
    prays: true,
    fasts: true,
    hasBeard: true,
    religiousLevel: "very-religious",
    education: "دكتوراه في الطب",
    occupation: "طبيب أطفال",
    profilePicture: "/images/profiles/search-male-2.jpg",
    bio: "طبيب أطفال، حافظ لأجزاء من القرآن الكريم، أحب العمل التطوعي ومساعدة الأطفال المحتاجين.",
    isVerified: true,
    createdAt: "2024-02-10T09:15:00Z",
    updatedAt: "2024-03-15T14:20:00Z",
  }),
  createMaleProfile({
    id: "search_male_003",
    userId: "search_male_003",
    name: "خالد عمر الحربي",
    age: 27,
    gender: "m",
    city: "الدمام",
    country: "السعودية",
    nationality: "سعودي",
    maritalStatus: "single",
    prays: true,
    fasts: true,
    hasBeard: true,
    religiousLevel: "practicing",
    education: "بكالوريوس هندسة كهربائية",
    occupation: "مهندس كهرباء",
    profilePicture: "/images/profiles/search-male-3.jpg",
    bio: "مهندس كهرباء، أحب التقنية والابتكار، ملتزم بالصلاة في المسجد، أسعى لحفظ القرآن الكريم.",
    isVerified: true,
    createdAt: "2024-01-20T07:30:00Z",
    updatedAt: "2024-02-25T16:45:00Z",
  }),
  createMaleProfile({
    id: "search_male_004",
    userId: "search_male_004",
    name: "أحمد محمد الشهري",
    age: 31,
    gender: "m",
    city: "أبها",
    country: "السعودية",
    nationality: "سعودي",
    maritalStatus: "divorced",
    prays: true,
    fasts: true,
    hasBeard: true,
    religiousLevel: "practicing",
    education: "بكالوريوس تجارة",
    occupation: "رجل أعمال",
    profilePicture: "/images/profiles/search-male-4.jpg",
    bio: "رجل أعمال، أب لطفل من زواج سابق، أحب السفر والتجارة، أسعى لإيجاد شريكة حياة صالحة.",
    isVerified: true,
    createdAt: "2024-02-05T11:00:00Z",
    updatedAt: "2024-03-10T13:30:00Z",
  }),
  createMaleProfile({
    id: "search_male_005",
    userId: "search_male_005",
    name: "يوسف علي القحطاني",
    age: 26,
    gender: "m",
    city: "الطائف",
    country: "السعودية",
    nationality: "سعودي",
    maritalStatus: "single",
    prays: true,
    fasts: true,
    hasBeard: true,
    religiousLevel: "very-religious",
    education: "ماجستير علوم حاسوب",
    occupation: "مطور برمجيات",
    profilePicture: "/images/profiles/search-male-5.jpg",
    bio: "مطور برمجيات، حافظ لثلثي القرآن الكريم، أحب البرمجة والتقنية، أسعى لخدمة الدين بالتقنية.",
    isVerified: true,
    createdAt: "2024-01-25T08:45:00Z",
    updatedAt: "2024-02-28T15:20:00Z",
  }),
  createMaleProfile({
    id: "search_male_006",
    userId: "search_male_006",
    name: "سالم راشد الزهراني",
    age: 35,
    gender: "m",
    city: "مكة المكرمة",
    country: "السعودية",
    nationality: "سعودي",
    maritalStatus: "single",
    prays: true,
    fasts: true,
    hasBeard: true,
    religiousLevel: "very-religious",
    education: "دكتوراه في الشريعة",
    occupation: "إمام ومدرس",
    profilePicture: "/images/profiles/search-male-6.jpg",
    bio: "إمام مسجد ومدرس شريعة، حافظ للقرآن الكريم، أحب التعليم والدعوة، أسعى لتربية جيل مؤمن.",
    isVerified: true,
    createdAt: "2024-02-15T06:30:00Z",
    updatedAt: "2024-03-20T12:15:00Z",
  }),
];

// Static search profiles data - Female profiles
export const staticFemaleProfiles: Profile[] = [
  createFemaleProfile({
    id: "search_female_001",
    userId: "search_female_001",
    name: "فاطمة عبدالله السليمان",
    age: 25,
    gender: "f",
    city: "الرياض",
    country: "السعودية",
    nationality: "سعودية",
    maritalStatus: "single",
    prays: true,
    fasts: true,
    hasHijab: true,
    religiousLevel: "practicing",
    education: "بكالوريوس طب أسنان",
    occupation: "طبيبة أسنان",
    profilePicture: "/images/profiles/search-female-1.jpg",
    bio: "طبيبة أسنان، أحب مساعدة المرضى، ملتزمة بالحجاب والصلاة، أحب القراءة والطبخ.",
    isVerified: true,
    createdAt: "2024-01-12T08:30:00Z",
    updatedAt: "2024-02-20T14:45:00Z",
  }),
  createFemaleProfile({
    id: "search_female_002",
    userId: "search_female_002",
    name: "عائشة محمد الدوسري",
    age: 28,
    gender: "f",
    city: "الخبر",
    country: "السعودية",
    nationality: "سعودية",
    maritalStatus: "single",
    prays: true,
    fasts: true,
    hasHijab: true,
    religiousLevel: "very-religious",
    education: "ماجستير تربية إسلامية",
    occupation: "معلمة تربية إسلامية",
    profilePicture: "/images/profiles/search-female-2.jpg",
    bio: "معلمة تربية إسلامية، حافظة لنصف القرآن الكريم، أحب تعليم الأطفال وتربيتهم على القيم الإسلامية.",
    isVerified: true,
    createdAt: "2024-01-18T09:15:00Z",
    updatedAt: "2024-03-05T16:30:00Z",
  }),
  createFemaleProfile({
    id: "search_female_003",
    userId: "search_female_003",
    name: "خديجة سعد النجار",
    age: 24,
    gender: "f",
    city: "جدة",
    country: "السعودية",
    nationality: "سعودية",
    maritalStatus: "single",
    prays: true,
    fasts: true,
    hasHijab: true,
    religiousLevel: "practicing",
    education: "بكالوريوس صيدلة",
    occupation: "صيدلانية",
    profilePicture: "/images/profiles/search-female-3.jpg",
    bio: "صيدلانية، أحب مساعدة المرضى وتقديم النصائح الطبية، ملتزمة بالقيم الإسلامية.",
    isVerified: true,
    createdAt: "2024-02-01T10:00:00Z",
    updatedAt: "2024-03-08T13:20:00Z",
  }),
  createFemaleProfile({
    id: "search_female_004",
    userId: "search_female_004",
    name: "مريم أحمد الحربي",
    age: 30,
    gender: "f",
    city: "المدينة المنورة",
    country: "السعودية",
    nationality: "سعودية",
    maritalStatus: "divorced",
    prays: true,
    fasts: true,
    hasHijab: true,
    religiousLevel: "practicing",
    education: "بكالوريوس محاسبة",
    occupation: "محاسبة",
    profilePicture: "/images/profiles/search-female-4.jpg",
    bio: "محاسبة، أم لطفلة من زواج سابق، أحب النظام والدقة، أسعى لبناء أسرة مستقرة.",
    isVerified: true,
    createdAt: "2024-01-22T11:30:00Z",
    updatedAt: "2024-02-18T17:45:00Z",
  }),
  createFemaleProfile({
    id: "search_female_005",
    userId: "search_female_005",
    name: "زينب عمر الشمري",
    age: 26,
    gender: "f",
    city: "حائل",
    country: "السعودية",
    nationality: "سعودية",
    maritalStatus: "single",
    prays: true,
    fasts: true,
    hasHijab: true,
    religiousLevel: "very-religious",
    education: "بكالوريوس لغة عربية",
    occupation: "معلمة لغة عربية",
    profilePicture: "/images/profiles/search-female-5.jpg",
    bio: "معلمة لغة عربية، حافظة لأجزاء من القرآن الكريم، أحب الشعر والأدب العربي.",
    isVerified: true,
    createdAt: "2024-02-08T07:45:00Z",
    updatedAt: "2024-03-12T14:10:00Z",
  }),
  createFemaleProfile({
    id: "search_female_006",
    userId: "search_female_006",
    name: "أسماء محمد الغامدي",
    age: 27,
    gender: "f",
    city: "الباحة",
    country: "السعودية",
    nationality: "سعودية",
    maritalStatus: "single",
    prays: true,
    fasts: true,
    hasHijab: true,
    religiousLevel: "practicing",
    education: "ماجستير علم نفس",
    occupation: "أخصائية نفسية",
    profilePicture: "/images/profiles/search-female-6.jpg",
    bio: "أخصائية نفسية، أحب مساعدة الناس في حل مشاكلهم النفسية، ملتزمة بالقيم الإسلامية.",
    isVerified: true,
    createdAt: "2024-01-30T12:15:00Z",
    updatedAt: "2024-03-01T18:30:00Z",
  }),
];

// Combined profiles for mixed gender searches
export const staticAllProfiles: Profile[] = [
  ...staticMaleProfiles,
  ...staticFemaleProfiles,
];

// Helper function to filter profiles based on search criteria
export const filterProfiles = (
  profiles: Profile[],
  filters: SearchFilters,
): Profile[] => {
  return profiles.filter((profile) => {
    // Age range filter
    if (filters.ageRange) {
      if (
        profile.age < filters.ageRange.min ||
        profile.age > filters.ageRange.max
      ) {
        return false;
      }
    }

    // Country filter
    if (filters.country) {
      if (profile.country.toLowerCase() !== filters.country.toLowerCase()) {
        return false;
      }
    }

    // City filter
    if (filters.city) {
      if (profile.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }
    }

    // Marital status filter
    if (filters.maritalStatus && filters.maritalStatus.length > 0) {
      if (!filters.maritalStatus.includes(profile.maritalStatus)) {
        return false;
      }
    }

    // Religious level filter
    if (filters.religiousLevel && filters.religiousLevel.length > 0) {
      if (!filters.religiousLevel.includes(profile.religiousLevel)) {
        return false;
      }
    }

    // Education filter
    if (filters.education && filters.education.length > 0) {
      const hasMatchingEducation = filters.education.some((edu) =>
        profile.education?.toLowerCase().includes(edu.toLowerCase()),
      );
      if (!hasMatchingEducation) {
        return false;
      }
    }

    // Occupation filter
    if (filters.occupation && filters.occupation.length > 0) {
      const hasMatchingOccupation = filters.occupation.some((occ) =>
        profile.occupation?.toLowerCase().includes(occ.toLowerCase()),
      );
      if (!hasMatchingOccupation) {
        return false;
      }
    }

    return true;
  });
};

// Gender-based filtering functions
export const getProfilesForUser = (userGender: "m" | "f"): Profile[] => {
  // Males can only see female profiles, females can only see male profiles
  if (userGender === "m") {
    return staticFemaleProfiles;
  } else {
    return staticMaleProfiles;
  }
};

// Enhanced search function with gender-based filtering
export const searchProfilesForUser = (
  filters: SearchFilters,
  userGender: "m" | "f",
  viewer?: ViewerContext,
): Profile[] => {
  // Get the appropriate profiles based on user gender
  const profiles = getProfilesForUser(userGender);

  // Apply privacy filters if viewer context is provided
  let filteredProfiles = viewer
    ? filterProfilesByPrivacy(profiles, viewer)
    : profiles;

  // Apply existing filters
  filteredProfiles = filterProfiles(filteredProfiles, filters);

  // Apply gender-specific filters
  if (userGender === "m") {
    // Male user viewing female profiles - apply female-specific filters
    const femaleProfiles = filteredProfiles as FemaleProfile[];

    // Apply hijab filter
    if (filters.wearHijab !== undefined) {
      filteredProfiles = femaleProfiles.filter(
        (profile) => profile.wearHijab === filters.wearHijab,
      );
    }

    // Apply niqab filter
    if (filters.wearNiqab !== undefined) {
      filteredProfiles = femaleProfiles.filter(
        (profile) => profile.wearNiqab === filters.wearNiqab,
      );
    }

    // Apply guardian relationship filter
    if (
      filters.guardianRelationship &&
      filters.guardianRelationship.length > 0
    ) {
      filteredProfiles = femaleProfiles.filter((profile) =>
        filters.guardianRelationship!.includes(profile.guardianRelationship!),
      );
    }
  } else {
    // Female user viewing male profiles - apply male-specific filters
    const maleProfiles = filteredProfiles as MaleProfile[];

    // Apply beard filter
    if (filters.hasBeard !== undefined) {
      filteredProfiles = maleProfiles.filter(
        (profile) => profile.hasBeard === filters.hasBeard,
      );
    }

    // Apply financial situation filter
    if (filters.financialSituation && filters.financialSituation.length > 0) {
      filteredProfiles = maleProfiles.filter((profile) =>
        filters.financialSituation!.includes(profile.financialSituation),
      );
    }

    // Apply smoking filter
    if (filters.smokes !== undefined) {
      filteredProfiles = maleProfiles.filter(
        (profile) => profile.smokes === filters.smokes,
      );
    }

    // Apply housing type filter
    if (filters.housingType && filters.housingType.length > 0) {
      filteredProfiles = maleProfiles.filter((profile) =>
        filters.housingType!.includes(profile.housingType!),
      );
    }
  }

  return filteredProfiles;
};

// Quick filter presets with gender-based filtering
export const getQuickFilteredProfiles = (
  filterType: string,
  userGender: "m" | "f",
  count: number = 6,
): Profile[] => {
  const profiles = getProfilesForUser(userGender);

  switch (filterType) {
    case "nearby":
      return profiles.filter((p) => p.city === "الرياض").slice(0, count);

    case "verified":
      return profiles.filter((p) => p.isVerified).slice(0, count);

    case "highly_educated":
      return profiles
        .filter(
          (p) =>
            p.education?.includes("دكتوراه") ||
            p.education?.includes("ماجستير"),
        )
        .slice(0, count);

    case "recently_active":
      return profiles
        .sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        )
        .slice(0, count);

    case "young":
      return profiles.filter((p) => p.age <= 28).slice(0, count);

    case "religious":
      return profiles
        .filter((p) => p.religiousLevel === "very-religious")
        .slice(0, count);

    default:
      return profiles.slice(0, count);
  }
};

// Get total count of available profiles for a user
export const getTotalProfilesCountForUser = (userGender: "m" | "f"): number => {
  return getProfilesForUser(userGender).length;
};

// Get profiles by city for a specific user gender
export const getProfilesByCityForUser = (
  city: string,
  userGender: "m" | "f",
): Profile[] => {
  return getProfilesForUser(userGender).filter(
    (profile) => profile.city.toLowerCase() === city.toLowerCase(),
  );
};

// Helper function to simulate API delay
export const simulateSearchDelay = (
  min: number = 300,
  max: number = 1000,
): Promise<void> => {
  const delay = Math.random() * (max - min) + min;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

// Helper function to paginate results
export const paginateResults = <T>(items: T[], page: number, limit: number) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    pagination: {
      page,
      limit,
      total: items.length,
      totalPages: Math.ceil(items.length / limit),
    },
  };
};

// Mock Search API for development
export const mockSearchApi = {
  async searchProfiles(
    filters: SearchFilters,
    page: number = 1,
    limit: number = 12,
  ) {
    await simulateSearchDelay();

    // Get all profiles based on gender preference (if any)
    let allProfiles = staticAllProfiles;

    // Apply filters
    const filteredProfiles = filterProfiles(allProfiles, filters);

    // Apply pagination
    const paginatedResult = paginateResults(filteredProfiles, page, limit);

    return {
      success: true,
      data: {
        profiles: paginatedResult.items,
        pagination: paginatedResult.pagination,
      },
    };
  },
};

// Helper function to get profiles by different criteria for testing with gender-based filtering
export const getProfilesByCategory = (
  category: string,
  userGender: "m" | "f",
  count: number = 6,
) => {
  const profiles = getProfilesForUser(userGender);

  switch (category) {
    case "recent":
      return profiles
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, count);

    case "verified":
      return profiles.filter((p) => p.isVerified).slice(0, count);

    case "religious":
      return profiles
        .filter((p) => p.religiousLevel === "very-religious")
        .slice(0, count);

    case "professionals":
      return profiles
        .filter(
          (p) =>
            p.education?.includes("دكتوراه") ||
            p.education?.includes("ماجستير"),
        )
        .slice(0, count);

    case "young":
      return profiles.filter((p) => p.age <= 28).slice(0, count);

    default:
      return profiles.slice(0, count);
  }
};

// Sample search filters for testing
export const sampleSearchFilters = {
  all: {},
  youngProfessionals: {
    ageRange: { min: 22, max: 30 },
    education: ["ماجستير", "دكتوراه"],
  },
  religiousCommitted: {
    religiousLevel: ["very-religious", "practicing"],
  },
  singleInRiyadh: {
    city: "الرياض",
    maritalStatus: ["single"],
  },
  medicalProfessionals: {
    occupation: ["طبيب", "طبيبة", "صيدلاني", "صيدلانية"],
  },
};
