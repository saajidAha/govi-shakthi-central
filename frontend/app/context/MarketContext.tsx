import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'expo-router';

// Types
export interface Fruit {
  id: number;
  name: string;
  image: string;
  backgroundColor: string;
  predictedPrice: number;
}

interface MarketContextType {
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  fruits: Fruit[];
  isLoading: boolean;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

// Mock data - Replace with actual API call
const mockFruitsByDistrict: Record<string, Fruit[]> = {
  Colombo: [
    {
      id: 1,
      name: 'Mango',
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078',
      backgroundColor: '#FFE5A3',
      predictedPrice: 330,
    },
    {
      id: 2,
      name: 'Avocado',
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578',
      backgroundColor: '#E8F5E9',
      predictedPrice: 400,
    },
  ],
  Galle: [
    {
      id: 3,
      name: 'Pineapple',
      image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba',
      backgroundColor: '#FFF3E0',
      predictedPrice: 560,
    },
    {
      id: 4,
      name: 'Dragon Fruit',
      image: 'https://images.unsplash.com/photo-1527325678964-54921661f888',
      backgroundColor: '#FCE4EC',
      predictedPrice: 890,
    },
  ],
  Matara: [
    {
      id: 5,
      name: 'Papaya',
      image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe',
      backgroundColor: '#FFCCBC',
      predictedPrice: 450,
    },
  ],
  Kandy: [
    {
      id: 6,
      name: 'Rambutan',
      image: 'https://images.unsplash.com/photo-1609256409640-84965a2fb006',
      backgroundColor: '#F8BBD0',
      predictedPrice: 780,
    },
  ],
};

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  //Reset state when navigating away from the demand prediction screen
    useEffect(()=>{
      if(pathname !== '/features/demand-prediction'){
        setSelectedDistrict('');
        setFruits([]);
      }
    }, [pathname]);

  useEffect(() => {
    if (selectedDistrict) {
      setIsLoading(true);
      // Simulate API call - to be replaced with actual API call later
      setTimeout(() => {
        setFruits(mockFruitsByDistrict[selectedDistrict] || []);
        setIsLoading(false);
      }, 500);
    }
  }, [selectedDistrict]);

  return (
    <MarketContext.Provider
      value={{
        selectedDistrict,
        setSelectedDistrict,
        fruits,
        isLoading,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
}