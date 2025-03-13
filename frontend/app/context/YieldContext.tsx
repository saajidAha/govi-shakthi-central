import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
export interface CropYield {
  id: number;
  name: string;
  image: string;
  backgroundColor: string;
  predictedYield: number;
  market: string;
}

interface YieldContextType {
  selectedDistrict: string;
  setSelectedDistrict: (district: string) => void;
  crops: CropYield[];
  isLoading: boolean;
}

const YieldContext = createContext<YieldContextType | undefined>(undefined);

// Mock data - Replace with actual API call
const mockYieldsByDistrict: Record<string, CropYield[]> = {
    Colombo: [
      {
        id: 1,
        name: 'Mango',
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078',
        backgroundColor: '#FFE5A3',
        predictedYield: 5185.32,
        market: 'GreenLeaf Estate',
      },
      {
        id: 2,
        name: 'Avocado',
        image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578',
        backgroundColor: '#E8F5E9',
        predictedYield: 3250.75,
        market: 'Fresh Market Central',
      },
    ],
    Galle: [
      {
        id: 3,
        name: 'Pineapple',
        image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba',
        backgroundColor: '#FFF3E0',
        predictedYield: 7890.45,
        market: 'Southern Agri Hub',
      },
      {
        id: 4,
        name: 'Dragon Fruit',
        image: 'https://images.unsplash.com/photo-1527325678964-54921661f888',
        backgroundColor: '#FCE4EC',
        predictedYield: 2150.60,
        market: 'Exotic Fruits Market',
      },
    ],
    Kandy: [
      {
        id: 5,
        name: 'Tea',
        image: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97',
        backgroundColor: '#E8F5E9',
        predictedYield: 12500.80,
        market: 'Highland Tea Exchange',
      },
    ],
  };
  
  export function YieldProvider({ children }: { children: React.ReactNode }) {
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [crops, setCrops] = useState<CropYield[]>([]);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      if (selectedDistrict) {
        setIsLoading(true);
        // Simulate API call - Replace with actual API call
        setTimeout(() => {
          setCrops(mockYieldsByDistrict[selectedDistrict] || []);
          setIsLoading(false);
        }, 500);
      }
    }, [selectedDistrict]);
  
    return (
      <YieldContext.Provider
        value={{
          selectedDistrict,
          setSelectedDistrict,
          crops,
          isLoading,
        }}
      >
        {children}
      </YieldContext.Provider>
    );
  }
  
  export function useYield() {
    const context = useContext(YieldContext);
    if (context === undefined) {
      throw new Error('useYield must be used within a YieldProvider');
    }
    return context;
  }