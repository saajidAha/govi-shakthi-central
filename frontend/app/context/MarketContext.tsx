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
  error: string | null;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

const fruitImages: Record<string, string> = {
  Mango: 'https://images.unsplash.com/photo-1553279768-865429fa0078',
  Avocado: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578',
  Pineapple: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba',
  Rambutan: 'https://images.unsplash.com/photo-1609256409640-84965a2fb006',
  DragonFruit: 'https://images.unsplash.com/photo-1527325678964-54921661f888',
  Banana: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e',
  Papaya: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe',
  Guava: 'https://images.unsplash.com/photo-1536511132770-e5058c7e8c46',
  WoodApple: 'https://images.unsplash.com/photo-1591300327588-9eb28f1be037',
  Strawberry: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2',
  Kiwi: 'https://images.unsplash.com/photo-1585059895524-72359e06133a',
  Lychee: 'https://cdn.pixabay.com/photo/2018/05/08/20/19/lychee-3383825_1280.jpg',
};

export function MarketProvider({ children }: { children: React.ReactNode }) {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 
  const pathname = usePathname();

  //Reset state when navigating away from the price prediction screen
  useEffect(()=>{
    if(pathname !== '/features/price-prediction'){
      setSelectedDistrict('');
      setFruits([]);
    }
  },[pathname]);

  useEffect(() => {
    if (selectedDistrict) {
      setIsLoading(true);
      setError(null);

      fetch(`https://saajid-govishakthi-backend-47235930830.asia-south1.run.app/api/prices?district=${selectedDistrict}`)
        .then((response)=>{
          if(!response.ok){
            throw new Error('Failed to fetch fruits');
          }
          return response.json();
        })

        .then((data)=>{
          console.log('API Response: ', data);

          if(!data || !data.predictions || !Array.isArray(data.predictions)){
            throw new Error('Invalid data format received');
          }

          const filteredFruits=data.predictions
            .filter((prediction:any)=> prediction.location===selectedDistrict)
            .map((prediction:any, index:number)=> ({
              id: index+1,
              name: prediction.fruitType,
              image: fruitImages[prediction.fruitType] || 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b',
              backgroundColor: '#FFE5A3',
              predictedPrice: prediction.predictedPrice,
            }));

          setFruits(filteredFruits);
          setIsLoading(false);
        })

        .catch((err)=>{
          console.error('Error fetching fruits', err);
          setError(err.message);
          setIsLoading(false);
        });
    }
  }, [selectedDistrict]);

  return (
    <MarketContext.Provider
      value={{
        selectedDistrict,
        setSelectedDistrict,
        fruits,
        isLoading,
        error,
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