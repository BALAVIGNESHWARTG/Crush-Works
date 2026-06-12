import React from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
  color?: string;
  withBacking?: boolean;
  glow?: boolean;
}

export const StenihaAshwinLogo: React.FC<LogoProps> = ({
  className = '',
  size = 120,
  glow = false
}) => {
  return (
    <div 
      className={`relative select-none flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/logo.png"
        alt="Steni Ashwin Logo"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          filter: glow ? 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.45))' : 'none'
        }}
        className="transition-all duration-500"
      />
    </div>
  );
};
