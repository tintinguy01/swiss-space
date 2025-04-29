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
  onResize?: (id: string, width: number, height: number) => void;
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
  onResize
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
      
      // For mobile we use CSS transform to center, so position is 0,0
      const newPosX = 0;
      const newPosY = 0;
      
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
      } else if (width && height) {
        // Use the props dimensions if available
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
  
  // Update dimensions when props change (for resizing)
  useEffect(() => {
    if (!isMobile && width && height) {
      setDimensions({ width, height });
    }
  }, [width, height, isMobile]);
  
  const handleResize = (direction: string, movementX: number, movementY: number) => {
    // Create new dimensions based on the current values
    const newWidth = direction.includes("e") 
      ? Math.max(280, dimensions.width + movementX)
      : direction.includes("w") 
        ? Math.max(280, dimensions.width - movementX)
        : dimensions.width;
        
    const newHeight = direction.includes("s")
      ? Math.max(200, dimensions.height + movementY)
      : direction.includes("n")
        ? Math.max(200, dimensions.height - movementY)
        : dimensions.height;
    
    // Apply new dimensions to the card directly
    if (cardRef.current) {
      cardRef.current.style.width = `${newWidth}px`;
      cardRef.current.style.height = `${newHeight}px`;
    }
    
    // Update dimensions state (but don't trigger re-render immediately)
    dimensions.width = newWidth;
    dimensions.height = newHeight;
    
    // Update position if needed
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
        x: { type: "spring", stiffness: 500, damping: 40, mass: 1 },
        y: { type: "spring", stiffness: 500, damping: 40, mass: 1 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
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
          // For mobile, don't update position since workspace is not scrollable
          // Just reset position to where it was
          if (onDragEnd) onDragEnd(id, position);
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
      
      {/* Resize handles - only for desktop */}
      {!isMobile && (
        <>
          <div 
            className="resizable-handle se"
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              
              let startX = e.clientX;
              let startY = e.clientY;
              
              const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
                mouseMoveEvent.preventDefault();
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
                
                // Now update React state with the final dimensions
                setDimensions({
                  width: dimensions.width,
                  height: dimensions.height
                });
                
                // Ensure the final dimensions are saved to parent component
                if (onResize) {
                  // Use a timeout to ensure we're not updating state during render
                  setTimeout(() => {
                    onResize(id, dimensions.width, dimensions.height);
                  }, 0);
                }
              };
              
              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);
            }}
          />
          
          <div 
            className="resizable-handle sw"
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              
              let startX = e.clientX;
              let startY = e.clientY;
              
              const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
                mouseMoveEvent.preventDefault();
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
                
                // Now update React state with the final dimensions
                setDimensions({
                  width: dimensions.width,
                  height: dimensions.height
                });
                
                // Ensure the final dimensions are saved to parent component
                if (onResize) {
                  // Use a timeout to ensure we're not updating state during render
                  setTimeout(() => {
                    onResize(id, dimensions.width, dimensions.height);
                  }, 0);
                }
              };
              
              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);
            }}
          />
          
          <div 
            className="resizable-handle ne"
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              
              let startX = e.clientX;
              let startY = e.clientY;
              
              const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
                mouseMoveEvent.preventDefault();
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
                
                // Now update React state with the final dimensions
                setDimensions({
                  width: dimensions.width,
                  height: dimensions.height
                });
                
                // Ensure the final dimensions are saved to parent component
                if (onResize) {
                  // Use a timeout to ensure we're not updating state during render
                  setTimeout(() => {
                    onResize(id, dimensions.width, dimensions.height);
                  }, 0);
                }
              };
              
              document.addEventListener("mousemove", handleMouseMove);
              document.addEventListener("mouseup", handleMouseUp);
            }}
          />
          
          <div 
            className="resizable-handle nw"
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              
              let startX = e.clientX;
              let startY = e.clientY;
              
              const handleMouseMove = (mouseMoveEvent: MouseEvent) => {
                mouseMoveEvent.preventDefault();
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
                
                // Now update React state with the final dimensions
                setDimensions({
                  width: dimensions.width,
                  height: dimensions.height
                });
                
                // Ensure the final dimensions are saved to parent component
                if (onResize) {
                  // Use a timeout to ensure we're not updating state during render
                  setTimeout(() => {
                    onResize(id, dimensions.width, dimensions.height);
                  }, 0);
                }
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