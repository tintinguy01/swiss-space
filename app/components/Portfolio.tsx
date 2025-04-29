"use client";

import { useState, useEffect } from "react";
import Workspace from "./ui/Workspace";
import DraggableCard from "./ui/DraggableCard";
import Sidebar from "./ui/Sidebar";
import ThemeToggle from "./ui/ThemeToggle";
import WelcomeCard from "./sections/WelcomeCard";
import AboutCard from "./sections/AboutCard";
import SkillsCard from "./sections/SkillsCard";
import ExperienceCard from "./sections/ExperienceCard";
import ProjectsCard from "./sections/ProjectsCard";
import EducationCard from "./sections/EducationCard";
import ContactCard from "./sections/ContactCard";

interface Card {
  id: string;
  title: string;
  component: React.ReactNode;
  position: { x: number; y: number };
  width?: number;
  height?: number;
  color?: string;
  visible: boolean;
  zIndex?: number;
}

// Define a type for the positions object
interface PositionsType {
  welcome: { x: number; y: number };
  about: { x: number; y: number };
  skills: { x: number; y: number };
  experience: { x: number; y: number };
  projects: { x: number; y: number };
  education: { x: number; y: number };
  contact: { x: number; y: number };
  mobileWidth: number | undefined;
  mobileHeight: number | undefined;
}

