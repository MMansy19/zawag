"use client";

import {
  CountryData,
  CountryIso2,
  defaultCountries,
  parseCountry,
  ParsedCountry,
  usePhoneInput,
} from "react-international-phone";

import React, { useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";

// List of Arabic and Islamic country ISO2 codes (sorted with Arabic countries first)
const arabicIslamicCountryCodes = [
  // Gulf Arab Countries
  "eg",
  "sa",
  "ae",
  "qa",
  "kw",
  "bh",
  "om",
  // Levant Arab Countries
  "sy",
  "lb",
  "jo",
  "ps",
  "iq",
  // North African Arab Countries
  "ly",
  "tn",
  "dz",
  "ma",
  "sd",
  // Other Arab Countries
  "ye",
  "dj",
  "so",
  "km",
  // Major Islamic Countries
  "tr",
  "ir",
  "pk",
  "bd",
  "id",
  "my",
  "af",
  "bn",
  "mv",
  // Central Asian Islamic Countries
  "az",
  "kz",
  "kg",
  "tj",
  "tm",
  "uz",
  // African Islamic Countries
  "sn",
  "ml",
  "ne",
  "bf",
  "ci",
  "gm",
  "gn",
  "sl",
  "lr",
  "gh",
  "tg",
  "bj",
  "ng",
  "td",
  "cf",
  "cm",
  "er",
  "et",
];

// Arabic names mapping (sorted with Arabic countries first)
const arabicNames: Record<string, string> = {
  // Gulf Arab Countries
  eg: "مصر",
  sa: "السعودية",
  ae: "الإمارات",
  qa: "قطر",
  kw: "الكويت",
  bh: "البحرين",
  om: "عمان",
  // Levant Arab Countries
  sy: "سوريا",
  lb: "لبنان",
  jo: "الأردن",
  ps: "فلسطين",
  iq: "العراق",
  // North African Arab Countries
  ly: "ليبيا",
  tn: "تونس",
  dz: "الجزائر",
  ma: "المغرب",
  sd: "السودان",
  // Other Arab Countries
  ye: "اليمن",
  dj: "جيبوتي",
  so: "الصومال",
  km: "جزر القمر",
  // Major Islamic Countries
  tr: "تركيا",
  ir: "إيران",
  pk: "باكستان",
  bd: "بنغلاديش",
  id: "إندونيسيا",
  my: "ماليزيا",
  af: "أفغانستان",
  bn: "بروناي",
  mv: "المالديف",
  // Central Asian Islamic Countries
  az: "أذربيجان",
  kz: "كازاخستان",
  kg: "قيرغيزستان",
  tj: "طاجيكستان",
  tm: "تركمانستان",
  uz: "أوزبكستان",
  // African Islamic Countries
  sn: "السنغال",
  ml: "مالي",
  ne: "النيجر",
  bf: "بوركينا فاسو",
  ci: "ساحل العاج",
  gm: "غامبيا",
  gn: "غينيا",
  sl: "سيراليون",
  lr: "ليبيريا",
  gh: "غانا",
  tg: "توغو",
  bj: "بنين",
  ng: "نيجيريا",
  td: "تشاد",
  cf: "أفريقيا الوسطى",
  cm: "الكاميرون",
  er: "إريتريا",
  et: "إثيوبيا",
};

// Use memoization to create countries list once
const getArabicIslamicCountries = (): CountryData[] => {
  try {
    const filtered = defaultCountries.filter(
      (country) => arabicIslamicCountryCodes.includes(country[1]), // ISO2 code is at index 1
    );

    // Ensure we have at least Egypt - manually add if not found
    const hasEgypt = filtered.find((c) => c[1] === "eg");
    if (!hasEgypt) {
      const egyptFromDefault = defaultCountries.find(
        (c) => c[1] === "eg" || c[0]?.toLowerCase().includes("egypt"),
      );
      if (egyptFromDefault) {
        filtered.unshift(egyptFromDefault); // Add Egypt at the beginning
      } else {
        // Manual fallback for Egypt
        filtered.unshift(["Egypt", "eg", "20"]);
      }
    }

    // Ensure we have at least Egypt
    if (filtered.length === 0) {
      return [["Egypt", "eg", "20"], ...defaultCountries.slice(0, 9)]; // Ensure Egypt is first
    }

    return filtered;
  } catch (error) {
    console.error("Error filtering countries:", error);
    return defaultCountries.slice(0, 10); // Fallback
  }
};

const countries: CountryData[] = getArabicIslamicCountries();

interface PhoneProps {
  value: string;
  onChange: (phone: string) => void;
  style_inline?: React.CSSProperties;
  defaultCountry: CountryIso2;
}

const Phone: React.FC<PhoneProps> = ({
  value,
  onChange,
  style_inline,
  defaultCountry,
}) => {
  // Ensure the default country exists in our filtered list (case insensitive)
  const safeDefaultCountry = countries.find(
    (c) => c[1]?.toLowerCase() === defaultCountry?.toLowerCase(),
  )
    ? defaultCountry
    : ("eg" as CountryIso2);

  // Wrap usePhoneInput in try-catch to handle any library errors
  let phoneHookResult;
  try {
    phoneHookResult = usePhoneInput({
      defaultCountry: safeDefaultCountry,
      value,
      countries: countries,
      onChange: (data: any) => {
        onChange(data.phone);
      },
    });
  } catch (error) {
    console.error("Error with usePhoneInput:", error);
    // Fallback to using all default countries if our filtered list has issues
    phoneHookResult = usePhoneInput({
      defaultCountry: "eg" as CountryIso2,
      value,
      countries: defaultCountries,
      onChange: (data: any) => {
        onChange(data.phone);
      },
    });
  }

  const { phone, handlePhoneValueChange, inputRef, country, setCountry } =
    phoneHookResult;

  return (
    <div className="flex w-full items-center gap-2" dir="ltr">
      <CustomDropdown
        country={country}
        setCountry={setCountry}
        defaultCountries={countries.length > 0 ? countries : defaultCountries}
        parseCountry={parseCountry}
      />{" "}
      <div className="flex-grow">
        <input
          type="tel"
          value={phone}
          onChange={handlePhoneValueChange}
          ref={inputRef}
          onPaste={(e: any) => e.preventDefault()}
          className="w-full h-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          style={{
            direction: "ltr",
          }}
          placeholder="أدخل رقم الهاتف"
        />
      </div>
    </div>
  );
};
export default Phone;

