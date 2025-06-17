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

// List of Arabic and Islamic country ISO2 codes
const arabicIslamicCountryCodes = [
  'ae', 'sa', 'eg', 'ma', 'dz', 'tn', 'ly', 'sd', 'sy', 'lb', 'jo', 'iq', 'ye', 'om', 
  'qa', 'bh', 'kw', 'ps', 'tr', 'ir', 'pk', 'bd', 'id', 'my'
];

// Arabic names mapping
const arabicNames: Record<string, string> = {
  'ae': 'الإمارات',
  'sa': 'السعودية', 
  'eg': 'مصر',
  'ma': 'المغرب',
  'dz': 'الجزائر',
  'tn': 'تونس',
  'ly': 'ليبيا',
  'sd': 'السودان',
  'sy': 'سوريا',
  'lb': 'لبنان',
  'jo': 'الأردن',
  'iq': 'العراق',
  'ye': 'اليمن',
  'om': 'عمان',
  'qa': 'قطر',
  'bh': 'البحرين',
  'kw': 'الكويت',
  'ps': 'فلسطين',
  'tr': 'تركيا',
  'ir': 'إيران',
  'pk': 'باكستان',
  'bd': 'بنغلاديش',
  'id': 'إندونيسيا',
  'my': 'ماليزيا'
};

// Use memoization to create countries list once
const getArabicIslamicCountries = (): CountryData[] => {
  try {
    // Debug: Log the structure of defaultCountries
    console.log('First few default countries:', defaultCountries.slice(0, 5));
    console.log('Looking for Saudi Arabia in defaultCountries:', 
      defaultCountries.find(c => c[2] === 'sa' || c[2] === 'SA' || c[0]?.toLowerCase().includes('saudi'))
    );
    
    const filtered = defaultCountries.filter((country) => 
      arabicIslamicCountryCodes.includes(country[2])
    );
    
    console.log('Filtered countries:', filtered.length);
    console.log('Filtered countries list:', filtered.map(c => `${c[0]} (${c[2]})`));
    
    // Ensure we have at least Saudi Arabia - manually add if not found
    const hasSaudiArabia = filtered.find(c => c[2] === 'sa');
    if (!hasSaudiArabia) {
      console.warn('Saudi Arabia not found in filtered list, adding manually');
      const saudiFromDefault = defaultCountries.find(c => c[2] === 'sa' || c[0]?.toLowerCase().includes('saudi'));
      if (saudiFromDefault) {
        filtered.unshift(saudiFromDefault); // Add Saudi Arabia at the beginning
      } else {
        // Manual fallback for Saudi Arabia
        filtered.unshift(['Saudi Arabia', '', 'sa', '966']);
      }
    }
    
    // Ensure we have at least Saudi Arabia
    if (filtered.length === 0) {
      console.warn('No Arabic/Islamic countries found in defaultCountries, using fallback');
      return [['Saudi Arabia', '', 'sa', '966'], ...defaultCountries.slice(0, 9)]; // Ensure SA is first
    }
    
    return filtered;
  } catch (error) {
    console.error('Error filtering countries:', error);
    return defaultCountries.slice(0, 10); // Fallback
  }
};

const countries: CountryData[] = getArabicIslamicCountries();

interface ICPhoneProps {
  value: string;
  onChange: (phone: string) => void;
  style_inline?: React.CSSProperties;
  defaultCountry: CountryIso2;
}

const ICPhone: React.FC<ICPhoneProps> = ({
  value,
  onChange,
  style_inline,
  defaultCountry,
}) => {
  // Ensure the default country exists in our filtered list (case insensitive)
  const safeDefaultCountry = countries.find(c => c[2]?.toLowerCase() === defaultCountry?.toLowerCase()) 
    ? defaultCountry 
    : 'sa' as CountryIso2;
    
  if (typeof window !== 'undefined') {
    console.log('Default country:', defaultCountry, 'Safe default:', safeDefaultCountry);
    console.log('Countries available:', countries.length);
    console.log('SA country found:', countries.find(c => c[2]?.toLowerCase() === 'sa'));
  }
  
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
    console.error('Error with usePhoneInput:', error);
    // Fallback to using all default countries if our filtered list has issues
    phoneHookResult = usePhoneInput({
      defaultCountry: 'sa' as CountryIso2,
      value,
      countries: defaultCountries,
      onChange: (data: any) => {
        onChange(data.phone);
      },
    });
  }
  
  const { phone, handlePhoneValueChange, inputRef, country, setCountry } = phoneHookResult;

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
export default ICPhone;

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
                  {arabicName} ({englishName}) +{country.dialCode}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
