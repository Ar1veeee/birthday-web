import React from 'react';
import { Star } from 'lucide-react';

const Particles = ({ particles }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: particle.x,
            top: particle.y,
            transform: `scale(${1 + Math.sin(particle.pulse) * 0.3})`,
          }}
        >
          {particle.type === 'star' ? (
            <Star
              size={particle.size * 2}
              className="animate-pulse"
              style={{
                color: particle.color,
                opacity: particle.opacity,
                filter: `drop-shadow(0 0 ${particle.size * 2}px ${particle.color})`
              }}
            />
          ) : (
            <div
              className="rounded-full animate-pulse"
              style={{
                width: particle.size,
                height: particle.size,
                backgroundColor: particle.color,
                opacity: particle.opacity,
                boxShadow: `0 0 ${particle.size * 3}px ${particle.color}, 0 0 ${particle.size * 6}px ${particle.color}`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Particles;