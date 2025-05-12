"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  color: string;
}

export default function ProjectsCard() {
  const [currentProject, setCurrentProject] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Pagey AI",
      description: "A modern web application that allows users to chat with their PDF documents using AI.",
      image: "/images/PageyAI.png",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Python", "FastAPI", "PostgreSQL", "Clerk", "OpenAI", "Vercel", "Render", "Neon"],
      githubUrl: "https://github.com/tintinguy01/pagey-ai",
      liveUrl: "https://pagey-ai.vercel.app/",
      color: "#3498db"
    },
    {
      id: 2,
      title: "TaskFlow",
      description: "A task management app that streamlines task management and scheduling with customizable categories and dynamic progress tracking.",
      image: "/images/TaskFlow.png",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Convex", "Clerk"],
      githubUrl: "https://github.com/tintinguy01/TaskFlow",
      liveUrl: "https://task-management-app-six-tau.vercel.app/",
      color: "#dbd834"
    },
    {
      id: 3,
      title: "Movirev",
      description: "A movie review website that allows users to search for movies, read reviews, and leave their own reviews.",
      image: "/images/Movirev.png",
      technologies: ["React", "EJS", "Express", "PostgreSQL", "CSS"],
      githubUrl: "https://github.com/tintinguy01/Movirev",
      liveUrl: "https://movirev.vercel.app/",
      color: "#2ecc71"
    },
  ];
  
  const nextProject = () => {
    setDirection(1);
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };
  
  const prevProject = () => {
    setDirection(-1);
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };
  
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    })
  };
  
  const currentPrj = projects[currentProject];
  
  return (
    <div className="flex flex-col w-full h-full overflow-hidden relative">
      <motion.h2 
        className="text-xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Featured Projects
      </motion.h2>
      
      <div className="flex-1 flex items-center justify-center relative px-4">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentProject}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full max-w-xl mx-auto"
          >
            <div className="relative rounded-xl overflow-hidden shadow-lg group">
              {/* Project Image With Overlay */}
              <div 
                className="h-48 relative cursor-pointer"
                onClick={() => setIsViewingDetails(!isViewingDetails)}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${currentPrj.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
                <div 
                  className="absolute inset-0 opacity-50" 
                  style={{ backgroundColor: currentPrj.color }} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                
                <motion.div 
                  className="absolute inset-0 flex items-center justify-center"
                  initial={false}
                  animate={{ opacity: isViewingDetails ? 0 : 1 }}
                >
                  <span className="text-white text-xl font-bold drop-shadow-lg text-center px-4">
                    {currentPrj.title}
                  </span>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-2 right-2 text-xs text-white/80 bg-black/30 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isViewingDetails ? 0 : 0.8 }}
                >
                  Click for details
                </motion.div>
              </div>
              
              {/* Project Details */}
              <AnimatePresence>
                {isViewingDetails && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4"
                    style={{ backgroundColor: `${currentPrj.color}10` }}
                  >
                    <motion.p 
                      className="text-sm mb-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {currentPrj.description}
                    </motion.p>
                    
                    <motion.div 
                      className="flex flex-wrap gap-1 mb-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {currentPrj.technologies.map((tech, index) => (
                        <motion.span 
                          key={tech} 
                          className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                          style={{ 
                            backgroundColor: `${currentPrj.color}20`,
                            color: currentPrj.color 
                          }}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + index * 0.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                    
                    <motion.div 
                      className="flex gap-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {currentPrj.githubUrl && (
                        <motion.a
                          href={currentPrj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1 rounded-md text-sm text-white bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaGithub size={14} />
                          <span>Code</span>
                        </motion.a>
                      )}
                      {currentPrj.liveUrl && (
                        <motion.a
                          href={currentPrj.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-3 py-1 rounded-md text-white text-sm hover:opacity-90 transition-colors"
                          style={{ backgroundColor: currentPrj.color }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaExternalLinkAlt size={12} />
                          <span>Live Demo</span>
                        </motion.a>
                      )}
                    </motion.div>
                    
                    <motion.button
                      onClick={() => setIsViewingDetails(false)}
                      className="mt-3 text-xs hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
                      style={{ color: currentPrj.color }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Close details
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation Buttons */}
        <motion.button
          className="absolute left-2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md hover:bg-white dark:hover:bg-gray-700 z-10 cursor-pointer"
          onClick={prevProject}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronLeft size={16} />
        </motion.button>
        
        <motion.button
          className="absolute right-2 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-md hover:bg-white dark:hover:bg-gray-700 z-10 cursor-pointer"
          onClick={nextProject}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaChevronRight size={16} />
        </motion.button>
      </div>
      
      {/* Dots for navigation */}
      <div className="flex justify-center gap-2 mt-4 mb-2">
        {projects.map((_, index) => (
          <motion.button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentProject ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
            }`}
            onClick={() => {
              setDirection(index > currentProject ? 1 : -1);
              setCurrentProject(index);
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          />
        ))}
      </div>
    </div>
  );
} 