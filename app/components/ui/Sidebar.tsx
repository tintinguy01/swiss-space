"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaUser, 
  FaCode, 
  FaBriefcase, 
  FaGraduationCap,
  FaProjectDiagram,
  FaEnvelope,
  FaHome,
  FaBars,
  FaTimes
} from "react-icons/fa";

interface SidebarProps {
  onSelectCard: (cardId: string) => void;
  activeCards: string[];
}

interface SidebarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

export default function Sidebar({ onSelectCard, activeCards }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  const items: SidebarItem[] = [
    { id: "welcome", icon: <FaHome size={18} />, label: "Welcome" },
    { id: "about", icon: <FaUser size={18} />, label: "About Me" },
    { id: "skills", icon: <FaCode size={18} />, label: "Skills" },
    { id: "experience", icon: <FaBriefcase size={18} />, label: "Experience" },
    { id: "projects", icon: <FaProjectDiagram size={18} />, label: "Projects" },
    { id: "education", icon: <FaGraduationCap size={18} />, label: "Education" },
    { id: "contact", icon: <FaEnvelope size={18} />, label: "Contact" },
  ];

  // Tooltips - only for desktop view
  const [tooltipVisible, setTooltipVisible] = useState<string | null>(null);
  
  const handleItemClick = (itemId: string) => {
    onSelectCard(itemId);
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  // Mobile menu toggle button
  const MobileMenuToggle = () => (
    <motion.button
      className="mobile-menu-toggle"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      whileTap={{ scale: 0.95 }}
      aria-label={isMenuOpen ? "Close menu" : "Open menu"}
    >
      {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
    </motion.button>
  );

  // Render mobile menu
  if (isMobile) {
    return (
      <>
        <MobileMenuToggle />
        
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="mobile-sidebar"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {items.map((item) => {
                const isActive = activeCards.includes(item.id);
                return (
                <motion.button
                  key={item.id}
                    className={`mobile-sidebar-item ${isActive ? "active" : ""}`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleItemClick(item.id)}
                >
                    <span className="mobile-sidebar-icon">
                      {item.icon}
                      {isActive && <span className="mobile-close-indicator"></span>}
                    </span>
                    <span className="mobile-sidebar-label">{isActive ? `Close ${item.label}` : item.label}</span>
                </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Render desktop sidebar
  return (
    <div className="sidebar">
      {items.map((item) => {
        const isActive = activeCards.includes(item.id);
        return (
        <div key={item.id} className="relative">
          <motion.button
              className={`sidebar-button ${isActive ? "active" : ""}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleItemClick(item.id)}
            onMouseEnter={() => setTooltipVisible(item.id)}
            onMouseLeave={() => setTooltipVisible(null)}
            aria-label={item.label}
          >
              {isActive ? (
                <>
            {item.icon}
                  <span className="close-indicator"></span>
                </>
              ) : (
                item.icon
              )}
          </motion.button>

          {tooltipVisible === item.id && (
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute left-14 top-1/2 -translate-y-1/2 bg-card-bg px-2 py-1 rounded text-xs whitespace-nowrap z-50 border border-card-border"
            >
                {isActive ? `Close ${item.label}` : item.label}
            </motion.div>
          )}
        </div>
        );
      })}
    </div>
  );
} 