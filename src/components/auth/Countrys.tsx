'use client';

import { useEffect, useState } from 'react';

interface BusinessType {
  id: number;
  name: string;
  description: string;
}

interface Country {
  id: number;
  country: string;
  short_code: string;
  calling_code: number;
  phone_length: number;
  flag: string;
  currency: string;
  currency_symbol: string;
}

export default function Countrys() {
  const [businessTypes, setBusinessTypes] = useState<BusinessType[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/config.json'); // Fetch from public folder
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setBusinessTypes(data.business_type);
        setCountries(data.countries);
      } catch (error) {
        setError('Error fetching JSON data');
        console.error('Error fetching JSON:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Business Types</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {businessTypes.length > 0 ? (
        <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
          {businessTypes.map((type) => (
            <li key={type.id}>
              <strong>{type.name}</strong>: {type.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading business types...</p>
      )}

      <h1>Countries</h1>
      {countries.length > 0 ? (
        <ul style={{ listStyleType: 'disc', marginLeft: '20px' }}>
          {countries.map((country) => (
            <li key={country.id}>
              <strong>{country.country}</strong> (Code: {country.short_code}, Currency: {country.currency_symbol} {country.currency})
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading countries...</p>
      )}
    </div>
  );
}

