"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { 
  MdZoomIn, 
  MdZoomOut, 
  MdOutlineFilterCenterFocus,
  MdGridOn
} from "react-icons/md";

interface WorkspaceProps {
  children: ReactNode;
  isMobile?: boolean;
}

export default function Workspace({ children, isMobile = false }: WorkspaceProps) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [gridVisible, setGridVisible] = useState(true);
  const workspaceRef = useRef<HTMLDivElement>(null);

  // Handle workspace dragging
  useEffect(() => {
    // Skip all this for mobile devices
    if (isMobile) return;
    
    const workspace = workspaceRef.current;
    if (!workspace) return;

    const handleMouseDown = (e: MouseEvent) => {
      // Only activate dragging if the target is the workspace itself, not a child
      if (e.target === workspace || e.target === workspace.firstChild) {
        setIsDragging(true);
        setStartPosition({ x: e.clientX, y: e.clientY });
        
        // Change cursor
        workspace.style.cursor = 'grabbing';
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const dx = (e.clientX - startPosition.x) / scale;
      const dy = (e.clientY - startPosition.y) / scale;
      
      setPosition(prev => ({ 
        x: prev.x + dx, 
        y: prev.y + dy 
      }));
      
      setStartPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        
        // Reset cursor
        workspace.style.cursor = 'grab';
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Get the cursor position relative to the workspace
      const rect = workspace.getBoundingClientRect();
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;
      
      // Convert cursor position to workspace coordinates
      const workspaceX = cursorX / scale - position.x;
      const workspaceY = cursorY / scale - position.y;
      
      // Calculate new scale with limits (increase upper limit to 5)
      const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
      const newScale = Math.min(Math.max(0.1, scale * zoomFactor), 5);
      
      // Calculate new position to zoom to cursor
      const newPosition = {
        x: -workspaceX + cursorX / newScale,
        y: -workspaceY + cursorY / newScale
      };
      
      setScale(newScale);
      setPosition(newPosition);
    };

    workspace.addEventListener("mousedown", handleMouseDown);
    workspace.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      workspace.removeEventListener("mousedown", handleMouseDown);
      workspace.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, scale, startPosition, position, isMobile]);

  // Update grid size based on scale for Miro-like zoomed grid effect
  const gridSize = Math.max(10, 50 / scale);
  
  // Update CSS properties based on grid size and position
  useEffect(() => {
    if (!workspaceRef.current || isMobile) return;
    
    workspaceRef.current.style.setProperty('--grid-actual-size', `${gridSize}px`);
    workspaceRef.current.style.backgroundSize = `${gridSize}px ${gridSize}px`;
    workspaceRef.current.style.backgroundPosition = `${position.x * scale}px ${position.y * scale}px`;
  }, [gridSize, position, scale, isMobile]);

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev * 1.2, 5));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev * 0.8, 0.1));
  };
  
  const toggleGrid = () => {
    setGridVisible(prev => !prev);
  };

  // For mobile, use a simplified workspace but with controls
  if (isMobile) {
    return (
      <div 
        className="workspace mobile-workspace" 
        ref={workspaceRef}
      >
        <motion.div
          className="workspace-content"
          style={{
            position: "relative",
            height: "100%",
            width: "100vw",
            overflow: "hidden"
          }}
        >
          {children}
        </motion.div>
        
        {/* Remove zoom control panel for mobile */}
        <div className="zoom-indicator" style={{ display: 'none' }}>
          {Math.round(scale * 100)}%
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`workspace ${!gridVisible ? 'bg-none' : ''}`} 
      ref={workspaceRef}
      style={{ 
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <motion.div
        className="workspace-content"
        style={{
          transform: `scale(${scale})`,
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {children}
      </motion.div>
      
      {/* Control panel */}
      <div className="control-panel">
        <button className="control-button" onClick={zoomIn} title="Zoom In">
          <MdZoomIn size={20} />
        </button>
        <button className="control-button" onClick={zoomOut} title="Zoom Out">
          <MdZoomOut size={20} />
        </button>
        <button className="control-button" onClick={resetView} title="Reset View">
          <MdOutlineFilterCenterFocus size={20} />
        </button>
        <button 
          className={`control-button ${!gridVisible ? 'opacity-50' : ''}`} 
          onClick={toggleGrid} 
          title="Toggle Grid"
        >
          <MdGridOn size={20} />
        </button>
      </div>
      
      {/* Zoom indicator in bottom right */}
      <div className="zoom-indicator">
        {Math.round(scale * 100)}%
      </div>
    </div>
  );
} 