import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'expo-router'; 

// Types
export interface FruitDemand {
  id: number;
  name: string;
  image: string;
  backgroundColor: string;
  predictedDemand: number;
  market: string;
}

interface DemandContextType {
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  fruits: FruitDemand[];
  isLoading: boolean;
}

const DemandContext = createContext<DemandContextType | undefined>(undefined);

// Mock data - Replace with actual API call
const mockDemandByDistrict: Record<string, FruitDemand[]> = {
  Colombo: [
    {
      id: 1,
      name: 'Mango',
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078',
      backgroundColor: '#FFE5A3',
      predictedDemand: 5185.32,
      market: 'GreenLeaf Estate',
    },
    {
      id: 2,
      name: 'Avocado',
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578',
      backgroundColor: '#E8F5E9',
      predictedDemand: 3250.75,
      market: 'Fresh Market Central',
    },
  ],
  Galle: [
    {
      id: 3,
      name: 'Pineapple',
      image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba',
      backgroundColor: '#FFF3E0',
      predictedDemand: 7890.45,
      market: 'Southern Agri Hub',
    },
    {
      id: 4,
      name: 'Dragon Fruit',
      image: 'https://images.unsplash.com/photo-1527325678964-54921661f888',
      backgroundColor: '#FCE4EC',
      predictedDemand: 2150.60,
      market: 'Exotic Fruits Market',
    },
  ],
  Kandy: [
    {
      id: 5,
      name: 'Rambutan',
      image: 'https://images.unsplash.com/photo-1609256409640-84965a2fb006',
      backgroundColor: '#F8BBD0',
      predictedDemand: 4320.15,
      market: 'Highland Fresh Market',
    },
  ],
};

export function DemandProvider({ children }: { children: React.ReactNode }) {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [fruits, setFruits] = useState<FruitDemand[]>([]);
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
      // Simulate API call - Replace with actual API call
      setTimeout(() => {
        setFruits(mockDemandByDistrict[selectedDistrict] || []);
        setIsLoading(false);
      }, 500);
    }
  }, [selectedDistrict]);

  return (
    <DemandContext.Provider
      value={{
        selectedDistrict,
        setSelectedDistrict,
        fruits,
        isLoading,
      }}
    >
      {children}
    </DemandContext.Provider>
  );
}

export function useDemand() {
  const context = useContext(DemandContext);
  if (context === undefined) {
    throw new Error('useDemand must be used within a DemandProvider');
  }
  return context;
}