"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

export default function WelcomeCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
  
  // Animated background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    const particles: {
      x: number;
      y: number;
      radius: number;
      color: string;
      speedX: number;
      speedY: number;
      alpha: number;
      growing: boolean;
    }[] = [];
    
    const colors = ["#2196f3", "#ff5252", "#ffcc00"];
    
    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.random() * 2 - 1,
        speedY: Math.random() * 2 - 1,
        alpha: Math.random() * 0.5 + 0.1,
        growing: Math.random() > 0.5
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Pulse effect - grow and shrink
        if (particle.growing) {
          particle.radius += 0.02;
          if (particle.radius > 4) {
            particle.growing = false;
          }
        } else {
          particle.radius -= 0.02;
          if (particle.radius < 1) {
            particle.growing = true;
          }
        }
        
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.globalAlpha = particle.alpha;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };
    
    let animationFrameId = requestAnimationFrame(animate);
    
    // Text animation
    const title = document.querySelector(".welcome-title");
    if (title) {
      gsap.fromTo(
        title,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
    
    const subtitle = document.querySelector(".welcome-subtitle");
    if (subtitle) {
      gsap.fromTo(
        subtitle,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
      );
    }
    
    const instructions = document.querySelector(".welcome-instructions");
    if (instructions) {
      gsap.fromTo(
        instructions,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1, ease: "power3.out" }
      );
    }
    
    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`flex flex-col justify-between items-center p-6 h-full relative overflow-y-auto ${isMobile ? 'min-h-[600px]' : ''}`}>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      <motion.div
        animate={{ scale: [0.9, 1.1, 1] }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="relative z-10 mt-4 w-full"
      >
        <h1 className="welcome-title text-2xl md:text-3xl sm:text-4xl font-bold text-center bg-clip-text text-white bg-gradient-to-r from-primary via-accent to-secondary">
          Welcome to My Portfolio
        </h1>
        <p className="welcome-subtitle text-xl md:text-2xl mt-4 text-center text-white">
          I&apos;m Swiss Tangsatjatham, a Full-Stack Developer & Aerospace Engineer
        </p>
      </motion.div>
      
      <div className="welcome-instructions text-center relative z-10 w-full mt-8">
        <p className="text-lg md:text-xl mb-4 text-white">Feel free to explore this interactive portfolio!</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center md:flex-wrap mb-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="instruction-item flex flex-col items-center px-5 py-2.5 rounded-lg bg-card-bg text-white border border-card-border backdrop-blur-sm shadow-md w-full md:w-auto"
          >
            <span className="text-base font-medium mb-1 text-white">Click icons in sidebar</span>
            <span className="text-sm opacity-75 text-white">to open different sections</span>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="instruction-item flex flex-col items-center text-white px-5 py-2.5 rounded-lg bg-card-bg border border-card-border backdrop-blur-sm shadow-md w-full md:w-auto"
          >
            <span className="text-base font-medium mb-1 ">{isMobile ? "Tap and drag cards" : "Drag cards around"}</span>
            <span className="text-sm opacity-75">{isMobile ? "to reposition them" : "to organize your workspace"}</span>
          </motion.div>
        </div>
        
        {!isMobile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="instruction-item inline-flex flex-col items-center text-white px-5 py-2.5 rounded-lg bg-card-bg border border-card-border backdrop-blur-sm shadow-md mb-8"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="mb-1"
            >
              <span className="inline-block w-5 h-5 border-2 border-primary rounded-full"></span>
            </motion.div>
            <span className="text-base font-medium">Scroll to zoom</span>
          </motion.div>
        )}
        
        {isMobile && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="instruction-item inline-flex flex-col items-center text-white px-5 py-2.5 rounded-lg bg-card-bg border border-card-border backdrop-blur-sm shadow-md mb-8"
          >
            <span className="text-base font-medium">One card at a time</span>
            <span className="text-sm opacity-75">for optimal mobile experience</span>
          </motion.div>
        )}
      </div>
    </div>
  );
} 