"use client";

import { motion } from "framer-motion";
import { FaGraduationCap, FaCalendarAlt, FaCertificate, FaLanguage, FaCircle } from "react-icons/fa";

export default function EducationCard() {
  return (
    <div className="flex flex-col gap-3 p-3 h-full">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-xl font-bold mb-1">Education & Certifications</h2>
      </motion.div>
      
      <div className="space-y-3 overflow-auto">
        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 dark:bg-black/5 rounded-lg p-3 border border-black/10 dark:border-white/10 shadow-sm"
        >
          <div className="border-l-2 border-primary pl-3 relative">
            <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1"></div>
            
            <div className="mb-1">
              <h3 className="text-base font-semibold flex items-center">
                <FaGraduationCap className="inline-block mr-2 text-primary" />
                Chulalongkorn University
              </h3>
              <p className="text-sm">Bachelor of Engineering in Aerospace Engineering</p>
              <p className="text-xs opacity-75 flex items-center mt-1">
                <FaCalendarAlt className="inline-block mr-1" size={12} />
                <span>Aug 2020 – Jun 2024</span>
              </p>
            </div>
            <p className="text-xs">International Program</p>
          </div>
        </motion.div>
        
        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 dark:bg-black/5 rounded-lg p-3 border border-black/10 dark:border-white/10 shadow-sm"
        >
          <h3 className="text-base font-semibold mb-2 flex items-center">
            <FaCertificate className="inline-block mr-2 text-primary" />
            Certifications
          </h3>
          
          <ul className="space-y-3">
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-start"
            >
              <FaCircle className="text-primary flex-shrink-0 mt-1.5 mr-2" size={8} />
              <div>
                <span className="text-sm font-medium">Complete 2024 Web Development Bootcamp</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">Dr. Angela Yu</p>
              </div>
            </motion.li>
            
            <motion.li
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-start"
            >
              <FaCircle className="text-primary flex-shrink-0 mt-1.5 mr-2" size={8} />
              <div>
                <span className="text-sm font-medium">Machine Learning A-Z</span>
                <p className="text-xs text-gray-500 dark:text-gray-400">AI, Python & R + ChatGPT</p>
              </div>
            </motion.li>
          </ul>
        </motion.div>
        
        {/* Languages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/5 dark:bg-black/5 rounded-lg p-3 border border-black/10 dark:border-white/10 shadow-sm"
        >
          <h3 className="text-base font-semibold mb-2 flex items-center">
            <FaLanguage className="inline-block mr-2 text-primary" />
            Languages
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <div className="text-sm">
              <span className="font-medium">Thai:</span> Native
            </div>
            <div className="text-sm">
              <span className="font-medium">English:</span> Fluent
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 