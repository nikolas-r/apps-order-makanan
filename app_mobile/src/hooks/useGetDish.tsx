'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';

import { DishType } from '@/types';

export const useGetDish = (id: string) => {
  const [dish, setDish] = useState<DishType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getDish = async () => {
    if (!id) return
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/routes/${id}`);
      const foundDish = response.data.data; 
      setDish(foundDish || null);
      setIsLoading(false);
      return foundDish;
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching dishes:', error);
      throw error;
    }
  };

  useEffect(() => {
    getDish();
  }, [id]);

  return {
    dish,
    isLoading,
  };
};
