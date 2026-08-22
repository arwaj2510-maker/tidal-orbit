import React, { useMemo } from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';

export const FloatingElements: React.FC = () => {
  // Generate deterministic array of floating particles
  const floatingItems = useMemo(() => {
    const items = [];
    const icons = ['heart', 'sparkle', 'star'];
    const colors = ['#f43f5e', '#fb7185', '#ffe4e6', '#f7d698', '#ff85a1'];

    for (let i = 0; i < 28; i++) {
      items.push({
        id: i,
        type: icons[i % icons.length],
        left: `${(i * 3.7) % 96}%`,
        size: Math.floor(14 + (i * 7) % 20),
        duration: Math.floor(12 + (i * 3) % 18),
        delay: (i * 0.7) % 8,
        color: colors[i % colors.length],
        rotate: (i * 45) % 360,
      });
    }
    return items;
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {floatingItems.map((item) => (
        <div
          key={item.id}
          className="absolute animate-float-up opacity-0"
          style={{
            left: item.left,
            animationDuration: `${item.duration}s`,
            animationDelay: `${item.delay}s`,
            color: item.color,
          }}
        >
          {item.type === 'heart' && (
            <Heart
              style={{ width: item.size, height: item.size, transform: `rotate(${item.rotate}deg)` }}
              className="fill-current opacity-70 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]"
            />
          )}
          {item.type === 'sparkle' && (
            <Sparkles
              style={{ width: item.size, height: item.size }}
              className="opacity-80 drop-shadow-[0_0_10px_rgba(247,214,152,0.5)]"
            />
          )}
          {item.type === 'star' && (
            <Star
              style={{ width: item.size * 0.8, height: item.size * 0.8 }}
              className="fill-current opacity-60 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]"
            />
          )}
        </div>
      ))}
    </div>
  );
};
