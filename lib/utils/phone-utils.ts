/**
 * Utility to work with phone numbers
 */
export const extractCountryFromPhone = (
  phoneNumber: string,
): {
  country?: string;
  isValid: boolean;
  dialCode?: string;
} => {
  try {
    if (!phoneNumber || phoneNumber.trim() === "") {
      return { isValid: false };
    }

    // Basic validation - check if it starts with + and has digits
    const isValidFormat = /^\+\d{7,15}$/.test(phoneNumber.replace(/\s/g, ""));

    if (!isValidFormat) {
      return { isValid: false };
    } // Extract dial code (rough approximation)
    const dialCodeMatch = phoneNumber.match(/^\+(\d{1,4})/);
    const dialCode = dialCodeMatch ? `+${dialCodeMatch[1]}` : undefined;

    return {
      isValid: true,
      ...(dialCode && { dialCode }),
    };
  } catch (error) {
    console.warn("Error parsing phone number:", error);
    return { isValid: false };
  }
};

/**
 * Check if phone number is valid (basic validation)
 */
export const isValidPhoneNumber = (phoneNumber: string): boolean => {
  try {
    if (!phoneNumber || phoneNumber.trim() === "") {
      return false;
    }

    // Basic validation - starts with + and has 7-15 digits
    return /^\+\d{7,15}$/.test(phoneNumber.replace(/\s/g, ""));
  } catch (error) {
    return false;
  }
};

/**
 * Format phone number for display (basic formatting)
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  try {
    if (!phoneNumber || phoneNumber.trim() === "") {
      return phoneNumber;
    }

    // Basic formatting - just ensure it starts with +
    if (phoneNumber.startsWith("+")) {
      return phoneNumber;
    }

    return `+${phoneNumber}`;
  } catch (error) {
    return phoneNumber;
  }
};

/**
 * Get country flag emoji from country code (optional utility)
 */
export const getCountryFlag = (countryCode: string): string => {
  if (!countryCode || countryCode.length !== 2) return "";

  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char: string) => 127397 + char.charCodeAt(0));

  return String.fromCodePoint(...codePoints);
};
