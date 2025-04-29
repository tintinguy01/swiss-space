"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  FaCode, 
  FaReact, 
  FaNodeJs, 
  FaDatabase, 
  FaPython, 
  FaJs, 
  FaHtml5, 
  FaCss3
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
  
  const skills: Skill[] = [
    { name: "JavaScript", icon: <FaJs size={24} />, category: "languages", level: 3 },
    { name: "TypeScript", icon: <SiTypescript size={24} />, category: "languages", level: 4 },
    { name: "Python", icon: <FaPython size={24} />, category: "languages", level: 4 },
    { name: "HTML", icon: <FaHtml5 size={24} />, category: "languages", level: 5 },
    { name: "CSS", icon: <FaCss3 size={24} />, category: "languages", level: 3 },
    { name: "React", icon: <FaReact size={24} />, category: "frontend", level: 5 },
    { name: "Next.js", icon: <SiNextdotjs size={24} />, category: "frontend", level: 5 },
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
  
  // Get the color for a skill based on its level
  const getSkillLevelColor = (level: number = 3) => {
    const colors = [
      'rgba(150, 150, 150, 0.7)', // Level 1
      'rgba(102, 178, 255, 0.7)',  // Level 2
      'rgba(52, 152, 219, 0.7)',   // Level 3
      'rgba(41, 128, 185, 0.7)',   // Level 4
      'rgba(33, 150, 243, 0.8)'    // Level 5
    ];
    return colors[level - 1] || colors[2];
  };

  return (
    <div className="flex flex-col gap-4 p-2 w-full h-full">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-xl font-bold mb-2">Technical Skills</h2>
      </motion.div>
      
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {categories.map((category) => (
          <motion.button
            key={category.name}
            onClick={() => setFilter(filter === category.name ? null : category.name)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm ${
              filter === category.name 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20'
            } transition-all cursor-pointer hover:shadow-md`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-lg">{category.icon}</span>
            <span className="capitalize">{category.name}</span>
          </motion.button>
        ))}
      </div>
      
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full"
        layout
      >
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            layout
            className="flex items-center gap-2 p-3 rounded-lg relative overflow-hidden group border border-black/10 dark:border-white/10"
            style={{ 
              background: hoveredSkill === skill.name 
                ? getSkillLevelColor(skill.level) 
                : 'rgba(0,0,0,0.05)',
              color: hoveredSkill === skill.name ? 'white' : 'inherit'
            }}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
            whileHover={{ scale: 1.05 }}
          >
            <div className={`text-primary flex-shrink-0 transition-colors ${hoveredSkill === skill.name ? 'text-white' : ''}`}>
              {skill.icon}
            </div>
            <span className="font-medium truncate">{skill.name}</span>
            
            {/* Skill level indicator */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/5 dark:bg-white/5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(skill.level || 3) * 20}%` }}
                transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
                className="h-full" 
                style={{ 
                  background: hoveredSkill === skill.name 
                    ? 'rgba(255,255,255,0.8)' 
                    : 'var(--primary)'
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 