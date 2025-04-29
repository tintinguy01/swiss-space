"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

export default function ExperienceCard() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
  const experiences: Experience[] = [
    {
      title: "Software Engineer Intern",
      company: "Flowon AI / Kenneth AI",
      location: "Remote Internship · United Kingdom",
      period: "Mar 2025 – Present",
      description: [
        "Accomplished seamless integration of a new campaign feature as measured by successful collaboration with backend engineers by developing and connecting frontend UI components to the API.",
        "Adapted quickly to project pivot from Flowon AI to Kenneth AI by seamlessly transitioning to a new workspace, codebase, and communication setup."
      ]
    },
    {
      title: "Researcher",
      company: "National Institute of Applied Science of Toulouse",
      location: "Toulouse, France",
      period: "Jun 2023 – Aug 2023",
      description: [
        "Accomplished accurate fluid simulation models as measured by validated output in Ansys by refining computational parameters and solving edge-case behaviors.",
        "Improved performance and simulation reliability as measured by output consistency by debugging and optimizing existing models."
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-3 p-3 h-full">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-xl font-bold mb-1">Work Experience</h2>
      </motion.div>
      
      <div className="space-y-3 overflow-auto">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 dark:bg-black/5 rounded-lg p-3 border border-black/10 dark:border-white/10 shadow-sm min-h-[135px]"
          >
            <div 
              className="cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 rounded-lg h-full"
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            >
              <div className="relative min-h-[90px]">
                {/* Date and location in top right corner */}
                <div className="text-xs opacity-75 absolute right-0 bottom-0 text-right">
                  <div className="flex items-center justify-end whitespace-nowrap mb-1">
                    <FaCalendarAlt className="inline-block mr-1 flex-shrink-0" size={10} />
                    <span>{exp.period}</span>
                  </div>
                  <div className="flex items-center justify-end whitespace-nowrap">
                    <FaMapMarkerAlt className="inline-block mr-1 flex-shrink-0" size={10} />
                    <span>{exp.location}</span>
                  </div>
                </div>
                
                {/* Job title and company with space for date/location */}
                <div className="pr-[170px]">
                  <h3 className="text-base font-semibold flex items-center">
                    <FaBriefcase className="inline-block mr-2 text-primary flex-shrink-0" />
                    {exp.title}
                  </h3>
                  <p className="text-sm font-medium">{exp.company}</p>
                </div>
              </div>
              
              {expandedIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 pt-2 border-t border-black/10 dark:border-white/10"
                >
                  <ul className="list-disc pl-5 space-y-1.5">
                    {exp.description.map((item, i) => (
                      <li key={i}>
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-xs leading-relaxed"
                        >
                          {item}
                        </motion.p>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}