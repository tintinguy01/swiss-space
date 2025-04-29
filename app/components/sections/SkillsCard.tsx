"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCode, 
  FaReact, 
  FaNodeJs, 
  FaDatabase, 
  FaPython, 
  FaJs, 
  FaHtml5, 
  FaCss3,
  FaInfoCircle
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiExpress, SiMongodb, SiPostgresql } from "react-icons/si";

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: string;
  level?: number; // 1-5 skill level
}

export default function SkillsCard() {
  const [filter, setFilter] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [showLevelInfo, setShowLevelInfo] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  
  // Set initial render to false after component mounts
  useEffect(() => {
    setIsInitialRender(false);
  }, []);
  
  const skills: Skill[] = [
    { name: "JavaScript", icon: <FaJs size={24} />, category: "languages", level: 3 },
    { name: "TypeScript", icon: <SiTypescript size={24} />, category: "languages", level: 4 },
    { name: "Python", icon: <FaPython size={24} />, category: "languages", level: 4 },
    { name: "HTML", icon: <FaHtml5 size={24} />, category: "languages", level: 4 },
    { name: "CSS", icon: <FaCss3 size={24} />, category: "languages", level: 3 },
    { name: "React", icon: <FaReact size={24} />, category: "frontend", level: 4 },
    { name: "Next.js", icon: <SiNextdotjs size={24} />, category: "frontend", level: 4 },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={24} />, category: "frontend", level: 3 },
    { name: "Node.js", icon: <FaNodeJs size={24} />, category: "backend", level: 3 },
    { name: "Express", icon: <SiExpress size={24} />, category: "backend", level: 3 },
    { name: "MongoDB", icon: <SiMongodb size={24} />, category: "database", level: 1 },
    { name: "PostgreSQL", icon: <SiPostgresql size={24} />, category: "database", level: 1 },
  ];
  
  const filteredSkills = filter 
    ? skills.filter(skill => skill.category === filter)
    : skills;
    
  const categories = [
    { name: "languages", icon: <FaCode size={16} /> },
    { name: "frontend", icon: <FaReact size={16} /> },
    { name: "backend", icon: <FaNodeJs size={16} /> },
    { name: "database", icon: <FaDatabase size={16} /> },
  ];
  
  // Get text representation of skill level
  const getSkillLevelText = (level: number = 3) => {
    const levels = [
      'Beginner',
      'Basic',
      'Intermediate',
      'Advanced',
      'Expert'
    ];
    return levels[level - 1] || levels[2];
  };
  
  // Get the color for a skill based on its level
  const getSkillLevelColor = (level: number = 3) => {
    const colors = {
      light: [
        'rgba(200, 200, 200, 0.7)', // Level 1
        'rgba(102, 178, 255, 0.7)',  // Level 2
        'rgba(52, 152, 219, 0.7)',   // Level 3
        'rgba(41, 128, 185, 0.7)',   // Level 4
        'rgba(33, 150, 243, 0.8)'    // Level 5
      ],
      dark: [
        'rgba(150, 150, 150, 0.7)', // Level 1
        'rgba(102, 178, 255, 0.7)',  // Level 2
        'rgba(52, 152, 219, 0.7)',   // Level 3
        'rgba(41, 128, 185, 0.7)',   // Level 4
        'rgba(33, 150, 243, 0.8)'    // Level 5
      ]
    };
    return {
      light: colors.light[level - 1] || colors.light[2],
      dark: colors.dark[level - 1] || colors.dark[2]
    };
  };

  return (
    <div className="flex flex-col gap-4 p-2 w-full h-full">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative"
      >
        <h2 className="text-xl font-bold mb-2">Technical Skills</h2>
        
        {/* Skill levels indicator */}
        <div className="absolute top-0 right-0">
          <div 
            className="flex items-center gap-1 cursor-pointer p-1 rounded"
            onMouseEnter={() => setShowLevelInfo(true)}
            onMouseLeave={() => setShowLevelInfo(false)}
          >
            <FaInfoCircle size={16} className="text-primary" />
          </div>
          
          <AnimatePresence>
            {showLevelInfo && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute top-full right-0 mt-1 p-2 text-white bg-black/90 shadow-lg rounded-md border border-gray-700 z-10 text-left w-40 "
              >
                <h4 className="text-xs font-semibold mb-1">Skill Levels:</h4>
                <ul className="text-xs space-y-1">
                  <li className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                    <span>1: Beginner</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-300"></span>
                    <span>2: Basic</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    <span>3: Intermediate</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    <span>4: Advanced</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>5: Expert</span>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {categories.map((category) => (
          <motion.button
            key={category.name}
            onClick={() => setFilter(filter === category.name ? null : category.name)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm ${
              filter === category.name 
                ? 'bg-primary shadow-md' 
                : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20'
            } transition-all cursor-pointer hover:shadow-md`}
            whileHover={isInitialRender ? {} : { scale: 1.05, y: -2 }}
            whileTap={isInitialRender ? {} : { scale: 0.95 }}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="capitalize">{category.name}</span>
          </motion.button>
        ))}
      </div>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full"
        layout={false}
      >
        <AnimatePresence>
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={isInitialRender ? false : { opacity: 0, scale: 0.8 }}
              animate={isInitialRender ? {} : { opacity: 1, scale: 1 }}
              exit={isInitialRender ? {} : { opacity: 0, scale: 0.8 }}
              transition={{ delay: isInitialRender ? 0 : index * 0.05 }}
              layout={false}
              className="flex flex-col p-3 rounded-lg relative border border-black/10 dark:border-white/10 min-h-[80px]"
              style={{ 
                backgroundColor: hoveredSkill === skill.name 
                  ? `var(--skill-bg-color, ${getSkillLevelColor(skill.level).dark})` 
                  : 'var(--card-bg-color, rgba(0, 0, 0, 0.05))',
                color: hoveredSkill === skill.name ? 'white' : 'inherit',
                '--skill-bg-color': getSkillLevelColor(skill.level).dark,
                '--card-bg-color': 'rgba(0, 0, 0, 0.05)',
                '--text-color': hoveredSkill === skill.name ? 'white' : 'inherit'
              } as React.CSSProperties}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`text-primary flex-shrink-0 transition-colors ${hoveredSkill === skill.name ? 'text-white' : ''}`}>
                  {skill.icon}
                </div>
                <span className="font-medium break-words">{skill.name}</span>
              </div>
              
              {/* Fixed size skill level tag to prevent layout shifts */}
              <div className="mt-auto">
                <div className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${
                  hoveredSkill === skill.name 
                    ? 'bg-white/20 text-white' 
                    : 'bg-primary/10 text-primary'
                }`} style={{ width: '90px', textAlign: 'center' }}>
                  {getSkillLevelText(skill.level)}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      <style jsx global>{`
        :root {
          --card-light-bg: rgba(240, 240, 240, 0.5);
          --card-dark-bg: rgba(0, 0, 0, 0.05);
        }
        
        .dark [style*="--card-bg-color"] {
          --card-bg-color: rgba(255, 255, 255, 0.05) !important;
        }
        
        @media (prefers-color-scheme: light) {
          [style*="--card-bg-color"] {
            --card-bg-color: var(--card-light-bg) !important;
          }
        }
      `}</style>
    </div>
  );
}