export default function Portfolio() {
  const [cards, setCards] = useState<Card[]>([]);
  const [activeCards, setActiveCards] = useState<string[]>([]);
  const [highestZIndex, setHighestZIndex] = useState(1);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screens
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

  // Calculate positions based on screen size
  const calculatePositions = (): PositionsType => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // If mobile, use centered positioning
    if (isMobile) {
      const mobileWidth = Math.min(450, window.innerWidth - 20);
      const mobileHeight = 600; // Increased height for welcome card
      const mobileX = 0; // Will be centered with CSS transform
      const mobileY = 0; // Will be centered with CSS transform
      
      return {
        welcome: { x: mobileX, y: mobileY },
        about: { x: mobileX, y: mobileY },
        skills: { x: mobileX, y: mobileY },
        experience: { x: mobileX, y: mobileY },
        projects: { x: mobileX, y: mobileY },
        education: { x: mobileX, y: mobileY },
        contact: { x: mobileX, y: mobileY },
        mobileWidth,
        mobileHeight
      };
    }
    
    // Desktop positioning (spread around the center)
    return {
      welcome: { x: centerX - 300, y: centerY - 250 },
      about: { x: centerX - 400, y: centerY - 300 },
      skills: { x: centerX + 150, y: centerY - 250 },
      experience: { x: centerX - 500, y: centerY + 50 },
      projects: { x: centerX + 100, y: centerY + 150 },
      education: { x: centerX - 200, y: centerY + 200 },
      contact: { x: centerX + 200, y: centerY - 50 },
      mobileWidth: undefined,
      mobileHeight: undefined
    };
  };

  // Initialize cards with initial positions
  useEffect(() => {
    const positions = calculatePositions();
    
    // Try to retrieve any saved card dimensions from localStorage
    let savedDimensions: Record<string, {width: number, height: number}> = {};
    try {
      const saved = localStorage.getItem('cardDimensions');
      if (saved) {
        savedDimensions = JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error loading saved dimensions:", e);
    }
    
    const initialCards: Card[] = [
      {
        id: "welcome",
        title: "Welcome",
        component: <WelcomeCard />,
        position: positions.welcome,
        width: savedDimensions.welcome?.width || (isMobile ? positions.mobileWidth : 600),
        height: savedDimensions.welcome?.height || (isMobile ? positions.mobileHeight : 500),
        color: "#2196f3",
        visible: true
      },
      {
        id: "about",
        title: "About Me",
        component: <AboutCard />,
        position: positions.about,
        width: savedDimensions.about?.width || (isMobile ? positions.mobileWidth : 450),
        height: savedDimensions.about?.height || (isMobile ? positions.mobileHeight : 500),
        visible: false
      },
      {
        id: "skills",
        title: "Skills",
        component: <SkillsCard />,
        position: positions.skills,
        width: savedDimensions.skills?.width || (isMobile ? positions.mobileWidth : 550),
        height: savedDimensions.skills?.height || (isMobile ? positions.mobileHeight : 550),
        visible: false
      },
      {
        id: "experience",
        title: "Experience",
        component: <ExperienceCard />,
        position: positions.experience,
        width: savedDimensions.experience?.width || (isMobile ? positions.mobileWidth : 500),
        height: savedDimensions.experience?.height || (isMobile ? positions.mobileHeight : 500),
        visible: false
      },
      {
        id: "projects",
        title: "Projects",
        component: <ProjectsCard />,
        position: positions.projects,
        width: savedDimensions.projects?.width || (isMobile ? positions.mobileWidth : 500),
        height: savedDimensions.projects?.height || (isMobile ? positions.mobileHeight : 550),
        visible: false
      },
      {
        id: "education",
        title: "Education",
        component: <EducationCard />,
        position: positions.education,
        width: savedDimensions.education?.width || (isMobile ? positions.mobileWidth : 450),
        height: savedDimensions.education?.height || (isMobile ? positions.mobileHeight : 500),
        visible: false
      },
      {
        id: "contact",
        title: "Contact",
        component: <ContactCard />,
        position: positions.contact,
        width: savedDimensions.contact?.width || (isMobile ? positions.mobileWidth : 700),
        height: savedDimensions.contact?.height || (isMobile ? positions.mobileHeight : 550),
        visible: false
      }
    ];
    
    setCards(initialCards);
    setActiveCards(['welcome']); // Only welcome card is active initially
    setIsMounted(true);
  }, [isMobile]);

  // On mobile, if screen size changes, recalculate card positions
  useEffect(() => {
    if (!isMounted) return;
    
    // Skip this effect for mobile devices to avoid update loops
    if (isMobile) return;
    
    const positions = calculatePositions();
    
    // Update card positions but preserve user-set dimensions
    setCards(prevCards => 
      prevCards.map(card => ({
        ...card,
        position: positions[card.id as keyof typeof positions] as { x: number; y: number },
        // Only set default dimensions if not already set by user
        width: card.width || (isMobile ? positions.mobileWidth : getDefaultWidth(card.id)),
        height: card.height || (isMobile ? positions.mobileHeight : getDefaultHeight(card.id))
      }))
    );
  }, [isMobile, isMounted]);

  // Helper functions to get default dimensions
  const getDefaultWidth = (cardId: string) => {
    switch (cardId) {
      case "welcome": return 600;
      case "about": return 450;
      case "skills": return 550;
      case "experience": return 500;
      case "projects": return 500;
      case "education": return 450;
      case "contact": return 700;
      default: return 500;
    }
  };
  
  const getDefaultHeight = (cardId: string) => {
    switch (cardId) {
      case "welcome": return 500;
      case "about": return 500;
      case "skills": return 550;
      case "experience": return 500;
      case "projects": return 550;
      case "education": return 500;
      case "contact": return 550;
      default: return 500;
    }
  };

  const bringCardToFront = (id: string) => {
    const newZIndex = highestZIndex + 1;
    setHighestZIndex(newZIndex);
    
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === id ? { ...card, zIndex: newZIndex } : card
      )
    );
  };

  const handleCardDragEnd = (id: string, newPos: { x: number; y: number }) => {
    setCards(prevCards =>
      prevCards.map(card =>
        card.id === id ? { ...card, position: newPos } : card
      )
    );
  };
  
  // Add a new function to update card dimensions
  const handleCardResize = (id: string, newWidth: number, newHeight: number) => {
    // Use setTimeout to avoid updating state during render
    setTimeout(() => {
      setCards(prevCards => {
        const updatedCards = prevCards.map(card =>
          card.id === id ? { ...card, width: newWidth, height: newHeight } : card
        );
        
        // Save all card dimensions to localStorage
        try {
          const dimensionsToSave = updatedCards.reduce((acc, card) => {
            if (card.width && card.height) {
              acc[card.id] = { width: card.width, height: card.height };
            }
            return acc;
          }, {} as Record<string, {width: number, height: number}>);
          
          localStorage.setItem('cardDimensions', JSON.stringify(dimensionsToSave));
        } catch (e) {
          console.error("Error saving card dimensions:", e);
        }
        
        return updatedCards;
      });
    }, 0);
  };
  
  const toggleCardVisibility = (id: string) => {
    // On mobile, we want to open the selected card and close all others
    if (isMobile) {
      const isCurrentlyVisible = cards.find(card => card.id === id)?.visible;
      
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === id 
            ? { ...card, visible: !isCurrentlyVisible } 
            : isCurrentlyVisible ? card : { ...card, visible: false }
        )
      );
      
      // Update active cards list
      setActiveCards(prev => {
        const cardIsVisible = prev.includes(id);
        if (cardIsVisible) {
          return prev.filter(cardId => cardId !== id);
        } else {
          // On mobile, only show one card at a time
          return [id];
        }
      });
    } else {
      // Desktop behavior - toggle the specific card
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === id ? { ...card, visible: !card.visible } : card
        )
      );
      
      // Update active cards list
      setActiveCards(prev => {
        const cardIsVisible = prev.includes(id);
        if (cardIsVisible) {
          return prev.filter(cardId => cardId !== id);
        } else {
          return [...prev, id];
        }
      });
    }
  };
  
  // Handle sidebar card selection
  const handleSelectCard = (cardId: string) => {
    // Find the card to toggle
    const cardToToggle = cards.find(card => card.id === cardId);
    
    if (cardToToggle) {
      // If card is not visible, make it visible and bring to front
      if (!cardToToggle.visible) {
        toggleCardVisibility(cardId);
        setTimeout(() => bringCardToFront(cardId), 100);
      } else {
        // If already visible, toggle it off (close it) instead of just bringing to front
        toggleCardVisibility(cardId);
      }
    }
  };
  
  // Filter for visible cards
  const visibleCards = cards.filter(card => card.visible);

  if (!isMounted) return null;

  return (
    <div className={`h-screen w-screen overflow-hidden ${isMobile ? 'mobile-portfolio' : ''}`}>
      <Workspace isMobile={isMobile}>
        {visibleCards.map((card, index) => (
          <DraggableCard
            key={card.id}
            id={card.id}
            title={card.title}
            initialPos={card.position}
            width={card.width}
            height={card.height}
            bgColor={card.color}
            zIndex={card.zIndex || index + 1}
            onDragEnd={handleCardDragEnd}
            bringToFront={bringCardToFront}
            onClose={() => toggleCardVisibility(card.id)}
            onResize={handleCardResize}
          >
            {card.component}
          </DraggableCard>
        ))}
      </Workspace>
      
      {/* Theme Toggle */}
      <ThemeToggle isMobile={isMobile} />
      
      {/* Sidebar */}
      <Sidebar 
        onSelectCard={handleSelectCard}
        activeCards={activeCards}
      />
    </div>
  );
} 