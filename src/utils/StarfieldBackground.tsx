// src/utils/StarfieldBackground.tsx
import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  slope: number;
  opacity: number;
  speed: number;
  resetPosition: (x: number, y: number, maxSpeed: number) => Star;
  distanceTo: (originX: number, originY: number) => number;
}

const createStar = (x: number, y: number, maxSpeed: number): Star => ({
  x,
  y,
  slope: y / x,
  opacity: 0,
  speed: Math.max(Math.random() * maxSpeed, 1),
  resetPosition(x: number, y: number, maxSpeed: number) {
    this.x = x;
    this.y = y;
    this.slope = y / x;
    this.opacity = 0;
    this.speed = Math.max(Math.random() * maxSpeed, 1);
    return this;
  },
  distanceTo(originX: number, originY: number) {
    return Math.sqrt(Math.pow(originX - this.x, 2) + Math.pow(originY - this.y, 2));
  }
});

const getRandomPosition = (minX: number, minY: number, maxX: number, maxY: number) => ({
  x: Math.floor((Math.random() * maxX) + minX),
  y: Math.floor((Math.random() * maxY) + minY)
});

const getRandomStar = (minX: number, minY: number, maxX: number, maxY: number, maxSpeed: number): Star => {
  const coords = getRandomPosition(minX, minY, maxX, maxY);
  return createStar(coords.x, coords.y, maxSpeed);
};

const StarfieldBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = containerRef.current.offsetWidth;
    let height = containerRef.current.offsetHeight;
    const numStars = 333;
    const maxStarSpeed = 3;
    const starField: Star[] = [];

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      starField.push(
        getRandomStar(-width / 2, -height / 2, width, height, maxStarSpeed)
      );
    }

    const updateStarField = () => {
      starField.forEach(star => {
        const increment = Math.min(star.speed, Math.abs(star.speed / star.slope));
        star.x += (star.x > 0) ? increment : -increment;
        star.y = star.slope * star.x;
        star.opacity += star.speed / 100;

        if ((Math.abs(star.x) > width / 2) || (Math.abs(star.y) > height / 2)) {
          const randomLoc = getRandomPosition(
            -width / 10, -height / 10,
            width / 5, height / 5
          );
          star.resetPosition(randomLoc.x, randomLoc.y, maxStarSpeed);
        }
      });
    };

    const renderStarField = () => {
      if (!ctx) return;
      
      ctx.fillStyle = "rgba(0, 0, 0, .5)";
      ctx.fillRect(0, 0, width, height);

      starField.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fillRect(
          star.x + width / 2,
          star.y + height / 2,
          2, 2
        );
      });
    };

    const animate = () => {
      updateStarField();
      renderStarField();
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!containerRef.current || !canvasRef.current) return;
      width = containerRef.current.offsetWidth;
      height = containerRef.current.offsetHeight;
      canvasRef.current.width = width;
      canvasRef.current.height = height;
    };

    canvas.width = width;
    canvas.height = height;
    
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%'
        }}
      />
    </div>
  );
};

export default StarfieldBackground;