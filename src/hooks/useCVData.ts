import { useState, useEffect } from 'react';
import { CVData, initialCVData } from '@/types/cv';

const STORAGE_KEY = 'siapkerja_cv_data';

export const useCVData = () => {
  const [cvData, setCVData] = useState<CVData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return initialCVData;
        }
      }
    }
    return initialCVData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
  }, [cvData]);

  const updateCVData = (updates: Partial<CVData>) => {
    setCVData(prev => ({ ...prev, ...updates }));
  };

  const resetCVData = () => {
    setCVData(initialCVData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { cvData, updateCVData, resetCVData };
};