const CustomDropdown = ({
  country,
  setCountry,
  defaultCountries,
  parseCountry,
}: {
  country: ParsedCountry;
  setCountry: (iso2: string) => void;
  defaultCountries: CountryData[];
  parseCountry: (countryData: CountryData) => ParsedCountry;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (iso2: string) => {
    setCountry(iso2);
    setIsOpen(false);
  };

  const handleToggle = () => setIsOpen((prev) => !prev);

  return (
    <div
      style={{ position: "relative", height: "40px", aspectRatio: 1 }}
      ref={dropdownRef}
    >
      {/* Selected Item */}
      <div
        onClick={handleToggle}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
          background: "#fff",
          width: "100%",
          height: "100%",
        }}
      >
        <ReactCountryFlag
          style={{
            width: "30px",
          }}
          countryCode={country.iso2}
          svg
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            zIndex: 10,
            listStyle: "none",
            margin: 0,
            padding: "4px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            background: "#fff",
            minWidth: "280px",
            maxHeight: "300px",
            overflowY: "auto",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
        >
          {defaultCountries.map((c) => {
            const country = parseCountry(c);
            const arabicName = arabicNames[country.iso2] || country.name;
            const englishName = country.name;
            return (
              <li
                key={country.iso2}
                onClick={() => handleSelect(country.iso2)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 8px",
                  cursor: "pointer",
                  borderRadius: "4px",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <ReactCountryFlag
                  countryCode={country.iso2}
                  svg
                  style={{ width: "20px", height: "15px" }}
                />
                <span style={{ fontSize: "14px", whiteSpace: "nowrap" }}>
                  {arabicName}
                  {/* ({englishName}) */} ({country.dialCode}+)
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
