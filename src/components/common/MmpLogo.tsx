import React, { useId } from 'react';

interface Props {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  showText?: boolean;
  variant?: 'gold-on-dark' | 'gold-on-light' | 'seal';
  withContainer?: boolean;
  mode?: 'auto' | 'full' | 'emblem';
  animated?: boolean;
  svgClassName?: string;
}

export const MmpLogo: React.FC<Props> = ({
  className = '',
  size = 'md',
  showText = true,
  variant = 'gold-on-dark',
  withContainer = true,
  mode = 'auto',
  animated = false,
  svgClassName = '',
}) => {
  const rawId = useId();
  const id = rawId.replace(/:/g, '');

  const sizeMap = {
    xs: { box: 34, titleSize: 'text-xs', subClass: 'text-[8px]' },
    sm: { box: 46, titleSize: 'text-sm', subClass: 'text-[9px]' },
    md: { box: 64, titleSize: 'text-base', subClass: 'text-[10px]' },
    lg: { box: 100, titleSize: 'text-xl', subClass: 'text-xs' },
    xl: { box: 160, titleSize: 'text-2xl', subClass: 'text-sm' },
    hero: { box: 240, titleSize: 'text-3xl', subClass: 'text-base' },
  };

  const currentSize = sizeMap[size];

  // Gradients IDs
  const goldMetallic = `goldMetallic_${id}`;
  const goldGleam = `goldGleam_${id}`;
  const goldDeep = `goldDeep_${id}`;
  const crestBg = `crestBg_${id}`;
  const radialGlow = `radialGlow_${id}`;
  const floorGlow = `floorGlow_${id}`;
  const rubyGrad = `rubyGrad_${id}`;
  const sapphireGrad = `sapphireGrad_${id}`;

  const isLight = variant === 'gold-on-light';
  const showFullIntegrated =
    mode === 'full' || (mode === 'auto' && (size === 'hero' || size === 'xl'));

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* Official MMP 3D Royal Logo & Handshake Emblem */}
      <div
        className={`relative shrink-0 flex items-center justify-center transition-all duration-300 ${
          withContainer
            ? isLight
              ? 'rounded-3xl p-1.5 bg-gradient-to-b from-[#050b18] via-[#02050e] to-[#000000] border-2 border-[#d4af37]/60 shadow-xl'
              : 'rounded-3xl p-1.5 bg-gradient-to-b from-[#0c1638] via-[#040816] to-[#010206] border-2 border-[#d4af37]/70 shadow-2xl shadow-amber-950/40'
            : ''
        }`}
        style={{ width: currentSize.box, height: currentSize.box }}
      >
        <svg
          viewBox="0 0 500 500"
          className={`w-full h-full drop-shadow-[0_4px_16px_rgba(212,175,55,0.45)] ${
            animated ? 'animate-emblem-pulse' : ''
          } ${svgClassName}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Rich 24K Multi-Stop Metallic Gold Gradient */}
            <linearGradient id={goldMetallic} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFEE8" />
              <stop offset="15%" stopColor="#FDE47F" />
              <stop offset="35%" stopColor="#D4AF37" />
              <stop offset="55%" stopColor="#FFF2A8" />
              <stop offset="75%" stopColor="#9E6E10" />
              <stop offset="88%" stopColor="#E5B942" />
              <stop offset="100%" stopColor="#6E4403" />
            </linearGradient>

            {/* Specular White-Gold Gleam for Edges & Highlights */}
            <linearGradient id={goldGleam} x1="0%" y1="30%" x2="100%" y2="70%">
              <stop offset="0%" stopColor="#C99718" />
              <stop offset="25%" stopColor="#FFECA2" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="75%" stopColor="#F5D061" />
              <stop offset="100%" stopColor="#8A5A0A" />
            </linearGradient>

            {/* Deep Burnished Gold for 3D Bevels & Shading */}
            <linearGradient id={goldDeep} x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#FFE79A" />
              <stop offset="45%" stopColor="#C6941A" />
              <stop offset="80%" stopColor="#7A4D05" />
              <stop offset="100%" stopColor="#382100" />
            </linearGradient>

            {/* Crimson Ruby Gradient for Crown Center Jewel */}
            <radialGradient id={rubyGrad} cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="40%" stopColor="#DC2626" />
              <stop offset="85%" stopColor="#7F1D1D" />
              <stop offset="100%" stopColor="#450A0A" />
            </radialGradient>

            {/* Deep Sapphire Gradient for Crown Flank Jewels */}
            <radialGradient id={sapphireGrad} cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="40%" stopColor="#2563EB" />
              <stop offset="85%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0F172A" />
            </radialGradient>

            {/* Deep Midnight Navy for Shield Interior */}
            <radialGradient id={crestBg} cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#10204d" />
              <stop offset="60%" stopColor="#060c22" />
              <stop offset="100%" stopColor="#01040d" />
            </radialGradient>

            {/* Ambient Radial Golden Glow */}
            <radialGradient id={radialGlow} cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#FFDF73" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* Floor Specular Golden Reflection */}
            <radialGradient id={floorGlow} cx="50%" cy="80%" r="50%">
              <stop offset="0%" stopColor="#F5D061" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* Drop Shadow Filter */}
            <filter id={`drop_${id}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.75" />
            </filter>
          </defs>

          {/* 0. Ambient Stardust Glow & Floor Reflection */}
          <circle cx="250" cy="225" r="230" fill={`url(#${radialGlow})`} />
          <ellipse cx="250" cy="475" rx="140" ry="22" fill={`url(#${floorGlow})`} />

          {/* 1. Outer Concentric Royal Golden Rings (Matches Circular Halo in Image) */}
          <circle
            cx="250"
            cy="235"
            r="175"
            stroke={`url(#${goldMetallic})`}
            strokeWidth="5"
            strokeDasharray="14 6"
            opacity="0.85"
          />
          <circle
            cx="250"
            cy="235"
            r="164"
            stroke={`url(#${goldGleam})`}
            strokeWidth="2.5"
            opacity="0.7"
          />

          {/* 2. Sweeping Layered Golden Eagle Wings (Symmetrical Pair) */}
          {/* Left Wing (Soaring outward and curving up toward the crown) */}
          <g filter={`url(#drop_${id})`}>
            {/* Outer Primary Feathers */}
            <path
              d="M 180 270 C 130 250, 80 200, 75 140 C 72 115, 85 125, 95 145 C 105 165, 120 185, 135 195 C 120 170, 98 135, 98 120 C 98 108, 110 118, 122 140 C 134 162, 150 188, 160 200 C 145 168, 130 135, 135 110 C 138 98, 146 110, 156 135 C 168 162, 178 195, 185 220 Z"
              fill={`url(#${goldMetallic})`}
              stroke="#5C3B00"
              strokeWidth="1.5"
            />
            {/* Mid Flight Feathers */}
            <path
              d="M 175 285 C 140 280, 95 245, 82 205 C 75 185, 88 190, 102 208 C 118 228, 142 248, 165 258 C 145 235, 115 195, 115 178 C 115 168, 126 176, 140 200 C 154 224, 170 248, 182 268 Z"
              fill={`url(#${goldGleam})`}
              stroke="#5C3B00"
              strokeWidth="1.2"
            />
            {/* Lower Wing Plumage & Wrist Coverts */}
            <path
              d="M 188 310 C 160 315, 120 290, 105 260 C 98 245, 110 248, 125 262 C 142 278, 165 292, 185 300 C 165 280, 138 250, 142 238 C 145 230, 155 238, 168 255 C 182 272, 192 292, 198 308 Z"
              fill={`url(#${goldDeep})`}
              stroke="#5C3B00"
              strokeWidth="1.2"
            />
            {/* Inner Wing Scale Feathers (Near Wrist) */}
            <path d="M 160 270 Q 175 278 190 280" stroke="#FFF7C2" strokeWidth="2" strokeLinecap="round" />
            <path d="M 152 285 Q 170 292 188 296" stroke="#FFF7C2" strokeWidth="2" strokeLinecap="round" />
            <path d="M 148 300 Q 166 308 185 312" stroke="#FFF7C2" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Right Wing (Mirror Symmetrical) */}
          <g filter={`url(#drop_${id})`}>
            {/* Outer Primary Feathers */}
            <path
              d="M 320 270 C 370 250, 420 200, 425 140 C 428 115, 415 125, 405 145 C 395 165, 380 185, 365 195 C 380 170, 402 135, 402 120 C 402 108, 390 118, 378 140 C 366 162, 350 188, 340 200 C 355 168, 370 135, 365 110 C 362 98, 354 110, 344 135 C 332 162, 322 195, 315 220 Z"
              fill={`url(#${goldMetallic})`}
              stroke="#5C3B00"
              strokeWidth="1.5"
            />
            {/* Mid Flight Feathers */}
            <path
              d="M 325 285 C 360 280, 405 245, 418 205 C 425 185, 412 190, 398 208 C 382 228, 358 248, 335 258 C 355 235, 385 195, 385 178 C 385 168, 374 176, 360 200 C 346 224, 330 248, 318 268 Z"
              fill={`url(#${goldGleam})`}
              stroke="#5C3B00"
              strokeWidth="1.2"
            />
            {/* Lower Wing Plumage & Wrist Coverts */}
            <path
              d="M 312 310 C 340 315, 380 290, 395 260 C 402 245, 390 248, 375 262 C 358 278, 335 292, 315 300 C 335 280, 362 250, 358 238 C 355 230, 345 238, 332 255 C 318 272, 308 292, 302 308 Z"
              fill={`url(#${goldDeep})`}
              stroke="#5C3B00"
              strokeWidth="1.2"
            />
            {/* Inner Wing Scale Feathers (Near Wrist) */}
            <path d="M 340 270 Q 325 278 310 280" stroke="#FFF7C2" strokeWidth="2" strokeLinecap="round" />
            <path d="M 348 285 Q 330 292 312 296" stroke="#FFF7C2" strokeWidth="2" strokeLinecap="round" />
            <path d="M 352 300 Q 334 308 315 312" stroke="#FFF7C2" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* 3. Central Inverted Shield Crest with Stylized "MMP" Monogram */}
          <g filter={`url(#drop_${id})`}>
            {/* Outer Triangular Shield Rim */}
            <path
              d="M 160 135 L 340 135 L 325 230 L 250 365 L 175 230 Z"
              fill={`url(#${crestBg})`}
              stroke={`url(#${goldMetallic})`}
              strokeWidth="6"
              strokeLinejoin="round"
            />
            {/* Inner Golden Inset Pinstripe Border */}
            <path
              d="M 172 143 L 328 143 L 314 226 L 250 348 L 186 226 Z"
              fill="none"
              stroke={`url(#${goldGleam})`}
              strokeWidth="2"
              opacity="0.85"
            />

            {/* Stylized 3D MMP Vertical Fluted Pillars (Exact to Official Image) */}
            <g transform="translate(250, 195)">
              {/* Top Horizontal Bar connecting M, M, P */}
              <path
                d="M -75 -48 L 75 -48 L 75 -36 L -75 -36 Z"
                fill={`url(#${goldGleam})`}
                stroke="#5C3B00"
                strokeWidth="1"
              />
              {/* Outer Left M Diagonal Wing */}
              <path
                d="M -75 -48 L -55 -15 L -55 35 L -65 20 L -65 -36 Z"
                fill={`url(#${goldMetallic})`}
                stroke="#5C3B00"
                strokeWidth="1"
              />
              {/* Fluted Vertical Pillars tapering down into sharp central spear tip */}
              {/* Pillar 1 (Leftmost) */}
              <path
                d="M -48 -36 L -38 -36 L -38 25 L -43 32 L -48 25 Z"
                fill={`url(#${goldDeep})`}
                stroke="#5C3B00"
                strokeWidth="1"
              />
              {/* Pillar 2 */}
              <path
                d="M -30 -36 L -20 -36 L -20 45 L -25 54 L -30 45 Z"
                fill={`url(#${goldMetallic})`}
                stroke="#5C3B00"
                strokeWidth="1"
              />
              {/* Pillar 3 */}
              <path
                d="M -12 -36 L -2 -36 L -2 65 L -7 76 L -12 65 Z"
                fill={`url(#${goldGleam})`}
                stroke="#5C3B00"
                strokeWidth="1"
              />
              {/* Pillar 4 (Center Spear Point - Longest) */}
              <path
                d="M 2 -36 L 12 -36 L 12 78 L 7 92 L 2 78 Z"
                fill={`url(#${goldGleam})`}
                stroke="#5C3B00"
                strokeWidth="1"
              />
              {/* Pillar 5 */}
              <path
                d="M 20 -36 L 30 -36 L 30 65 L 25 76 L 20 65 Z"
                fill={`url(#${goldMetallic})`}
                stroke="#5C3B00"
                strokeWidth="1"
              />
              {/* Pillar 6 */}
              <path
                d="M 38 -36 L 48 -36 L 48 45 L 43 54 L 38 45 Z"
                fill={`url(#${goldDeep})`}
                stroke="#5C3B00"
                strokeWidth="1"
              />

              {/* Top Right 'P' Loop */}
              <path
                d="M 40 -48 L 75 -48 C 88 -48, 88 -15, 75 -15 L 40 -15 Z"
                fill={`url(#${goldGleam})`}
                stroke="#5C3B00"
                strokeWidth="1.2"
              />
              <path
                d="M 48 -40 L 70 -40 C 76 -40, 76 -23, 70 -23 L 48 -23 Z"
                fill={`url(#${crestBg})`}
                stroke={`url(#${goldMetallic})`}
                strokeWidth="1"
              />
            </g>
          </g>

          {/* 4. Official 3D Golden Handshake (Central Heart of the Emblem) */}
          <g filter={`url(#drop_${id})`}>
            {/* Left Arm & Cuff with Ornate Engravings */}
            <path
              d="M 180 340 C 195 330, 215 335, 230 345 L 246 356 C 250 359, 252 364, 248 368 C 244 372, 238 372, 232 368 L 215 358 L 195 350 Z"
              fill={`url(#${goldGleam})`}
              stroke="#5C3B00"
              strokeWidth="2"
            />
            {/* Left Wrist Cuff Decorative Bands */}
            <path d="M 188 344 L 202 352" stroke="#FFF7C2" strokeWidth="2" />
            <path d="M 194 340 L 208 348" stroke="#5C3B00" strokeWidth="1.5" />

            {/* Right Arm & Cuff with Ornate Engravings */}
            <path
              d="M 320 340 C 305 330, 285 335, 270 345 L 254 356 C 250 359, 248 364, 252 368 C 256 372, 262 372, 268 368 L 285 358 L 305 350 Z"
              fill={`url(#${goldMetallic})`}
              stroke="#5C3B00"
              strokeWidth="2"
            />
            {/* Right Wrist Cuff Decorative Bands */}
            <path d="M 312 344 L 298 352" stroke="#FFF7C2" strokeWidth="2" />
            <path d="M 306 340 L 292 348" stroke="#5C3B00" strokeWidth="1.5" />

            {/* Clasping Handshake Fingers & Palm Grip */}
            {/* Right Thumb arching over Left Hand */}
            <path
              d="M 235 342 C 242 338, 256 338, 262 345 C 265 348, 264 353, 258 355 L 245 354 Z"
              fill={`url(#${goldGleam})`}
              stroke="#5C3B00"
              strokeWidth="1.5"
            />
            {/* Left Thumb arching over Right Hand */}
            <path
              d="M 265 342 C 258 338, 244 338, 238 345 C 235 348, 236 353, 242 355 L 255 354 Z"
              fill={`url(#${goldMetallic})`}
              stroke="#5C3B00"
              strokeWidth="1.5"
            />

            {/* Sculpted Interlocking Fingers (4 Fingers Clasped) */}
            <ellipse cx="238" cy="360" rx="7" ry="5.5" fill={`url(#${goldGleam})`} stroke="#5C3B00" strokeWidth="1.2" />
            <ellipse cx="248" cy="362" rx="7" ry="5.5" fill={`url(#${goldMetallic})`} stroke="#5C3B00" strokeWidth="1.2" />
            <ellipse cx="258" cy="362" rx="7" ry="5.5" fill={`url(#${goldDeep})`} stroke="#5C3B00" strokeWidth="1.2" />
            <ellipse cx="268" cy="358" rx="6.5" ry="5" fill={`url(#${goldMetallic})`} stroke="#5C3B00" strokeWidth="1.2" />

            {/* Knuckle Gleam Specular Highlights */}
            <circle cx="238" cy="358" r="2" fill="#FFFFFF" opacity="0.9" />
            <circle cx="248" cy="360" r="2" fill="#FFFFFF" opacity="0.9" />
            <circle cx="258" cy="360" r="2" fill="#FFFFFF" opacity="0.9" />
          </g>

          {/* 5. Majestic Royal 5-Point Crown atop the Crest */}
          <g filter={`url(#drop_${id})`}>
            {/* Crown Base Rim */}
            <path
              d="M 180 115 Q 250 125 320 115 L 316 126 Q 250 136 184 126 Z"
              fill={`url(#${goldMetallic})`}
              stroke="#5C3B00"
              strokeWidth="1.5"
            />
            {/* Crown Base Studded Filigree */}
            <circle cx="200" cy="120" r="2" fill="#FFFFFF" />
            <circle cx="225" cy="122" r="2" fill="#FFFFFF" />
            <circle cx="275" cy="122" r="2" fill="#FFFFFF" />
            <circle cx="300" cy="120" r="2" fill="#FFFFFF" />

            {/* Crown Center Jewel (Crimson Teardrop Ruby) */}
            <ellipse cx="250" cy="116" rx="9" ry="12" fill={`url(#${rubyGrad})`} stroke="#FFEAA7" strokeWidth="1.5" />
            <circle cx="248" cy="112" r="2.5" fill="#FFFFFF" opacity="0.9" />

            {/* Crown Flank Jewels (Deep Sapphire Blue) */}
            <circle cx="218" cy="118" r="6" fill={`url(#${sapphireGrad})`} stroke="#FFEAA7" strokeWidth="1.2" />
            <circle cx="216" cy="116" r="1.5" fill="#FFFFFF" opacity="0.9" />

            <circle cx="282" cy="118" r="6" fill={`url(#${sapphireGrad})`} stroke="#FFEAA7" strokeWidth="1.2" />
            <circle cx="280" cy="116" r="1.5" fill="#FFFFFF" opacity="0.9" />

            {/* 5 Crown Peaks (Spires) */}
            <path
              d="M 180 115 L 175 75 L 205 92 L 250 48 L 295 92 L 325 75 L 320 115 Z"
              fill={`url(#${goldGleam})`}
              stroke="#684200"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* 5 Glowing Golden Pearl Orbs at Peak Tips */}
            <circle cx="175" cy="72" r="8" fill={`url(#${goldMetallic})`} stroke="#FFF" strokeWidth="1.2" />
            <circle cx="205" cy="90" r="6.5" fill={`url(#${goldMetallic})`} stroke="#FFF" strokeWidth="1" />
            <circle cx="250" cy="42" r="11" fill={`url(#${goldGleam})`} stroke="#FFF" strokeWidth="1.5" />
            <circle cx="295" cy="90" r="6.5" fill={`url(#${goldMetallic})`} stroke="#FFF" strokeWidth="1" />
            <circle cx="325" cy="72" r="8" fill={`url(#${goldMetallic})`} stroke="#FFF" strokeWidth="1.2" />

            {/* Pearl Core Highlights */}
            <circle cx="247" cy="38" r="3.5" fill="#FFFFFF" opacity="0.95" />
            <circle cx="173" cy="69" r="2.2" fill="#FFFFFF" opacity="0.95" />
            <circle cx="323" cy="69" r="2.2" fill="#FFFFFF" opacity="0.95" />
          </g>

          {/* 6. Integrated Official Typography (Matches user uploaded image) */}
          {showFullIntegrated && (
            <g filter={`url(#drop_${id})`}>
              {/* Line 1: MANPOWER in Bold Embossed Golden Serif Capitals */}
              <text
                x="250"
                y="418"
                textAnchor="middle"
                fill="#000000"
                fontFamily="'Cinzel', 'Times New Roman', serif"
                fontWeight="900"
                fontSize="42"
                letterSpacing="4"
                stroke="#000000"
                strokeWidth="6"
              >
                MANPOWER
              </text>
              <text
                x="250"
                y="418"
                textAnchor="middle"
                fill={`url(#${goldDeep})`}
                fontFamily="'Cinzel', 'Times New Roman', serif"
                fontWeight="900"
                fontSize="42"
                letterSpacing="4"
                stroke="#5C3B00"
                strokeWidth="1.5"
              >
                MANPOWER
              </text>
              <text
                x="250"
                y="416"
                textAnchor="middle"
                fill={`url(#${goldGleam})`}
                fontFamily="'Cinzel', 'Times New Roman', serif"
                fontWeight="900"
                fontSize="42"
                letterSpacing="4"
              >
                MANPOWER
              </text>

              {/* Line 2: — SERVICES — in Spaced-Out Golden Sans-Serif */}
              <g transform="translate(0, 448)">
                {/* Left Horizontal Rule */}
                <line x1="105" y1="-8" x2="185" y2="-8" stroke={`url(#${goldGleam})`} strokeWidth="3" strokeLinecap="round" />
                {/* Text SERVICES */}
                <text
                  x="250"
                  y="0"
                  textAnchor="middle"
                  fill={`url(#${goldGleam})`}
                  fontFamily="'Space Grotesk', 'Arial Black', sans-serif"
                  fontWeight="900"
                  fontSize="24"
                  letterSpacing="9"
                  stroke="#5C3B00"
                  strokeWidth="0.8"
                >
                  SERVICES
                </text>
                {/* Right Horizontal Rule */}
                <line x1="315" y1="-8" x2="395" y2="-8" stroke={`url(#${goldGleam})`} strokeWidth="3" strokeLinecap="round" />
              </g>
            </g>
          )}

          {/* 7. Sparkling Stars & Optical Flares at Key Vertices */}
          <g fill="#FFFFFF" opacity="0.95">
            {/* Top Crown Pearl Flare */}
            <path d="M 250 24 L 253 38 L 265 42 L 253 46 L 250 60 L 247 46 L 235 42 L 247 38 Z" />
            {/* Left Wing Star */}
            <path d="M 78 135 L 79.5 141 L 85.5 142.5 L 79.5 144 L 78 150 L 76.5 144 L 70.5 142.5 L 76.5 141 Z" />
            {/* Right Wing Star */}
            <path d="M 422 135 L 423.5 141 L 429.5 142.5 L 423.5 144 L 422 150 L 420.5 144 L 414.5 142.5 L 420.5 141 Z" />
            {/* Center Handshake Clasp Flare */}
            <path d="M 250 348 L 251.5 353 L 256.5 354.5 L 251.5 356 L 250 361 L 248.5 356 L 243.5 354.5 L 248.5 353 Z" opacity="0.8" />
            {/* Text 'M' Flare */}
            <path d="M 125 405 L 126.5 409 L 130.5 410.5 L 126.5 412 L 125 416 L 123.5 412 L 119.5 410.5 L 123.5 409 Z" opacity="0.85" />
            {/* Text 'R' Flare */}
            <path d="M 375 405 L 376.5 409 L 380.5 410.5 L 376.5 412 L 375 416 L 373.5 412 L 369.5 410.5 L 373.5 409 Z" opacity="0.85" />
          </g>
        </svg>
      </div>

      {/* Brand Typography when not in integrated full emblem mode */}
      {showText && !showFullIntegrated && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span
              className={`font-heading font-black tracking-wider uppercase ${
                isLight ? 'text-slate-900' : 'text-white'
              } ${currentSize.titleSize}`}
            >
              MMP
            </span>
            <span className="font-extrabold tracking-wider uppercase text-[#f5d061] text-xs sm:text-sm font-heading">
              MANPOWER SERVICES
            </span>
          </div>
          <span
            className={`font-medium tracking-tight ${
              isLight ? 'text-slate-600' : 'text-amber-200/90'
            } ${currentSize.subClass}`}
          >
            Building Careers • Growing Businesses • Connecting Opportunities
          </span>
        </div>
      )}
    </div>
  );
};
