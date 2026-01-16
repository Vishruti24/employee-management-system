import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : initialValue;
    } catch (err) {
      console.error("Invalid JSON in localStorage:", key);
      localStorage.removeItem(key);
      return initialValue;
    }
  });

  //  Save to localStorage when value changes (same tab)
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Failed to save to localStorage", err);
    }
  }, [key, value]);

  // Listen to changes from OTHER TABS
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        try {
          const newValue = event.newValue
            ? JSON.parse(event.newValue)
            : initialValue;

          setValue(newValue);
        } catch {
          console.error("Invalid JSON received from another tab");
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [value, setValue];
}
