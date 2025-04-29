"use client";

import { motion } from "framer-motion";
import { FaGithub, FaEnvelope, FaMapMarkerAlt, FaPhone, FaFileDownload } from "react-icons/fa";
import { toast } from '../../../components/ui/toast';

const MentionLink = ({ children, href }: { children: React.ReactNode; href: string }) => (
  <motion.a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-blue-600 dark:text-blue-400 inline-flex items-center gap-1"
    whileHover={{ scale: 1.02, y: -1 }}
    whileTap={{ scale: 0.98 }}
  >
    {children}
    <span className="text-xs opacity-80">↗</span>
  </motion.a>
);

export default function AboutCard() {
  const handleDownloadResume = () => {
    // You'll need to replace this with the actual path to your resume file
    const resumeUrl = '/Swiss-Resume-101.pdf';
    
    // Create a temporary link and trigger the download
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Swiss-Resume-101.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success toast
    toast.success('Resume Downloaded', 'The resume has been downloaded successfully.');
  };

  return (
    <div className="flex flex-col gap-3 p-3 h-full">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold mb-1">Swiss Tangsatjatham</h2>
        <p className="text-lg font-medium">Full-Stack Developer & Aerospace Engineer</p>
        
        <motion.button
          onClick={handleDownloadResume}
          className="mt-2 px-4 py-2 bg-primary text-white rounded-lg inline-flex items-center gap-2
                   hover:bg-primary/90 transition-all shadow-sm text-sm cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Download Resume</span>
          <FaFileDownload size={14} />
        </motion.button>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-1.5"
      >
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-primary min-w-[16px]" />
          <p className="text-sm">98 Nakniwat 48 yeak 7 Ladprao, Bangkok, TH 10230</p>
        </div>
        <div className="flex items-center gap-2">
          <FaEnvelope className="text-primary min-w-[16px]" />
          <MentionLink href="mailto:tintinguy01@gmail.com">
            tintinguy01@gmail.com
          </MentionLink>
        </div>
        <div className="flex items-center gap-2">
          <FaGithub className="text-primary min-w-[16px]" />
          <MentionLink href="https://github.com/tintinguy01">
            github.com/tintinguy01
          </MentionLink>
        </div>
        <div className="flex items-center gap-2">
          <FaPhone className="text-primary min-w-[16px]" />
          <p className="text-sm">+66 85-571-2486</p>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-2 space-y-1.5"
      >
        <h3 className="text-lg font-semibold">Professional Summary</h3>
        <p className="text-sm leading-relaxed">
          Self-taught full-stack developer with a background in aerospace engineering. 
          Passionate about building intuitive and responsive user interfaces with real-world impact. 
          Strong experience with modern web technologies including React, Next.js, TypeScript, and FastAPI.
        </p>
      </motion.div>
    </div>
  );
} 