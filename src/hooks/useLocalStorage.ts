'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void, boolean] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);
  const initialValueRef = useRef(initialValue);

  // Initialize once after hydration
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item));
      } else {
        window.localStorage.setItem(key, JSON.stringify(initialValueRef.current));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  // Sync state when other tabs or components dispatch changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent | CustomEvent) => {
      if ('key' in e && e.key !== key) return;
      try {
        const item = window.localStorage.getItem(key);
        if (item !== null) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.warn(`Error reading updated key "${key}":`, error);
      }
    };

    window.addEventListener('storage', handleStorageChange as EventListener);
    window.addEventListener(`local-storage-${key}`, handleStorageChange as EventListener);
    return () => {
      window.removeEventListener('storage', handleStorageChange as EventListener);
      window.removeEventListener(`local-storage-${key}`, handleStorageChange as EventListener);
    };
  }, [key]);

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        setStoredValue((current) => {
          const valueToStore = value instanceof Function ? value(current) : value;
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          // Notify other components in the same tab
          window.dispatchEvent(new CustomEvent(`local-storage-${key}`, { detail: valueToStore }));
          return valueToStore;
        });
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key]
  );

  return [storedValue, setValue, isLoaded];
}
