"use client";

import { useState, useRef, ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import { MdClose, MdOutlineDragIndicator } from "react-icons/md";

interface DraggableCardProps {
  id: string;
  title: string;
  initialPos: { x: number; y: number };
  children: ReactNode;
  width?: number;
  height?: number;
  onClose?: () => void;
  bgColor?: string;
  zIndex?: number;
  onDragEnd?: (id: string, pos: { x: number; y: number }) => void;
  bringToFront?: (id: string) => void;
}

export default function DraggableCard({
  id,
  title,
  initialPos,
  children,
  width = 400,
  height = 350,
  onClose,
  bgColor,
  zIndex = 1,
  onDragEnd,
  bringToFront,
}: DraggableCardProps) {
  const [position, setPosition] = useState(initialPos);
  const [isDragging, setIsDragging] = useState(false);
  const [dimensions, setDimensions] = useState({ width, height });
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Check if on mobile device and update dimensions accordingly
  const initialPosRef = useRef(true);
  
  // Initialize mobile card position
  useEffect(() => {
    if (isMobile && initialPosRef.current) {
      initialPosRef.current = false;
      const mobileWidth = Math.min(window.innerWidth - 20, width);
      const mobileHeight = Math.min(window.innerHeight - 100, height);
      
      const newPosX = (window.innerWidth - mobileWidth) / 2;
      const newPosY = Math.max(70, (window.innerHeight - mobileHeight) / 3);
      
      setPosition({ x: newPosX, y: newPosY });
      
      if (onDragEnd) {
        onDragEnd(id, { x: newPosX, y: newPosY });
      }
    }
  }, [isMobile, id, width, height, onDragEnd]);
  
  // Check if on mobile device and update dimensions accordingly
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      if (mobile) {
        // For mobile, adjust card size but keep it draggable
        const mobileWidth = Math.min(window.innerWidth - 20, width); // 10px padding on each side
        const mobileHeight = Math.min(window.innerHeight - 100, height); // Leave space for controls
        setDimensions({ 
          width: mobileWidth, 
          height: mobileHeight 
        });
      } else {
        // Reset to original dimensions
        setDimensions({ width, height });
      }
    };
    
    // Initialize
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [id, width, height, initialPos]);
  
  const handleResize = (direction: string, movementX: number, movementY: number) => {
    setDimensions(prev => {
      const newWidth = direction.includes("e") 
        ? Math.max(280, prev.width + movementX)
        : direction.includes("w") 
          ? Math.max(280, prev.width - movementX)
          : prev.width;
          
      const newHeight = direction.includes("s")
        ? Math.max(200, prev.height + movementY)
        : direction.includes("n")
          ? Math.max(200, prev.height - movementY)
          : prev.height;
          
      return { width: newWidth, height: newHeight };
    });
    
    if (direction.includes("w")) {
      setPosition(prev => ({ ...prev, x: prev.x + movementX }));
    }
    
    if (direction.includes("n")) {
      setPosition(prev => ({ ...prev, y: prev.y + movementY }));
    }
  };
  
  const customCardStyle = bgColor ? { 
    background: bgColor,
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    zIndex 
  } : {
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    zIndex
  };

  return (
    <motion.div
      ref={cardRef}
      className={`draggable-card ${isMobile ? 'mobile-card' : ''} ${isDragging ? 'dragging' : ''}`}
      style={customCardStyle}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: position.x,
        y: position.y
      }}
      transition={{ 
        type: "spring",
        stiffness: 500,
        damping: 40,
        mass: 1
      }}
      drag={true}
      dragMomentum={false}
      dragTransition={{ 
        power: 0,
        timeConstant: 0,
      }}
      dragElastic={0}
      whileDrag={{ 
        scale: 1.02, 
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        cursor: "grabbing" 
      }}
      onDragStart={() => {
        setIsDragging(true);
        if (bringToFront) bringToFront(id);
        
        // For mobile dragging, apply custom CSS variables
        if (isMobile && cardRef.current) {
          cardRef.current.style.setProperty('--drag-x', `0px`);
          cardRef.current.style.setProperty('--drag-y', `0px`);
        }
      }}
      onDrag={(e, info) => {
        // For mobile dragging, update CSS variables
        if (isMobile && cardRef.current) {
          cardRef.current.style.setProperty('--drag-x', `${info.offset.x}px`);
          cardRef.current.style.setProperty('--drag-y', `${info.offset.y}px`);
        }
      }}
      onDragEnd={(e, info) => {
        setIsDragging(false);
        
        if (isMobile) {
          // For mobile, only update the Y position
          const newPos = {
            x: position.x,
            y: position.y + info.offset.y
          };
          setPosition(newPos);
          if (onDragEnd) onDragEnd(id, newPos);
        } else {
          // For desktop, update both X and Y
        const newPos = { 
          x: position.x + info.offset.x, 
          y: position.y + info.offset.y 
        };
        setPosition(newPos);
        if (onDragEnd) onDragEnd(id, newPos);
        }
      }}
      onClick={() => {
        if (bringToFront) bringToFront(id);
      }}
    >
      <div 
        className="card-handle" 
        style={{ 
          cursor: isDragging ? "grabbing" : "grab", 
          background: bgColor ? "rgba(0,0,0,0.1)" : undefined 
        }}
      >
        <div className="flex items-center gap-2">
          <MdOutlineDragIndicator size={16} />
          <span className="card-title truncate">{title}</span>
        </div>
        {onClose && (
          <button 
            onClick={onClose} 
            className="close-button text-white/80 hover:text-white hover:bg-red-500/20 rounded-full p-1 transition-colors"
            aria-label="Close card"
          >
            <MdClose size={16} />
          </button>
        )}
      </div>
      <div 
        ref={contentRef}
        className="card-content responsive-content overflow-y-auto"
        style={{ maxHeight: isMobile ? '70vh' : 'auto' }}
      >
        {children}
      </div>
      
      {/* Resize handles - now work on mobile too */}
      <div 
        className={`resizable-handle se ${isMobile ? 'mobile-resize-handle' : ''}`}
        onMouseDown={(e) => {
          e.stopPropagation();
          
          let startX = e.clientX;
          let startY = e.clientY;
          
          const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
            const dx = mouseMoveEvent.clientX - startX;
            const dy = mouseMoveEvent.clientY - startY;
            handleResize("se", dx, dy);
            
            // Update starting position for smoother, incremental movement
            startX = mouseMoveEvent.clientX;
            startY = mouseMoveEvent.clientY;
          };
          
          const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
          };
          
          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        }}
        onTouchStart={(e) => {
          if (!isMobile) return;
          e.stopPropagation();
          
          let startX = e.touches[0].clientX;
          let startY = e.touches[0].clientY;
          
          const handleTouchMove = (touchMoveEvent: TouchEvent) => {
            const dx = touchMoveEvent.touches[0].clientX - startX;
            const dy = touchMoveEvent.touches[0].clientY - startY;
            handleResize("se", dx, dy);
            
            // Update starting position for smoother, incremental movement
            startX = touchMoveEvent.touches[0].clientX;
            startY = touchMoveEvent.touches[0].clientY;
          };
          
          const handleTouchEnd = () => {
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleTouchEnd);
          };
          
          document.addEventListener("touchmove", handleTouchMove);
          document.addEventListener("touchend", handleTouchEnd);
        }}
      />
      
      {/* Other resize handles */}
      {!isMobile && (
        <>
      <div 
        className="resizable-handle sw"
        onMouseDown={(e) => {
          e.stopPropagation();
          
          let startX = e.clientX;
          let startY = e.clientY;
          
          const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
            const dx = mouseMoveEvent.clientX - startX;
            const dy = mouseMoveEvent.clientY - startY;
            handleResize("sw", dx, dy);
            
            // Update starting position for smoother, incremental movement
            startX = mouseMoveEvent.clientX;
            startY = mouseMoveEvent.clientY;
          };
          
          const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
          };
          
          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        }}
      />
      
      <div 
        className="resizable-handle ne"
        onMouseDown={(e) => {
          e.stopPropagation();
          
          let startX = e.clientX;
          let startY = e.clientY;
          
          const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
            const dx = mouseMoveEvent.clientX - startX;
            const dy = mouseMoveEvent.clientY - startY;
            handleResize("ne", dx, dy);
            
            // Update starting position for smoother, incremental movement
            startX = mouseMoveEvent.clientX;
            startY = mouseMoveEvent.clientY;
          };
          
          const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
          };
          
          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        }}
      />
      
      <div 
        className="resizable-handle nw"
        onMouseDown={(e) => {
          e.stopPropagation();
          
          let startX = e.clientX;
          let startY = e.clientY;
          
          const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
            const dx = mouseMoveEvent.clientX - startX;
            const dy = mouseMoveEvent.clientY - startY;
            handleResize("nw", dx, dy);
            
            // Update starting position for smoother, incremental movement
            startX = mouseMoveEvent.clientX;
            startY = mouseMoveEvent.clientY;
          };
          
          const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
          };
          
          document.addEventListener("mousemove", handleMouseMove);
          document.addEventListener("mouseup", handleMouseUp);
        }}
      />
        </>
      )}
    </motion.div>
  );
} 