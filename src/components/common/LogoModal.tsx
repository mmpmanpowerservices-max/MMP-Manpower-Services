import React, { useState } from 'react';
import {
  X,
  Download,
  Copy,
  Check,
  ShieldCheck,
  Sparkles,
  Layers,
  Crown,
  HeartHandshake,
  Feather,
  Palette,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import { MmpLogo } from './MmpLogo';
import { OFFICIAL_SUPPORT_TEAM } from '../../data/mockData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'insignia' | 'heraldry' | 'details' | 'downloads'>('insignia');
  const [viewFormat, setViewFormat] = useState<'svg' | 'raster'>('svg');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const brandColors = [
    { name: 'Royal Gold (24K)', hex: '#D4AF37', desc: 'Prestige, Trust & Excellence' },
    { name: 'Midnight Navy', hex: '#0A1128', desc: 'Stability, Depth & Authority' },
    { name: 'Vibrant Saffron', hex: '#FF671F', desc: 'Energy, Youth & Dedication' },
    { name: 'Emerald Green', hex: '#046A38', desc: 'Growth, Prosperity & Integrity' },
    { name: 'Pure Specular Gold', hex: '#FFF2A8', desc: 'Illumination & Innovation' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="bg-[#040816] border border-[#d4af37]/50 rounded-3xl shadow-2xl shadow-black/80 max-w-4xl w-full text-white overflow-hidden my-4 relative">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#d4af37]/15 blur-3xl pointer-events-none rounded-full" />

        {/* Modal Header */}
        <div className="relative z-10 px-6 py-4 border-b border-[#d4af37]/30 flex items-center justify-between bg-[#070e24]/80">
          <div className="flex items-center gap-3">
            <MmpLogo size="xs" showText={false} withContainer={false} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-sm sm:text-base text-white tracking-wide">
                  MMP MANPOWER SERVICES
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 text-[#f5d061] text-[10px] font-bold">
                  OFFICIAL INSIGNIA
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-amber-200/70 font-mono">
                Brand Standards • Official Royal Heraldry • Corporate Identity & Contact Details
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 pt-3 border-b border-[#d4af37]/20 flex items-center gap-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('insignia')}
            className={`pb-3 px-3 transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'insignia'
                ? 'border-[#d4af37] text-[#f5d061] font-black'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Official Insignia</span>
          </button>
          <button
            onClick={() => setActiveTab('heraldry')}
            className={`pb-3 px-3 transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'heraldry'
                ? 'border-[#d4af37] text-[#f5d061] font-black'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Heraldic Elements</span>
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 px-3 transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'details'
                ? 'border-[#d4af37] text-[#f5d061] font-black'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Corporate Details</span>
          </button>
          <button
            onClick={() => setActiveTab('downloads')}
            className={`pb-3 px-3 transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'downloads'
                ? 'border-[#d4af37] text-[#f5d061] font-black'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Downloads & Media Kit</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {/* TAB 1: INSIGNIA SHOWCASE */}
          {activeTab === 'insignia' && (
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#08112e] via-[#050b1f] to-[#02050e] rounded-3xl border border-[#d4af37]/40 relative overflow-hidden text-center">
                {/* Format Toggle Pill */}
                <div className="absolute top-4 right-4 flex items-center bg-[#0d1b3e] rounded-xl p-1 border border-[#d4af37]/30 text-xs">
                  <button
                    onClick={() => setViewFormat('svg')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      viewFormat === 'svg'
                        ? 'bg-[#d4af37] text-slate-950 font-bold shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    Vector SVG
                  </button>
                  <button
                    onClick={() => setViewFormat('raster')}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      viewFormat === 'raster'
                        ? 'bg-[#d4af37] text-slate-950 font-bold shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    High-Res HD
                  </button>
                </div>

                <div className="p-4 sm:p-6 bg-gradient-to-b from-[#0e1c44] via-[#060d24] to-[#02040b] rounded-3xl border-2 border-[#d4af37]/70 shadow-2xl shadow-amber-950/60 my-4 max-w-sm w-full flex items-center justify-center">
                  <MmpLogo
                    size="hero"
                    showText={false}
                    withContainer={false}
                    useImage={viewFormat === 'raster'}
                  />
                </div>

                <h3 className="text-xl sm:text-2xl font-black font-heading text-white tracking-wider mt-2">
                  MMP MANPOWER SERVICES
                </h3>
                <p className="text-sm font-black text-[#f5d061] tracking-widest uppercase font-mono mt-1">
                  YOUR WORKFORCE. OUR STRENGTH. YOUR SUCCESS.
                </p>
                <p className="text-xs text-amber-200/80 font-medium tracking-wide mt-1">
                  Building Careers • Growing Businesses • Connecting Opportunities
                </p>
              </div>

              {/* Brand Palette Row */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#f5d061] flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-[#d4af37]" />
                  <span>Official Corporate Palette</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {brandColors.map((c) => (
                    <div
                      key={c.hex}
                      onClick={() => handleCopy(c.hex, c.hex)}
                      className="p-3 rounded-2xl bg-[#09132e] border border-white/10 hover:border-[#d4af37]/60 cursor-pointer transition-all group"
                    >
                      <div
                        className="w-full h-10 rounded-xl mb-2 border border-white/20 shadow-inner"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div className="text-xs font-bold text-white group-hover:text-[#f5d061]">
                        {c.name}
                      </div>
                      <div className="text-[10px] font-mono text-amber-200/70 flex items-center justify-between">
                        <span>{c.hex}</span>
                        {copiedKey === c.hex ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HERALDRY & SYMBOLISM */}
          {activeTab === 'heraldry' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-[#09132e] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#f5d061] font-bold text-sm">
                  <Crown className="w-4 h-4 text-[#d4af37]" />
                  <span>5-Peak Royal Golden Crown</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Topped with 5 golden pearl finials radiating excellence across candidate screening, verification, training, placement, and SLA compliance. Adorned with central Saffron Topaz and flanking Emerald jewels symbolizing the vibrant spirit and growth of Bharat.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#09132e] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#f5d061] font-bold text-sm">
                  <HeartHandshake className="w-4 h-4 text-[#d4af37]" />
                  <span>Golden Handshake of Trust</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Sculpted golden partnership handshake at the heart of the insignia with detailed cuffs and interlocking grip, representing the sacred bond between job seekers and enterprises.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#09132e] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#f5d061] font-bold text-sm">
                  <Feather className="w-4 h-4 text-[#d4af37]" />
                  <span>Sweeping Saffron & Emerald Wings</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Multi-tiered plumage with vibrant crystalline Saffron on the left and Emerald Green on the right, honoring India's tricolor ethos and symbolizing national upward career mobility.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#09132e] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#f5d061] font-bold text-sm">
                  <Layers className="w-4 h-4 text-[#d4af37]" />
                  <span>3D Fluted M·M·P Monogram</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Inverted triangular shield in deep emerald green, encasing precision-beveled fluted golden pillars tapering down to a spear point, forming the iconic letters M · M · P.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#09132e] border border-white/10 space-y-2 md:col-span-2">
                <div className="flex items-center gap-2 text-[#f5d061] font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  <span>Dual-Tone Typography & Tricolor Baseline</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  <strong>MAN</strong> rendered in crystalline Saffron and <strong>POWER</strong> in crystalline Emerald Green, bordered with 24K gold foil. Underlined by <strong>SERVICES</strong> in spaced 24K Roman capitals and the official motto: <em>YOUR WORKFORCE. OUR STRENGTH. YOUR SUCCESS.</em>
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: CORPORATE DETAILS */}
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#09132e] border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="font-bold text-sm text-white">Full Registered Name</div>
                  <div className="font-mono text-xs text-[#f5d061] font-black">
                    {OFFICIAL_SUPPORT_TEAM.organizationName}
                  </div>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="font-bold text-sm text-white">Official Tagline / Motto</div>
                  <div className="font-mono text-xs text-[#f5d061] font-black text-right">
                    {OFFICIAL_SUPPORT_TEAM.tagline}
                  </div>
                </div>

                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="font-bold text-sm text-white">Secondary Mission Tagline</div>
                  <div className="font-mono text-xs text-amber-200/80 text-right">
                    {OFFICIAL_SUPPORT_TEAM.secondaryTagline}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#060c20] border border-[#d4af37]/30 space-y-2">
                    <div className="flex items-center gap-2 text-[#f5d061] font-bold text-xs">
                      <MapPin className="w-4 h-4 text-[#d4af37]" />
                      <span>Head Office (Karnataka)</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">
                      {OFFICIAL_SUPPORT_TEAM.headOfficeAddress}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#060c20] border border-[#d4af37]/30 space-y-2">
                    <div className="flex items-center gap-2 text-[#f5d061] font-bold text-xs">
                      <MapPin className="w-4 h-4 text-[#d4af37]" />
                      <span>Regional Operations Desk</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">
                      {OFFICIAL_SUPPORT_TEAM.raichurOfficeAddress}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Primary Helpline</span>
                    <a href={`tel:${OFFICIAL_SUPPORT_TEAM.phonePrimary}`} className="text-xs font-mono font-bold text-[#f5d061] hover:underline block">
                      {OFFICIAL_SUPPORT_TEAM.phonePrimary}
                    </a>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Secondary Phone</span>
                    <a href={`tel:${OFFICIAL_SUPPORT_TEAM.phoneSecondary}`} className="text-xs font-mono font-bold text-emerald-400 hover:underline block">
                      {OFFICIAL_SUPPORT_TEAM.phoneSecondary}
                    </a>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Official Email</span>
                    <a href={`mailto:${OFFICIAL_SUPPORT_TEAM.email}`} className="text-xs font-mono font-bold text-blue-300 hover:underline block truncate">
                      {OFFICIAL_SUPPORT_TEAM.email}
                    </a>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#0c183d] border border-[#d4af37]/40 text-xs text-amber-200/90 flex items-center justify-between">
                  <span>Working Hours: <strong>{OFFICIAL_SUPPORT_TEAM.workingHours}</strong></span>
                  <span className="text-xs text-emerald-400 font-bold">● Network Active</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DOWNLOADS & MEDIA KIT */}
          {activeTab === 'downloads' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Download official brand assets in production-ready formats for corporate collateral, partner integrations, job vacancy announcements, and verification seals:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#09132e] border border-white/10 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold font-mono">
                        VECTOR SVG
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Scalable Infinite</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">Official Vector Emblem (SVG)</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Infinitely scalable vector file containing the 3D crown, Saffron & Emerald wings, handshake, and dual-tone typography.
                    </p>
                  </div>
                  <a
                    href="/mmp-official-logo.svg"
                    download="mmp_official_logo.svg"
                    className="px-4 py-2.5 bg-gradient-to-r from-[#ffe685] via-[#d4af37] to-[#b08d24] text-slate-950 font-black text-xs rounded-xl flex items-center justify-center gap-2 hover:brightness-110 cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4 text-slate-950" />
                    <span>Download Vector SVG</span>
                  </a>
                </div>

                <div className="p-5 rounded-2xl bg-[#09132e] border border-white/10 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold font-mono">
                        HIGH-RES PNG
                      </span>
                      <span className="text-xs text-slate-400 font-mono">1024 × 1024 HD</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">Official Master Emblem (PNG)</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      High-resolution raster emblem with metallic lighting, deep midnight navy backdrop, and 24K gold foil reflections.
                    </p>
                  </div>
                  <a
                    href="/mmp-logo.png"
                    download="mmp_official_logo.png"
                    className="px-4 py-2.5 bg-[#0f2452] hover:bg-[#163578] text-[#f5d061] border border-[#d4af37]/50 font-black text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
                  >
                    <Download className="w-4 h-4 text-[#f5d061]" />
                    <span>Download Master PNG</span>
                  </a>
                </div>
              </div>

              {/* Tagline Copier */}
              <div className="p-4 rounded-2xl bg-[#070e24] border border-[#d4af37]/30 space-y-2">
                <span className="text-[10px] font-bold text-[#f5d061] uppercase tracking-wider block">
                  Copy Official Tagline
                </span>
                <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-white/10">
                  <span className="text-xs font-mono text-slate-200">
                    YOUR WORKFORCE. OUR STRENGTH. YOUR SUCCESS.
                  </span>
                  <button
                    onClick={() =>
                      handleCopy('YOUR WORKFORCE. OUR STRENGTH. YOUR SUCCESS.', 'tagline')
                    }
                    className="px-2.5 py-1 bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#f5d061] rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedKey === 'tagline' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'tagline' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#d4af37]/20 bg-[#070e24]/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span>MMP SHIELD™ Certified Digital Identity</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/15 text-white font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
