import { useEffect, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useDebounce(callback: (id: string) => Promise<void>, delay: number) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [before, setBefore] = useState('');
    useEffect(() => {
        
        const timer = setTimeout(() => {
          callback(searchTerm);
        }, delay);
        return () => clearTimeout(timer);
      
    }, [searchTerm, delay]);
  
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };
  
    return { searchTerm, handleSearchChange };
  }