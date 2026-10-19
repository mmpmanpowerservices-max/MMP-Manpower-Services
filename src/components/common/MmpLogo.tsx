import React, { useId, useState } from 'react';

export interface MmpLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'badge' | 'seal';
  showText?: boolean;
  variant?: 'gold-on-dark' | 'gold-on-light' | 'seal' | 'image';
  withContainer?: boolean;
  mode?: 'auto' | 'full' | 'emblem' | 'image';
  animated?: boolean;
  svgClassName?: string;
  showSubtitle?: boolean;
  useImage?: boolean;
  onClick?: () => void;
}

export const MmpLogo: React.FC<MmpLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  variant = 'gold-on-dark',
  withContainer = true,
  mode = 'auto',
  animated = false,
  svgClassName = '',
  showSubtitle = true,
  useImage = false,
  onClick,
}) => {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, '');

  const sizeMap = {
    xs: { box: 34, titleSize: 'text-xs', subClass: 'text-[7.5px]' },
    sm: { box: 46, titleSize: 'text-sm', subClass: 'text-[9px]' },
    md: { box: 64, titleSize: 'text-base', subClass: 'text-[10px]' },
    badge: { box: 80, titleSize: 'text-lg', subClass: 'text-[11px]' },
    seal: { box: 100, titleSize: 'text-xl', subClass: 'text-xs' },
    lg: { box: 120, titleSize: 'text-xl', subClass: 'text-xs' },
    xl: { box: 160, titleSize: 'text-2xl', subClass: 'text-sm' },
    hero: { box: 260, titleSize: 'text-3xl', subClass: 'text-base' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Gradients IDs
  const goldMetallic = `goldMetallic_${id}`;
  const goldGleam = `goldGleam_${id}`;
  const goldDeep = `goldDeep_${id}`;
  const crestBg = `crestBg_${id}`;
  const radialGlow = `radialGlow_${id}`;
  const floorGlow = `floorGlow_${id}`;
  const saffronWing = `saffronWing_${id}`;
  const greenWing = `greenWing_${id}`;
  const jewelSaffron = `jewelSaffron_${id}`;
  const jewelGreen = `jewelGreen_${id}`;
  const jewelDiamond = `jewelDiamond_${id}`;
  const dropFilter = `drop_${id}`;

  const isLight = variant === 'gold-on-light';
  const showFullIntegrated =
    mode === 'full' || (mode === 'auto' && (size === 'hero' || size === 'xl'));
  const renderRaster = mode === 'image' || variant === 'image' || useImage;

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3.5 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Official MMP 3D Royal Logo & Handshake Emblem */}
      <div
        className={`relative shrink-0 flex items-center justify-center transition-all duration-300 ${
          withContainer
            ? isLight
              ? 'rounded-3xl p-1.5 bg-gradient-to-b from-[#050b18] via-[#02050e] to-[#000000] border-2 border-[#d4af37]/60 shadow-xl'
              : 'rounded-3xl p-1.5 bg-gradient-to-b from-[#0e1c44] via-[#060d24] to-[#02040b] border-2 border-[#d4af37]/75 shadow-2xl shadow-amber-950/40'
            : ''
        }`}
        style={{ width: currentSize.box, height: currentSize.box }}
      >
        {renderRaster ? (
          <img
            src="/mmp-logo.png"
            alt="MMP Manpower Services Official Emblem"
            className={`w-full h-full object-contain rounded-2xl drop-shadow-[0_4px_16px_rgba(212,175,55,0.45)] ${
              animated ? 'animate-pulse' : ''
            }`}
            onError={(e) => {
              // Fallback to SVG if image not loaded
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
        ) : (
          <svg
            viewBox="0 0 1024 1024"
            className={`w-full h-full drop-shadow-[0_4px_16px_rgba(212,175,55,0.45)] ${
              animated ? 'animate-emblem-pulse' : ''
            } ${svgClassName}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Background Glow */}
              <radialGradient id={radialGlow} cx="50%" cy="45%" r="65%">
                <stop offset="0%" stopColor="#0F1C42" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#0A1128" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#040918" stopOpacity="0" />
              </radialGradient>

              {/* Floor Golden Reflection */}
              <radialGradient id={floorGlow} cx="50%" cy="90%" r="50%">
                <stop offset="0%" stopColor="#F5D061" stopOpacity="0.3" />
                <stop offset="60%" stopColor="#D4AF37" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>

              {/* 24K Multi-Stop Metallic Gold */}
              <linearGradient id={goldMetallic} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFEE8" />
                <stop offset="20%" stopColor="#FDE47F" />
                <stop offset="45%" stopColor="#D4AF37" />
                <stop offset="70%" stopColor="#FFF2A8" />
                <stop offset="85%" stopColor="#C6941A" />
                <stop offset="100%" stopColor="#7A4D05" />
              </linearGradient>

              {/* Specular Edge Gleam */}
              <linearGradient id={goldGleam} x1="0%" y1="30%" x2="100%" y2="70%">
                <stop offset="0%" stopColor="#C99718" />
                <stop offset="25%" stopColor="#FFECA2" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="75%" stopColor="#F5D061" />
                <stop offset="100%" stopColor="#8A5A0A" />
              </linearGradient>

              {/* Deep Burnished Gold for 3D Shading */}
              <linearGradient id={goldDeep} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#FFE79A" />
                <stop offset="50%" stopColor="#B8860B" />
                <stop offset="100%" stopColor="#4A2F02" />
              </linearGradient>

              {/* Left Wing Saffron / Orange Crystalline Gradient */}
              <linearGradient id={saffronWing} x1="0%" y1="20%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#FFDD80" />
                <stop offset="25%" stopColor="#FF9933" />
                <stop offset="55%" stopColor="#FF671F" />
                <stop offset="85%" stopColor="#D35400" />
                <stop offset="100%" stopColor="#872200" />
              </linearGradient>

              {/* Right Wing Emerald Green Crystalline Gradient */}
              <linearGradient id={greenWing} x1="0%" y1="20%" x2="100%" y2="80%">
                <stop offset="0%" stopColor="#A7F3D0" />
                <stop offset="25%" stopColor="#34D399" />
                <stop offset="55%" stopColor="#10B981" />
                <stop offset="85%" stopColor="#046A38" />
                <stop offset="100%" stopColor="#023419" />
              </linearGradient>

              {/* Shield Deep Emerald Green Field */}
              <radialGradient id={crestBg} cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#0A3822" />
                <stop offset="70%" stopColor="#031F12" />
                <stop offset="100%" stopColor="#010D07" />
              </radialGradient>

              {/* Crown Jewels */}
              <radialGradient id={jewelSaffron} cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#FFF0A3" />
                <stop offset="40%" stopColor="#FF671F" />
                <stop offset="100%" stopColor="#992E00" />
              </radialGradient>
              <radialGradient id={jewelGreen} cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#D1FAE5" />
                <stop offset="40%" stopColor="#046A38" />
                <stop offset="100%" stopColor="#012411" />
              </radialGradient>
              <radialGradient id={jewelDiamond} cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#94A3B8" />
              </radialGradient>

              {/* Filter */}
              <filter id={dropFilter} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000000" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* 0. Ambient Glow & Reflection */}
            <circle cx="512" cy="440" r="420" fill={`url(#${radialGlow})`} />
            <ellipse cx="512" cy="980" rx="320" ry="40" fill={`url(#${floorGlow})`} />

            {/* 1. Outer Halo Concentric Rings */}
            <circle
              cx="512"
              cy="440"
              r="380"
              stroke={`url(#${goldMetallic})`}
              strokeWidth="4"
              strokeDasharray="24 10"
              opacity="0.6"
            />
            <circle
              cx="512"
              cy="440"
              r="365"
              stroke={`url(#${goldDeep})`}
              strokeWidth="2"
              opacity="0.4"
            />

            {/* 2. LEFT WING: Vibrant Crystalline Saffron Feathers */}
            <g filter={`url(#${dropFilter})`}>
              <path
                d="M 370 520 C 270 480, 160 380, 150 260 C 145 210, 170 230, 190 270 C 210 310, 240 350, 270 370 C 240 320, 195 250, 195 220 C 195 198, 220 216, 244 260 C 268 304, 300 356, 320 380 C 290 316, 260 250, 270 200 C 276 176, 292 200, 312 250 C 336 304, 356 370, 370 420 Z"
                fill={`url(#${saffronWing})`}
                stroke="#5C2500"
                strokeWidth="3"
              />
              <path
                d="M 360 550 C 290 540, 200 470, 175 390 C 160 350, 186 360, 214 396 C 246 436, 294 476, 340 496 C 300 450, 240 370, 240 336 C 240 316, 262 332, 290 380 C 318 428, 350 476, 374 516 Z"
                fill={`url(#${saffronWing})`}
                stroke="#5C2500"
                strokeWidth="2.5"
                opacity="0.95"
              />
              <path
                d="M 386 600 C 330 610, 250 560, 220 500 C 206 470, 230 476, 260 504 C 294 536, 340 564, 380 580 C 340 540, 286 480, 294 456 C 300 440, 320 456, 346 490 C 374 524, 394 564, 406 596 Z"
                fill={`url(#${saffronWing})`}
                stroke="#5C2500"
                strokeWidth="2"
                opacity="0.9"
              />
            </g>

            {/* 3. RIGHT WING: Vibrant Crystalline Emerald Green Feathers */}
            <g filter={`url(#${dropFilter})`}>
              <path
                d="M 654 520 C 754 480, 864 380, 874 260 C 879 210, 854 230, 834 270 C 814 310, 784 350, 754 370 C 784 320, 829 250, 829 220 C 829 198, 804 216, 780 260 C 756 304, 724 356, 704 380 C 734 316, 764 250, 754 200 C 748 176, 732 200, 712 250 C 688 304, 668 370, 654 420 Z"
                fill={`url(#${greenWing})`}
                stroke="#013B1B"
                strokeWidth="3"
              />
              <path
                d="M 664 550 C 734 540, 824 470, 849 390 C 864 350, 838 360, 810 396 C 778 436, 730 476, 684 496 C 724 450, 784 370, 784 336 C 784 316, 762 332, 734 380 C 706 428, 674 476, 650 516 Z"
                fill={`url(#${greenWing})`}
                stroke="#013B1B"
                strokeWidth="2.5"
                opacity="0.95"
              />
              <path
                d="M 638 600 C 694 610, 774 560, 804 500 C 818 470, 794 476, 764 504 C 730 536, 684 564, 644 580 C 684 540, 738 480, 730 456 C 724 440, 704 456, 678 490 C 650 524, 630 564, 618 596 Z"
                fill={`url(#${greenWing})`}
                stroke="#013B1B"
                strokeWidth="2"
                opacity="0.9"
              />
            </g>

            {/* 4. CENTER INVERTED SHIELD CREST */}
            <g filter={`url(#${dropFilter})`}>
              <path
                d="M 320 270 L 704 270 L 674 460 L 512 730 L 350 460 Z"
                fill={`url(#${crestBg})`}
                stroke={`url(#${goldMetallic})`}
                strokeWidth="12"
                strokeLinejoin="round"
              />
              <path
                d="M 344 286 L 680 286 L 652 452 L 512 696 L 372 452 Z"
                fill="none"
                stroke={`url(#${goldDeep})`}
                strokeWidth="4"
                opacity="0.85"
              />

              {/* 3D Fluted Columns forming MMP monogram tapering down to spear point */}
              <g transform="translate(512, 380)">
                <path d="M -150 -96 L 150 -96 L 150 -72 L -150 -72 Z" fill={`url(#${goldMetallic})`} stroke="#5C3B00" strokeWidth="2" />
                <path d="M -150 -96 L -110 -30 L -110 70 L -130 40 L -130 -72 Z" fill={`url(#${goldMetallic})`} stroke="#5C3B00" strokeWidth="2" />
                <path d="M -96 -72 L -76 -72 L -76 50 L -86 68 L -96 50 Z" fill={`url(#${goldDeep})`} stroke="#5C3B00" strokeWidth="2" />
                <path d="M -60 -72 L -40 -72 L -40 90 L -50 110 L -60 90 Z" fill={`url(#${goldMetallic})`} stroke="#5C3B00" strokeWidth="2" />
                <path d="M -24 -72 L -4 -72 L -4 130 L -14 152 L -24 130 Z" fill={`url(#${goldGleam})`} stroke="#5C3B00" strokeWidth="2" />
                {/* Central Spear Point Column */}
                <path d="M 4 -72 L 24 -72 L 24 156 L 14 184 L 4 156 Z" fill={`url(#${goldGleam})`} stroke="#5C3B00" strokeWidth="2" />
                <path d="M 40 -72 L 60 -72 L 60 130 L 50 152 L 40 130 Z" fill={`url(#${goldMetallic})`} stroke="#5C3B00" strokeWidth="2" />
                <path d="M 76 -72 L 96 -72 L 96 90 L 86 110 L 76 90 Z" fill={`url(#${goldDeep})`} stroke="#5C3B00" strokeWidth="2" />
                {/* Right P Loop */}
                <path d="M 80 -96 L 150 -96 C 176 -96, 176 -30, 150 -30 L 80 -30 Z" fill={`url(#${goldGleam})`} stroke="#5C3B00" strokeWidth="2" />
                <path d="M 96 -80 L 140 -80 C 152 -80, 152 -46, 140 -46 L 96 -46 Z" fill={`url(#${crestBg})`} stroke={`url(#${goldDeep})`} strokeWidth="2" />
              </g>
            </g>

            {/* 5. 3D GOLDEN HANDSHAKE OF TRUST */}
            <g filter={`url(#${dropFilter})`}>
              <path
                d="M 370 680 C 400 660, 440 670, 470 690 L 502 712 C 510 718, 514 728, 506 736 C 498 744, 486 744, 474 736 L 440 716 L 400 700 Z"
                fill={`url(#${goldGleam})`}
                stroke="#5C3B00"
                strokeWidth="3"
              />
              <path
                d="M 654 680 C 624 660, 584 670, 554 690 L 522 712 C 514 718, 510 728, 518 736 C 526 744, 538 744, 550 736 L 584 716 L 624 700 Z"
                fill={`url(#${goldMetallic})`}
                stroke="#5C3B00"
                strokeWidth="3"
              />
              <ellipse cx="488" cy="720" rx="14" ry="11" fill={`url(#${goldMetallic})`} stroke="#5C3B00" strokeWidth="2" />
              <ellipse cx="508" cy="724" rx="14" ry="11" fill={`url(#${goldDeep})`} stroke="#5C3B00" strokeWidth="2" />
              <ellipse cx="528" cy="724" rx="14" ry="11" fill={`url(#${goldMetallic})`} stroke="#5C3B00" strokeWidth="2" />
              <ellipse cx="548" cy="716" rx="13" ry="10" fill={`url(#${goldDeep})`} stroke="#5C3B00" strokeWidth="2" />
              <circle cx="488" cy="716" r="4" fill="#FFFFFF" opacity="0.9" />
              <circle cx="508" cy="720" r="4" fill="#FFFFFF" opacity="0.9" />
              <circle cx="528" cy="720" r="4" fill="#FFFFFF" opacity="0.9" />
            </g>

            {/* 6. 5-PEAK ROYAL GOLDEN CROWN ATOP THE CREST */}
            <g filter={`url(#${dropFilter})`}>
              <path
                d="M 360 230 Q 512 250 664 230 L 656 252 Q 512 272 368 252 Z"
                fill={`url(#${goldMetallic})`}
                stroke="#5C3B00"
                strokeWidth="3"
              />
              <path
                d="M 360 230 L 350 150 L 410 184 L 512 96 L 614 184 L 674 150 L 664 230 Z"
                fill={`url(#${goldGleam})`}
                stroke="#5C3B00"
                strokeWidth="4"
                strokeLinejoin="round"
              />
              <circle cx="350" cy="144" r="16" fill={`url(#${goldMetallic})`} stroke="#FFF" strokeWidth="2.5" />
              <circle cx="410" cy="180" r="13" fill={`url(#${goldMetallic})`} stroke="#FFF" strokeWidth="2" />
              <circle cx="512" cy="84" r="22" fill={`url(#${goldGleam})`} stroke="#FFF" strokeWidth="3" />
              <circle cx="614" cy="180" r="13" fill={`url(#${goldMetallic})`} stroke="#FFF" strokeWidth="2" />
              <circle cx="674" cy="144" r="16" fill={`url(#${goldMetallic})`} stroke="#FFF" strokeWidth="2.5" />

              <circle cx="506" cy="76" r="7" fill="#FFFFFF" opacity="0.95" />
              <circle cx="346" cy="138" r="4.5" fill="#FFFFFF" opacity="0.95" />
              <circle cx="670" cy="138" r="4.5" fill="#FFFFFF" opacity="0.95" />

              {/* Crown Jewels (Saffron Topaz, White Diamond, Emerald) */}
              <polygon points="512,216 528,232 512,248 496,232" fill={`url(#${jewelSaffron})`} stroke="#FFF" strokeWidth="2" />
              <polygon points="460,222 472,234 460,246 448,234" fill={`url(#${jewelDiamond})`} stroke="#FFF" strokeWidth="1.5" />
              <polygon points="564,222 576,234 564,246 552,234" fill={`url(#${jewelDiamond})`} stroke="#FFF" strokeWidth="1.5" />
              <circle cx="406" cy="234" r="11" fill={`url(#${jewelGreen})`} stroke="#FFF" strokeWidth="1.5" />
              <circle cx="618" cy="234" r="11" fill={`url(#${jewelGreen})`} stroke="#FFF" strokeWidth="1.5" />
              <circle cx="372" cy="236" r="8" fill={`url(#${jewelSaffron})`} stroke="#FFF" strokeWidth="1" />
              <circle cx="652" cy="236" r="8" fill={`url(#${jewelSaffron})`} stroke="#FFF" strokeWidth="1" />
            </g>

            {/* 7. FULL INTEGRATED TYPOGRAPHY */}
            {showFullIntegrated && (
              <g filter={`url(#${dropFilter})`}>
                {/* Shadow */}
                <text
                  x="320"
                  y="836"
                  fontFamily="'Cinzel', 'Times New Roman', serif"
                  fontWeight="900"
                  fontSize="78"
                  letterSpacing="4"
                  fill="#000000"
                  stroke="#000000"
                  strokeWidth="10"
                  textAnchor="middle"
                >
                  MAN
                </text>
                <text
                  x="660"
                  y="836"
                  fontFamily="'Cinzel', 'Times New Roman', serif"
                  fontWeight="900"
                  fontSize="78"
                  letterSpacing="4"
                  fill="#000000"
                  stroke="#000000"
                  strokeWidth="10"
                  textAnchor="middle"
                >
                  POWER
                </text>

                {/* "MAN" in Radiant Crystalline Saffron */}
                <text
                  x="320"
                  y="834"
                  fontFamily="'Cinzel', 'Times New Roman', serif"
                  fontWeight="900"
                  fontSize="78"
                  letterSpacing="4"
                  fill={`url(#${saffronWing})`}
                  stroke={`url(#${goldMetallic})`}
                  strokeWidth="2.5"
                  textAnchor="middle"
                >
                  MAN
                </text>

                {/* "POWER" in Radiant Crystalline Emerald Green */}
                <text
                  x="660"
                  y="834"
                  fontFamily="'Cinzel', 'Times New Roman', serif"
                  fontWeight="900"
                  fontSize="78"
                  letterSpacing="4"
                  fill={`url(#${greenWing})`}
                  stroke={`url(#${goldMetallic})`}
                  strokeWidth="2.5"
                  textAnchor="middle"
                >
                  POWER
                </text>

                {/* LINE 2: — SERVICES — */}
                <line x1="210" y1="886" x2="370" y2="886" stroke={`url(#${goldMetallic})`} strokeWidth="4" strokeLinecap="round" />
                <polygon points="370,886 360,881 360,891" fill={`url(#${goldMetallic})`} />
                <text
                  x="512"
                  y="896"
                  fontFamily="'Space Grotesk', 'Arial Black', sans-serif"
                  fontWeight="900"
                  fontSize="44"
                  letterSpacing="18"
                  fill={`url(#${goldGleam})`}
                  stroke="#5C3B00"
                  strokeWidth="1"
                  textAnchor="middle"
                >
                  SERVICES
                </text>
                <polygon points="654,886 664,881 664,891" fill={`url(#${goldMetallic})`} />
                <line x1="654" y1="886" x2="814" y2="886" stroke={`url(#${goldMetallic})`} strokeWidth="4" strokeLinecap="round" />

                {/* LINE 3: OFFICIAL TAGLINE */}
                <polygon points="512,940 522,950 512,960 502,950" fill={`url(#${jewelGreen})`} stroke={`url(#${goldMetallic})`} strokeWidth="2" />
                <path d="M 496 950 Q 470 944 440 950" stroke={`url(#${goldMetallic})`} strokeWidth="2" fill="none" />
                <path d="M 528 950 Q 554 944 584 950" stroke={`url(#${goldMetallic})`} strokeWidth="2" fill="none" />
                <text
                  x="512"
                  y="978"
                  fontFamily="'Space Grotesk', sans-serif"
                  fontWeight="800"
                  fontSize="24"
                  letterSpacing="5"
                  fill="#FFFFFF"
                  textAnchor="middle"
                >
                  YOUR WORKFORCE. OUR STRENGTH. YOUR SUCCESS.
                </text>

                {/* Tricolor Base Line */}
                <line x1="220" y1="1002" x2="414" y2="1002" stroke="#FF671F" strokeWidth="4" strokeLinecap="round" />
                <line x1="418" y1="1002" x2="606" y2="1002" stroke="#FFFFFF" strokeWidth="4" />
                <circle cx="512" cy="1002" r="5" fill="#D4AF37" />
                <line x1="610" y1="1002" x2="804" y2="1002" stroke="#046A38" strokeWidth="4" strokeLinecap="round" />
              </g>
            )}

            {/* Sparkles */}
            <g fill="#FFFFFF" opacity="0.95">
              <path d="M 512 60 L 515 76 L 528 80 L 515 84 L 512 100 L 509 84 L 496 80 L 509 76 Z" />
              <path d="M 160 250 L 162 258 L 170 260 L 162 262 L 160 270 L 158 262 L 150 260 L 158 258 Z" />
              <path d="M 860 250 L 862 258 L 870 260 L 862 262 L 860 270 L 858 262 L 850 260 L 858 258 Z" />
              <path d="M 512 710 L 513.5 715 L 518 716.5 L 513.5 718 L 512 723 L 510.5 718 L 506 716.5 L 510.5 715 Z" opacity="0.8" />
            </g>
          </svg>
        )}
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
          {showSubtitle && (
            <span
              className={`font-semibold tracking-wide uppercase ${
                isLight ? 'text-slate-700' : 'text-amber-300'
              } ${currentSize.subClass}`}
            >
              YOUR WORKFORCE. OUR STRENGTH. YOUR SUCCESS.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
