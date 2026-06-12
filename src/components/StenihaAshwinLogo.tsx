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
  color = '#f8fafc', // Default to silver-slate/ivory
  withBacking = false,
  glow = false
}) => {
  return (
    <div 
      className={`relative select-none flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-500"
        style={{ filter: glow ? 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.45))' : 'none' }}
      >
        <defs>
          {/* 3D Embossing Filter mimicking the leather press effect */}
          <filter id="leather-emboss" x="-10%" y="-10%" width="120%" height="120%">
            {/* Blur to create depth channel */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur" />
            
            {/* Specular lighting for metal-silver metallic reflections */}
            <feSpecularLighting 
              in="blur" 
              surfaceScale="4" 
              specularConstant="1.5" 
              specularExponent="22" 
              lightingColor="#ffffff" 
              result="specular"
            >
              <fePointLight x="150" y="80" z="220" />
            </feSpecularLighting>
            
            {/* Combine lighting with original shape alpha */}
            <feComposite in="specular" in2="SourceAlpha" operator="in" result="specularIn" />
            
            {/* Overlap with source graphic */}
            <feComposite in="SourceGraphic" in2="specularIn" operator="arithmetic" k1="0" k2="1" k3="0.8" k4="0" result="lit" />
            
            {/* Drop shadow on the leather background */}
            <feDropShadow dx="-1" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.8" />
          </filter>

          {/* Leather texture pattern overlay */}
          <pattern id="leather-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#131316" />
            {/* Micro-grain lines representing luxurious leather splits */}
            <path d="M 0,10 Q 5,8 10,12 T 20,8 T 30,12 T 40,10" stroke="#0e0e11" strokeWidth="1" fill="none" opacity="0.6" />
            <path d="M 0,25 Q 10,23 15,27 T 25,23 T 35,27 T 40,25" stroke="#0a0a0d" strokeWidth="1" fill="none" opacity="0.6" />
            <path d="M 12,0 C 13,10 10,15 8,25 C 6,35 12,38 10,40" stroke="#0d0d10" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M 28,0 C 30,8 26,18 29,24 C 32,30 28,34 31,40" stroke="#08080a" strokeWidth="1" fill="none" opacity="0.4" />
            {/* Noise highlights */}
            <rect width="40" height="40" fill="url(#fine-sparkle)" opacity="0.08" />
          </pattern>

          {/* Dynamic stroke gradient (Platinum Silver to Soft Pearl) */}
          <linearGradient id="silver-platinum" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#e2e8f0" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="75%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#f8fafc" />
          </linearGradient>

          {/* Curves for the text paths around the heart lobes */}
          {/* STENIHA (On the upper-left, curving up and out) */}
          <path id="text-path-steniha" d="M 180,265 C 145,210 110,140 160,110 C 210,80 230,165 200,200" fill="none" />
          
          {/* ASHWIN (On the bottom-right, curving down and to points) */}
          <path id="text-path-ashwin" d="M 220,195 C 195,160 215,90 265,105 C 315,120 285,225 210,310" fill="none" />
        </defs>

        {/* Backing leather roundel with silver rims (if enabled) */}
        {withBacking && (
          <g>
            <circle cx="200" cy="200" r="190" fill="url(#leather-pattern)" stroke="#222228" strokeWidth="4" />
            <circle cx="200" cy="200" r="182" stroke="url(#silver-platinum)" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.35" />
            <circle cx="200" cy="200" r="176" stroke="#0a0a0d" strokeWidth="2" />
          </g>
        )}

        {/* Dynamic content group with the 3D emboss filter */}
        <g filter="url(#leather-emboss)">
          {/* Main Ornate Heart Template */}
          <g id="heart-sculpture">
            {/* Outer Heart Contour */}
            <path 
              d="M 200,345 C 50,230 40,120 150,90 C 200,80 200,120 200,120 C 200,120 200,80 250,90 C 360,120 350,230 200,345 Z" 
              stroke="url(#silver-platinum)" 
              strokeWidth="9" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none" 
            />
            {/* Inner Accent Heart Outline */}
            <path 
              d="M 200,325 C 75,220 65,130 155,103 C 190,95 200,127 200,127 C 200,127 210,95 245,103 C 335,130 325,220 200,325 Z" 
              stroke="url(#silver-platinum)" 
              strokeWidth="2.5" 
              strokeDasharray="2 4"
              opacity="0.8"
              fill="none" 
            />

            {/* HIGH-FIDELITY CALLIGRAPHIC ORNAMENTAL FILIGREE INSIDE THE HEART */}
            {/* Left Lobe Swirls (Steniha's side) */}
            <path d="M 125,120 C 105,145 110,180 135,190 C 150,195 160,185 155,170 C 150,155 130,160 125,175 C 120,190 145,210 165,200" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85" />
            <path d="M 85,160 C 70,190 80,225 110,235 C 130,242 145,225 138,210 C 130,195 110,205 105,220" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.75" />
            
            {/* Right Lobe Swirls (Ashwin's side) */}
            <path d="M 275,120 C 295,145 290,180 265,190 C 250,195 240,185 245,170 C 250,155 270,160 275,175 C 280,190 255,210 235,200" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.85" />
            <path d="M 315,160 C 330,190 320,225 290,235 C 270,242 255,225 262,210 C 270,195 290,205 295,220" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.75" />
            
            {/* Bottom Swirl Knot (Uniting point) */}
            <path d="M 200,310 C 175,280 160,250 180,235 C 190,225 210,225 220,235 C 240,250 225,280 200,310 Z" stroke="url(#silver-platinum)" strokeWidth="3.5" fill="none" />
            <path d="M 200,245 C 190,255 190,265 200,270 C 210,265 210,255 200,245" stroke={color} strokeWidth="2" fill="none" />

            {/* Central Ornate Monogram Letters (S, T, E, N, I, H, A) & (A, S, H, W, I, N) */}
            {/* Left Wing Letters - Hand Written Aesthetic Primitives */}
            {/* Big Gothic Letter S in the left center of the heart */}
            <path d="M 125,140 C 135,130 155,135 150,155 C 145,170 120,165 115,185 C 110,205 135,215 145,195" stroke="url(#silver-platinum)" strokeWidth="6.5" strokeLinecap="round" fill="none" />
            {/* Horizontal Cross for T in STENIHA */}
            <path d="M 140,125 L 180,132" stroke="url(#silver-platinum)" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 160,128 C 160,150 170,165 175,160" stroke="url(#silver-platinum)" strokeWidth="3" strokeLinecap="round" fill="none" />

            {/* Right Wing Letters */}
            {/* Big letters ASHWIN detailings */}
            {/* Big Gothic Letter A inside the center right of the heart */}
            <path d="M 235,210 L 255,145 L 275,205" stroke="url(#silver-platinum)" strokeWidth="6" strokeLinecap="round" fill="none" />
            <path d="M 242,185 L 270,185" stroke="url(#silver-platinum)" strokeWidth="3.5" fill="none" />
            {/* Letter H in the center column interlinking */}
            <path d="M 183,165 L 183,215" stroke="url(#silver-platinum)" strokeWidth="4.5" fill="none" />
            <path d="M 203,165 L 203,215" stroke="url(#silver-platinum)" strokeWidth="4.5" fill="none" />
            <path d="M 183,190 L 203,190" stroke="url(#silver-platinum)" strokeWidth="3.5" fill="none" />

            {/* Big Gothic Letter W on the right lobe */}
            <path d="M 285,140 L 295,195 L 305,150 L 315,195 L 325,140" stroke="url(#silver-platinum)" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

            {/* Tiny Heart detailing right at the center focus */}
            <path d="M 200,140 C 193,130 185,135 192,148 L 200,157 L 208,148 C 215,135 207,130 200,140 Z" fill={color} opacity="0.9" />
          </g>

          {/* ELEGANT SERIF TYPOGRAPHY CURVING WITH THE HEART LOBES */}
          {/* Render 'STENIHA' curved along the left top */}
          <text fontStyle="italic" fontWeight="bold" fontSize="22" fontFamily="serif" fill="url(#silver-platinum)" letterSpacing="5">
            <textPath href="#text-path-steniha" startOffset="10%">
              STENIHA
            </textPath>
          </text>

          {/* Render 'ASHWIN' curved along the right bottom */}
          <text fontStyle="italic" fontWeight="bold" fontSize="22" fontFamily="serif" fill="url(#silver-platinum)" letterSpacing="5">
            <textPath href="#text-path-ashwin" startOffset="15%">
              ASHWIN
            </textPath>
          </text>
        </g>
      </svg>
    </div>
  );
};
