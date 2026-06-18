import React, { useRef, useEffect } from 'react';
import './MagnetLines.css';

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = '80vmin',
  lineColor = '#efefef',
  lineWidth = '1vmin',
  lineHeight = '6vmin',
  baseAngle = -10,
  className = '',
  style = {}
}: MagnetLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('span');
    const centers: { x: number; y: number }[] = [];

    const updateCenters = () => {
      items.forEach((item, i) => {
        centers[i] = {
          x: item.offsetLeft + item.offsetWidth / 2,
          y: item.offsetTop + item.offsetHeight / 2
        };
      });
    };

    // Delay initial caching slightly to ensure layouts/animations have settled
    setTimeout(updateCenters, 100);
    window.addEventListener('resize', updateCenters);

    let animationFrameId: number;
    let time = 0;
    
    let currentX = 0;
    let currentY = 0;
    let isInitialized = false;

    const animate = () => {
      time += 0.015;
      
      const width = container.offsetWidth;
      const height = container.offsetHeight;
      
      // Automated Lissajous motion
      const autoX = width / 2 + Math.sin(time) * width * 0.4;
      const autoY = height / 2 + Math.cos(time * 0.7) * height * 0.4;

      if (!isInitialized) {
        currentX = autoX;
        currentY = autoY;
        isInitialized = true;
      }

      currentX += (autoX - currentX) * 0.05;
      currentY += (autoY - currentY) * 0.05;

      items.forEach((item, i) => {
        const center = centers[i];
        if (!center) return;

        const b = currentX - center.x;
        const a = currentY - center.y;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (currentY > center.y ? 1 : -1);

        item.style.setProperty('--rotate', `${r}deg`);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateCenters);
      cancelAnimationFrame(animationFrameId);
    };
  }, [rows, columns]);

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      style={{
        '--rotate': `${baseAngle}deg`,
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight
      } as React.CSSProperties}
    />
  ));

  return (
    <div
      ref={containerRef}
      className={`magnetLines-container ${className}`}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: '100%',
        height: '100%',
        ...style
      }}
    >
      {spans}
    </div>
  );
}
