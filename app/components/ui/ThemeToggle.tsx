"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";

interface ThemeToggleProps {
  isMobile?: boolean;
}

export default function ThemeToggle({ isMobile = false }: ThemeToggleProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Check for system preference or saved preference on component mount
  useEffect(() => {
    setIsMounted(true);
    // Check if the user has a saved preference
    const savedTheme = localStorage.getItem("theme");
    
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else {
      // If no saved preference, check system preference
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDarkMode(prefersDark);
      
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);
  
  if (!isMounted) return null;
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };
  
  return (
    <motion.button
      onClick={toggleTheme}
      className={`theme-toggle ${isMobile ? 'theme-toggle-mobile' : ''}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
    >
      {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
    </motion.button>
  );
} 