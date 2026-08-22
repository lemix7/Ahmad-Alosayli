import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ExternalLink,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Activity,
  ChevronRight,
  Github,
  X,
} from "lucide-react";
import TextReveal from "./TextReveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ProjectItem {
  id: string;
  number: string;
  year: string;
  isNew?: boolean;
  title: string;
  subtitle: string;
  category: string;
  categoryTag: string;
  description: string;
  tags: string[];
  gradient: string;
  accentColor: string;
  liveUrl?: string;
  githubUrl?: string;
  stats?: { label: string; value: string }[];
  type: "orion" | "ennea" | "kia" | "casino" | "nftfest";
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "orion",
    number: "01",
    year: "2025",
    isNew: true,
    title: "ORION",
    subtitle: "AI-Powered Growth",
    category: "SAAS PLATFORM",
    categoryTag: "SAAS PLATFORM →",
    description:
      "SaaS growth copilot automating sales, marketing & data management with AI-powered lead scoring.",
    tags: ["React 19", "Next.js", "Tailwind CSS", "Python / FastAPI", "PostgreSQL", "OpenAI API"],
    gradient: "from-emerald-950/40 via-neutral-900 to-neutral-950",
    accentColor: "#10b981",
    liveUrl: "https://orion-preview.example.com",
    githubUrl: "https://github.com",
    stats: [
      { label: "Active Revenue", value: "50 000€" },
      { label: "Conversion Rate", value: "+34.8%" },
      { label: "AI Accuracy", value: "99.4%" },
    ],
    type: "orion",
  },
  {
    id: "ennea",
    number: "02",
    year: "2024",
    title: "ENNEA",
    subtitle: "Your Web3 Journey",
    category: "WEB3 LANDING",
    categoryTag: "WEB3 LANDING →",
    description:
      "Next-generation decentralized finance gateway with non-custodial portfolio tracking, sub-second cross-chain swaps, and automated yield analytics.",
    tags: ["TypeScript", "Solidity", "Wagmi / Viem", "Tailwind CSS", "Ethers.js", "GSAP"],
    gradient: "from-violet-950/40 via-neutral-900 to-neutral-950",
    accentColor: "#8b5cf6",
    liveUrl: "https://ennea-web3.example.com",
    githubUrl: "https://github.com",
    stats: [
      { label: "Total Volume", value: "$12.4M" },
      { label: "Chains", value: "8 Connected" },
      { label: "Latency", value: "0.4s" },
    ],
    type: "ennea",
  },
  {
    id: "kia",
    number: "03",
    year: "2024",
    title: "KIA EV9",
    subtitle: "Experience Innovation",
    category: "3D NFT EXPERIENCE",
    categoryTag: "3D NFT EXPERIENCE →",
    description:
      "Immersive 3D web configurator and digital collectible experience celebrating the flagship all-electric SUV with real-time spatial telemetry.",
    tags: ["Three.js", "React Three Fiber", "GLSL Shaders", "WebAudio API", "Tailwind CSS"],
    gradient: "from-cyan-950/40 via-neutral-900 to-neutral-950",
    accentColor: "#06b6d4",
    liveUrl: "https://kia-ev9-experience.example.com",
    githubUrl: "https://github.com",
    stats: [
      { label: "Range (WLTP)", value: "541 km" },
      { label: "Charging", value: "800V Ultra" },
      { label: "Acceleration", value: "5.3s" },
    ],
    type: "kia",
  },
  {
    id: "casino",
    number: "04",
    year: "2023",
    title: "CASINO",
    subtitle: "Play & Earn",
    category: "CRYPTO PLATFORM",
    categoryTag: "CRYPTO PLATFORM →",
    description:
      "Provably fair decentralized gaming platform with instant on-chain settlement, real-time multiplayer lobbies, and audited smart contracts.",
    tags: ["React", "Node.js", "Socket.io", "PostgreSQL", "Web3.js", "Tailwind CSS"],
    gradient: "from-amber-950/40 via-neutral-900 to-neutral-950",
    accentColor: "#f59e0b",
    liveUrl: "https://casino-web3.example.com",
    githubUrl: "https://github.com",
    stats: [
      { label: "Jackpot Pool", value: "$1.48M" },
      { label: "Provably Fair", value: "100% Audited" },
      { label: "Active Players", value: "48,200+" },
    ],
    type: "casino",
  },
  {
    id: "nftfest",
    number: "05",
    year: "2023",
    title: "NFT FEST",
    subtitle: "Digital Art Festival",
    category: "WEB3 EVENT",
    categoryTag: "WEB3 EVENT →",
    description:
      "Interactive international digital art festival platform featuring live VR galleries, generative art drops, and dynamic pass ticketing.",
    tags: ["React", "GSAP ScrollTrigger", "WebXR", "Supabase", "Tailwind CSS"],
    gradient: "from-rose-950/40 via-neutral-900 to-neutral-950",
    accentColor: "#f43f5e",
    liveUrl: "https://nftfest-global.example.com",
    githubUrl: "https://github.com",
    stats: [
      { label: "Featured Artists", value: "120+" },
      { label: "Virtual Attendees", value: "85,000" },
      { label: "Artworks Minted", value: "3,400+" },
    ],
    type: "nftfest",
  },
];

/* -------------------------------------------------------------------------- */
/* PREVIEW VISUAL COMPONENTS (High Fidelity Custom Interactive Mockups)      */
/* -------------------------------------------------------------------------- */

const OrionMockup: React.FC = () => (
  <div className="w-full h-full bg-[#0b0f14] text-neutral-300 font-sans flex text-[10px] sm:text-[11px] select-none overflow-hidden relative border border-neutral-800/80 rounded-2xl shadow-inner">
    {/* Left Sidebar matching exact screenshot */}
    <div className="w-28 sm:w-36 md:w-44 bg-[#080c10]/95 border-r border-neutral-800/70 p-2 sm:p-4 flex flex-col justify-between hidden md:flex shrink-0">
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-neutral-800/80">
          <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          <span className="font-semibold text-white tracking-wide text-xs">Tableau de bord</span>
        </div>
        <nav className="space-y-1 text-neutral-400">
          {[
            "Modèles",
            "Utilisateurs",
            "Produits",
            "Organisations",
            "Finance",
            "SEO & GEO",
            "Paiements",
            "Affiliations",
            "Comptabilité",
          ].map((item, idx) => (
            <div
              key={item}
              className={`flex items-center justify-between px-2 py-0.5 sm:py-1 rounded transition-colors text-[10px] sm:text-[11px] ${
                idx === 0 ? "bg-neutral-800/60 text-white font-medium" : "hover:text-neutral-200"
              }`}
            >
              <span>{item}</span>
              <ChevronRight className="w-2.5 h-2.5 opacity-40" />
            </div>
          ))}
        </nav>
      </div>
      <div className="p-2 rounded bg-neutral-900/60 border border-neutral-800 text-[9px] text-neutral-400">
        <div className="flex items-center gap-1 text-emerald-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>API Connected</span>
        </div>
        <span className="text-[8px] opacity-70">Latency: 24ms</span>
      </div>
    </div>

    {/* Main Content Area */}
    <div className="flex-1 flex flex-col p-2.5 sm:p-4 overflow-hidden bg-gradient-to-b from-[#0e141b] to-[#090d12] justify-between">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-2 border-b border-neutral-800/60 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-semibold text-white">Conversions attribuées</span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Live Stream
          </span>
        </div>
        <div className="flex items-center gap-2 text-neutral-400 text-[9px] sm:text-[10px]">
          <span className="bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
            8 oct. 2025 – 10 nov. 2025
          </span>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 my-1.5 sm:my-2">
        {[
          { label: "Taux de conv.", val: "4.82%", up: "+1.2%" },
          { label: "Campagnes", val: "18 Actives", up: "+3" },
          { label: "Flux AI", val: "1,240 /m", up: "+24%" },
          { label: "E-mail ROI", val: "340.5%", up: "+14%" },
        ].map((m, i) => (
          <div
            key={i}
            className="p-1.5 sm:p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition-colors"
          >
            <div className="text-neutral-400 text-[8px] sm:text-[9px] truncate">{m.label}</div>
            <div className="text-xs sm:text-sm font-bold text-white mt-0.5 flex items-center justify-between">
              <span>{m.val}</span>
              <span className="text-[8px] sm:text-[9px] font-normal text-emerald-400">{m.up}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart Graphic */}
      <div className="p-2 sm:p-2.5 rounded-lg bg-neutral-900/40 border border-neutral-800/60 relative my-1 sm:my-1.5">
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-neutral-400 mb-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span className="text-neutral-200 font-medium truncate">Vue d'ensemble des revenus</span>
          </div>
          <span className="text-emerald-400 font-semibold text-xs sm:text-sm">50 000€</span>
        </div>
        <svg className="w-full h-10 sm:h-16 overflow-visible" viewBox="0 0 500 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M 0,70 Q 70,20 140,50 T 280,20 T 420,40 T 500,10 L 500,100 L 0,100 Z"
            fill="url(#chartGrad)"
          />
          <path
            d="M 0,70 Q 70,20 140,50 T 280,20 T 420,40 T 500,10"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
          />
          <path
            d="M 0,85 Q 80,60 160,75 T 320,50 T 500,35"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.7"
          />
        </svg>
      </div>

      {/* Table Rows Preview */}
      <div className="space-y-1 overflow-hidden">
        <div className="text-[9px] sm:text-[10px] font-medium text-neutral-400 flex justify-between px-1">
          <span>Flux les plus performants</span>
          <span>Conversion</span>
        </div>
        {[
          { name: "Panier abandonné", rate: "18.4%", conv: "94%" },
          { name: "Séquence de bienvenue", rate: "14.2%", conv: "87%" },
          { name: "Offre 24h Flash VIP", rate: "22.6%", conv: "96%" },
        ].slice(0, 2).map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-2 py-1 rounded bg-neutral-900/50 border border-neutral-800/50 text-[9px] sm:text-[10px]"
          >
            <div className="flex items-center gap-1.5 truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
              <span className="text-neutral-200 truncate">{row.name}</span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-neutral-400">{row.rate}</span>
              <span className="text-emerald-400 font-semibold">{row.conv}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const EnneaMockup: React.FC = () => (
  <div className="w-full h-full bg-[#0c0817] text-neutral-300 font-sans p-3 sm:p-5 flex flex-col justify-between border border-violet-900/40 rounded-2xl relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />

    {/* Header */}
    <div className="relative z-10 flex items-center justify-between pb-2 border-b border-violet-900/30">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xs shadow-[0_0_15px_#8b5cf6]">
          E
        </div>
        <div>
          <div className="text-xs sm:text-sm font-bold text-white tracking-wide">ENNEA PROTOCOL</div>
          <div className="text-[8px] sm:text-[9px] text-violet-400">Multi-Chain Portal v3</div>
        </div>
      </div>
      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-violet-950/80 border border-violet-700/50 text-violet-300">
        0x7a3...f89c
      </span>
    </div>

    {/* Center visual: Token Swap & Liquidity Card */}
    <div className="relative z-10 my-auto grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 py-1">
      {/* Swap Box */}
      <div className="p-2.5 sm:p-3 rounded-xl bg-neutral-900/80 border border-violet-800/40 backdrop-blur-md space-y-1.5 sm:space-y-2">
        <div className="flex justify-between text-[9px] sm:text-[10px] text-neutral-400">
          <span>Instant Cross-Swap</span>
          <span className="text-violet-400">Gas: ~0.001 ETH</span>
        </div>
        <div className="p-1.5 sm:p-2 rounded-lg bg-neutral-950/80 border border-neutral-800 flex items-center justify-between">
          <div>
            <div className="text-[8px] sm:text-[9px] text-neutral-500">Pay</div>
            <div className="text-xs sm:text-sm font-bold text-white">4.500 ETH</div>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-[9px] font-semibold text-neutral-200">
            Ethereum
          </span>
        </div>
        <div className="p-1.5 sm:p-2 rounded-lg bg-neutral-950/80 border border-neutral-800 flex items-center justify-between">
          <div>
            <div className="text-[8px] sm:text-[9px] text-neutral-500">Receive</div>
            <div className="text-xs sm:text-sm font-bold text-emerald-400">14,850 USDC</div>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-neutral-800 text-[9px] font-semibold text-neutral-200">
            Polygon
          </span>
        </div>
      </div>

      {/* Yield & Portfolio Stats */}
      <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-violet-950/40 to-neutral-900/80 border border-violet-800/30 backdrop-blur-md flex flex-col justify-between space-y-1.5">
        <div>
          <span className="text-[9px] sm:text-[10px] text-violet-300 font-medium">Vault Yield</span>
          <div className="text-lg sm:text-xl font-black text-white mt-0.5 tracking-tight">
            $12,482,900
          </div>
          <div className="text-[9px] text-emerald-400 flex items-center gap-1 mt-0.5">
            <TrendingUp className="w-2.5 h-2.5" /> +21.8% APY
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1 pt-1.5 border-t border-violet-900/30 text-[9px]">
          <div>
            <div className="text-neutral-400 text-[8px]">24h Volume</div>
            <div className="font-semibold text-white">$3.8M</div>
          </div>
          <div>
            <div className="text-neutral-400 text-[8px]">Slippage</div>
            <div className="font-semibold text-white">&lt; 0.05%</div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Chain ticker */}
    <div className="relative z-10 flex items-center justify-between pt-1.5 border-t border-violet-900/30 text-[9px] sm:text-[10px] text-neutral-400">
      <span className="truncate">Ethereum • Arbitrum • Optimism • Polygon</span>
      <span className="text-violet-400 font-mono shrink-0">Synced</span>
    </div>
  </div>
);

const KiaMockup: React.FC = () => (
  <div className="w-full h-full bg-[#050b11] text-neutral-300 font-sans p-3 sm:p-5 flex flex-col justify-between border border-cyan-900/40 rounded-2xl relative overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#08334415_1px,transparent_1px),linear-gradient(to_bottom,#08334415_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

    {/* Top HUD */}
    <div className="relative z-10 flex items-center justify-between pb-2 border-b border-cyan-900/40">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-cyan-400 rounded-sm shadow-[0_0_8px_#22d3ee]" />
        <span className="text-xs sm:text-sm font-bold text-white tracking-widest font-mono">
          KIA EV9 // GT-LINE
        </span>
      </div>
      <span className="text-[9px] font-mono text-cyan-400 border border-cyan-800/80 px-2 py-0.5 rounded bg-cyan-950/40">
        3D STUDIO
      </span>
    </div>

    {/* Center 3D Car Wireframe Graphic */}
    <div className="relative z-10 my-auto flex flex-col items-center justify-center py-2 sm:py-3">
      <div className="relative w-full max-w-sm h-24 sm:h-28 flex items-center justify-center">
        <svg viewBox="0 0 400 160" className="w-full h-full overflow-visible drop-shadow-[0_0_20px_#06b6d4]">
          <path
            d="M 30,120 L 70,120 Q 95,95 125,95 Q 155,95 180,120 L 250,120 Q 275,95 305,95 Q 335,95 360,120 L 380,120 L 375,100 L 330,85 L 260,50 L 140,50 L 80,85 L 30,95 Z"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
          />
          <path
            d="M 145,55 L 255,55 L 315,85 L 95,85 Z"
            fill="#083344"
            fillOpacity="0.4"
            stroke="#67e8f9"
            strokeWidth="1.2"
          />
          <circle cx="125" cy="120" r="22" fill="#04121a" stroke="#22d3ee" strokeWidth="2" />
          <circle cx="125" cy="120" r="11" fill="#083344" stroke="#67e8f9" strokeWidth="1.2" />
          <circle cx="305" cy="120" r="22" fill="#04121a" stroke="#22d3ee" strokeWidth="2" />
          <circle cx="305" cy="120" r="11" fill="#083344" stroke="#67e8f9" strokeWidth="1.2" />
          <line x1="380" y1="105" x2="405" y2="105" stroke="#a5f3fc" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="30" y1="100" x2="15" y2="100" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
        </svg>

        <div className="absolute -bottom-1 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-600/40 text-[8px] sm:text-[9px] font-mono text-cyan-300 flex items-center gap-1 shadow-lg">
          <Activity className="w-2.5 h-2.5 text-cyan-400" />
          <span>DRAG 360°</span>
        </div>
      </div>
    </div>

    {/* Bottom Telemetry Bar */}
    <div className="relative z-10 grid grid-cols-3 gap-1.5 pt-2 border-t border-cyan-900/40 text-center">
      <div className="p-1 sm:p-1.5 rounded bg-cyan-950/30 border border-cyan-900/40">
        <div className="text-[8px] text-neutral-400">RANGE</div>
        <div className="text-xs sm:text-sm font-bold text-white font-mono">541 KM</div>
      </div>
      <div className="p-1 sm:p-1.5 rounded bg-cyan-950/30 border border-cyan-900/40">
        <div className="text-[8px] text-neutral-400">CHARGE</div>
        <div className="text-xs sm:text-sm font-bold text-cyan-400 font-mono">24 MIN</div>
      </div>
      <div className="p-1 sm:p-1.5 rounded bg-cyan-950/30 border border-cyan-900/40">
        <div className="text-[8px] text-neutral-400">0-100</div>
        <div className="text-xs sm:text-sm font-bold text-white font-mono">5.3 S</div>
      </div>
    </div>
  </div>
);

const CasinoMockup: React.FC = () => (
  <div className="w-full h-full bg-[#110c05] text-neutral-300 font-sans p-3 sm:p-5 flex flex-col justify-between border border-amber-900/40 rounded-2xl relative overflow-hidden">
    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

    {/* Header */}
    <div className="relative z-10 flex items-center justify-between pb-2 border-b border-amber-900/30">
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 rounded bg-amber-500 text-black font-black flex items-center justify-center text-xs shadow-[0_0_12px_#f59e0b]">
          ♠
        </div>
        <span className="text-xs sm:text-sm font-black text-amber-100 tracking-wider">
          CYBER CASINO
        </span>
      </div>
      <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-700/50 text-amber-300 text-[9px] font-mono">
        PROVABLY FAIR
      </span>
    </div>

    {/* Center Slots & Live Multipliers */}
    <div className="relative z-10 my-auto grid grid-cols-3 gap-1.5 sm:gap-2.5 py-1 sm:py-2">
      {[
        { title: "JACKPOT", val: "$1.48M", tag: "LIVE" },
        { title: "MULTIPLIER", val: "84.2x", tag: "RECENT" },
        { title: "ONLINE", val: "4,821", tag: "ACTIVE" },
      ].map((card, i) => (
        <div
          key={i}
          className="p-2 sm:p-2.5 rounded-xl bg-neutral-900/90 border border-amber-800/40 flex flex-col justify-center text-center shadow-lg"
        >
          <div className="text-[8px] text-amber-400/80 font-mono tracking-wider">
            {card.title}
          </div>
          <div className="text-xs sm:text-sm font-black text-white mt-0.5 truncate">{card.val}</div>
          <div className="text-[7px] sm:text-[8px] text-emerald-400 mt-0.5 font-semibold">{card.tag}</div>
        </div>
      ))}
    </div>

    {/* Bottom Live Bets Ticker */}
    <div className="relative z-10 space-y-1 pt-1.5 border-t border-amber-900/30 text-[9px] sm:text-[10px]">
      <div className="flex justify-between text-neutral-400 text-[8px]">
        <span>Recent High-Rollers</span>
        <span>Payout</span>
      </div>
      <div className="flex justify-between items-center px-2 py-0.5 sm:py-1 rounded bg-neutral-900/60 border border-neutral-800 text-[8px] sm:text-[9px]">
        <span className="text-neutral-300 truncate">0x48...9a (Roulette)</span>
        <span className="text-amber-400 font-bold shrink-0">+12.50 ETH</span>
      </div>
    </div>
  </div>
);

const NftFestMockup: React.FC = () => (
  <div className="w-full h-full bg-[#14060c] text-neutral-300 font-sans p-3 sm:p-5 flex flex-col justify-between border border-rose-900/40 rounded-2xl relative overflow-hidden">
    <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-600/15 rounded-full blur-3xl pointer-events-none" />

    {/* Header */}
    <div className="relative z-10 flex items-center justify-between pb-2 border-b border-rose-900/30">
      <div className="flex items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-rose-400" />
        <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
          NFT FEST GLOBAL
        </span>
      </div>
      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-rose-950/80 border border-rose-700/50 text-rose-300">
        PARIS • NYC
      </span>
    </div>

    {/* Center Virtual Gallery Tiles */}
    <div className="relative z-10 my-auto grid grid-cols-2 gap-2 sm:gap-3 py-1 sm:py-2">
      <div className="p-2 sm:p-2.5 rounded-xl bg-neutral-900/80 border border-rose-900/30 flex flex-col justify-between">
        <div className="h-16 sm:h-20 rounded-lg bg-gradient-to-tr from-rose-600/40 via-purple-600/30 to-amber-500/20 border border-rose-500/30 flex items-center justify-center text-center p-1">
          <span className="text-[11px] sm:text-xs font-bold text-white drop-shadow">
            Metaverse Stage
          </span>
        </div>
        <div className="flex justify-between text-[8px] sm:text-[9px] text-neutral-400 mt-1.5">
          <span>Live Keynote</span>
          <span className="text-rose-400 font-medium">85k Viewers</span>
        </div>
      </div>

      <div className="p-2 sm:p-2.5 rounded-xl bg-neutral-900/80 border border-rose-900/30 flex flex-col justify-between">
        <div className="h-16 sm:h-20 rounded-lg bg-gradient-to-br from-purple-900/40 to-rose-950/60 border border-rose-500/20 flex flex-col items-center justify-center p-1 text-center">
          <div className="text-[8px] text-rose-300">GENESIS DROP</div>
          <div className="text-sm sm:text-base font-black text-white">SOLD OUT</div>
          <div className="text-[8px] text-neutral-400">3,400 Editions</div>
        </div>
        <div className="flex justify-between text-[8px] sm:text-[9px] text-neutral-400 mt-1.5">
          <span>Vol</span>
          <span className="text-emerald-400 font-semibold">1,820 ETH</span>
        </div>
      </div>
    </div>

    {/* Bottom Footer */}
    <div className="relative z-10 flex items-center justify-between pt-1.5 border-t border-rose-900/30 text-[8px] sm:text-[9px] text-neutral-400">
      <span>120+ Curated Artists</span>
      <span className="text-rose-400 font-mono">Concluded</span>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* MAIN PROJECTS SECTION COMPONENT                                            */
/* -------------------------------------------------------------------------- */

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProjectModal, setSelectedProjectModal] = useState<ProjectItem | null>(null);

  // GSAP ScrollTrigger Setup
  useGSAP(
    () => {
      if (!triggerRef.current || typeof window === "undefined") return;

      const totalProjects = PROJECTS_DATA.length;
      if (totalProjects <= 1) return;

      // Pin the section and scrub through project indices
      const st = ScrollTrigger.create({
        id: "projects-scroll-trigger",
        trigger: triggerRef.current,
        start: "top top",
        end: `+=${(totalProjects - 1) * 100}%`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const newIndex = Math.min(
            totalProjects - 1,
            Math.max(0, Math.floor(progress * totalProjects + 0.05))
          );
          setActiveIndex(newIndex);
        },
      });

      return () => {
        st.kill();
      };
    },
    { scope: triggerRef }
  );

  // Smooth scroll to a specific project index on click
  const scrollToProject = (index: number) => {
    if (!triggerRef.current) return;
    const totalProjects = PROJECTS_DATA.length;
    const st = ScrollTrigger.getById("projects-scroll-trigger");

    if (st) {
      const targetScroll = st.start + (index / (totalProjects - 1)) * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    } else {
      setActiveIndex(index);
    }
  };

  const activeProject = PROJECTS_DATA[activeIndex] || PROJECTS_DATA[0];

  return (
    <div id="projects" ref={triggerRef} className="relative w-full bg-[#0d0d0d] text-white select-none border-t border-neutral-900">
      {/* Section Container matching exact padding & rhythm of Hero & About */}
      <section
        ref={containerRef}
        className="relative h-screen min-h-[640px] w-full bg-[#0d0d0d] text-white flex flex-col px-6 py-6 sm:px-10 sm:py-8 md:px-14 md:py-10 lg:px-16 lg:py-12 select-none overflow-hidden font-sans"
      >
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute inset-0 bg-radial-gradient from-neutral-900/30 to-transparent pointer-events-none" />

        {/* TOP BAR / SECTION HEADER */}
        <header className="relative z-20 flex items-center justify-between w-full shrink-0">
          <TextReveal
            as="h2"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase font-bold tracking-tight text-white"
            duration={1}
            ease="power4.out"
            animateOnScroll={true}
          >
            <span>My Projects</span>
          </TextReveal>
        </header>

        {/* MAIN BODY: 2-COLUMN LAYOUT ON DESKTOP, COMPACT ADAPTIVE STACK ON MOBILE */}
        <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-10 xl:gap-14 items-center justify-between flex-1 min-h-0 w-full overflow-hidden mt-4 sm:mt-5 lg:mt-6">
          
          {/* DESKTOP LEFT COLUMN (Hidden on mobile/tablet < lg) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-center h-full">
            {/* Big Dynamic Counter: "01 / 05" */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight text-white transition-all duration-300">
                {activeProject.number}
              </span>
              <span className="text-lg sm:text-xl font-light text-neutral-600">
                / {String(PROJECTS_DATA.length).padStart(2, "0")}
              </span>
            </div>

            {/* Vertically Stacked Project Titles */}
            <div className="space-y-3 lg:space-y-3 relative">
              {PROJECTS_DATA.map((proj, idx) => {
                const isActive = idx === activeIndex;

                return (
                  <div
                    key={proj.id}
                    onClick={() => scrollToProject(idx)}
                    className={`group cursor-pointer transition-all duration-500 relative pl-4 sm:pl-5 border-l-2 ${
                      isActive
                        ? "border-white opacity-100 translate-x-1"
                        : "border-transparent opacity-30 hover:opacity-75 translate-x-0"
                    }`}
                  >
                    {/* Year & Status Dot */}
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className={`text-[11px] font-mono tracking-wider ${
                          isActive ? "text-neutral-300 font-semibold" : "text-neutral-500"
                        }`}
                      >
                        {proj.year}
                      </span>
                      {proj.isNew && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-xl lg:text-2xl font-extrabold tracking-tight uppercase leading-none transition-colors ${
                        isActive ? "text-white" : "text-neutral-400 group-hover:text-neutral-200"
                      }`}
                    >
                      {proj.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs text-neutral-400 font-light mt-0.5 tracking-normal">
                      {proj.subtitle}
                    </p>

                    {/* Category Action Link */}
                    <div className="mt-0.5 flex items-center gap-1">
                      <span
                        className={`text-[11px] font-mono tracking-wider uppercase transition-colors ${
                          isActive
                            ? "text-neutral-300 font-medium"
                            : "text-neutral-500 group-hover:text-neutral-300"
                        }`}
                      >
                        {proj.categoryTag}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MOBILE/TABLET COMPACT HEADER (< lg) */}
          <div className="flex lg:hidden flex-col w-full shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white transition-all duration-300">
                  {activeProject.number}
                </span>
                <span className="text-sm sm:text-base font-light text-neutral-600">
                  / {String(PROJECTS_DATA.length).padStart(2, "0")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-neutral-400">{activeProject.year}</span>
                {activeProject.isNew && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                )}
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">
                  {activeProject.category}
                </span>
              </div>
            </div>

            <div className="mt-1 flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold uppercase text-white tracking-tight leading-none">
                  {activeProject.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light mt-0.5">
                  {activeProject.subtitle}
                </p>
              </div>

              {/* Mobile Quick Action Pill */}
              <button
                onClick={() => setSelectedProjectModal(activeProject)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-neutral-700 bg-neutral-900 text-xs font-semibold text-white hover:bg-white hover:text-black transition-all shadow-md active:scale-95"
              >
                <span>Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Project Card Showcase */}
          <div className="w-full lg:col-span-7 flex-1 h-[260px] sm:h-[340px] md:h-[400px] lg:h-[540px] max-h-[560px] relative rounded-2xl sm:rounded-3xl border border-neutral-800/90 bg-[#111111]/70 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col justify-between group">
            
            {/* Ambient project glowing backdrop */}
            <div
              className="absolute inset-0 transition-opacity duration-700 opacity-20 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 60% 40%, ${activeProject.accentColor} 0%, transparent 70%)`,
              }}
            />

            {/* STACK OF PROJECT PREVIEW MOCKUPS (Layered GSAP transition) */}
            <div className="relative w-full flex-1 p-2.5 sm:p-4 md:p-5 overflow-hidden">
              {PROJECTS_DATA.map((proj, idx) => {
                const isCurrent = idx === activeIndex;

                return (
                  <div
                    key={proj.id}
                    ref={(el) => (cardsRef.current[idx] = el)}
                    className={`absolute inset-2.5 sm:inset-4 md:inset-5 transition-all duration-700 ease-out transform ${
                      isCurrent
                        ? "opacity-100 scale-100 pointer-events-auto z-10 translate-y-0"
                        : idx < activeIndex
                        ? "opacity-0 scale-95 pointer-events-none -translate-y-4 z-0"
                        : "opacity-0 scale-105 pointer-events-none translate-y-4 z-0"
                    }`}
                  >
                    {proj.type === "orion" && <OrionMockup />}
                    {proj.type === "ennea" && <EnneaMockup />}
                    {proj.type === "kia" && <KiaMockup />}
                    {proj.type === "casino" && <CasinoMockup />}
                    {proj.type === "nftfest" && <NftFestMockup />}
                  </div>
                );
              })}

              {/* Floating Center Cursor / Play Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-neutral-900/80 border border-neutral-600/60 backdrop-blur-md flex items-center justify-center shadow-2xl">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white shadow-[0_0_10px_#ffffff] animate-pulse" />
                </div>
              </div>
            </div>

            {/* FLOATING BOTTOM GLASS INFO BAR */}
            <div className="relative z-20 p-3 sm:p-4 md:p-5 bg-gradient-to-t from-[#0c0c0c]/95 via-[#0c0c0c]/90 to-transparent border-t border-neutral-800/60 flex flex-row items-center justify-between gap-2 sm:gap-4 backdrop-blur-md shrink-0">
              <div className="max-w-[62%] sm:max-w-md">
                <p className="text-[10px] sm:text-xs md:text-sm text-neutral-200 font-light leading-tight sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {activeProject.description}
                </p>

                <div className="hidden sm:flex items-center gap-2 mt-1 text-[10px] sm:text-[11px] font-mono text-neutral-400">
                  <span>{activeProject.category}</span>
                  <span>•</span>
                  <span>{activeProject.year}</span>
                </div>
              </div>

              {/* Action Button: "View Project ↗" */}
              <button
                onClick={() => setSelectedProjectModal(activeProject)}
                className="group/btn inline-flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full border border-neutral-700 bg-neutral-900/90 text-xs sm:text-sm font-semibold tracking-wide text-neutral-200 hover:text-black hover:bg-white hover:border-white transition-all duration-300 shrink-0 shadow-lg active:scale-95"
              >
                <span className="whitespace-nowrap">View Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM PAGINATION BAR */}
        <div className="relative z-20 flex items-center justify-between w-full pt-2 shrink-0">
          {/* Interactive Progress dots */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {PROJECTS_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToProject(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-6 sm:w-8 bg-white"
                    : "w-1.5 sm:w-2 bg-neutral-700 hover:bg-neutral-500"
                }`}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          <div className="text-[10px] sm:text-[11px] font-mono text-neutral-500">
            {activeIndex + 1} OF {PROJECTS_DATA.length} PROJECTS
          </div>
        </div>
      </section>

      {/* PROJECT DETAILS MODAL */}
      {selectedProjectModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
          onClick={() => setSelectedProjectModal(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#121212] border border-neutral-800 rounded-2xl p-5 sm:p-8 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProjectModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-neutral-400">
                {selectedProjectModal.year} // {selectedProjectModal.category}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {selectedProjectModal.title}
            </h2>
            <p className="text-sm text-neutral-400 mt-1">{selectedProjectModal.subtitle}</p>

            {/* Modal Description */}
            <div className="my-4 sm:my-5 p-3.5 sm:p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 text-xs sm:text-sm text-neutral-200 leading-relaxed">
              {selectedProjectModal.description}
            </div>

            {/* Stats Row */}
            {selectedProjectModal.stats && (
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 sm:mb-6">
                {selectedProjectModal.stats.map((stat, i) => (
                  <div key={i} className="p-2.5 sm:p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-center">
                    <div className="text-[9px] sm:text-[10px] text-neutral-400 uppercase font-mono">{stat.label}</div>
                    <div className="text-xs sm:text-base font-bold text-white mt-0.5">{stat.value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Tech Stack Tags */}
            <div className="mb-4 sm:mb-6">
              <span className="text-xs font-mono text-neutral-400 uppercase block mb-2">Technologies Used</span>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {selectedProjectModal.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-neutral-800/80 border border-neutral-700 text-[11px] sm:text-xs font-mono text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-neutral-800">
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-medium text-neutral-400 hover:text-white transition-colors"
              >
                Close
              </button>
              {selectedProjectModal.githubUrl && (
                <a
                  href={selectedProjectModal.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-xs font-medium text-neutral-200 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              )}
              {selectedProjectModal.liveUrl && (
                <a
                  href={selectedProjectModal.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-white text-black hover:bg-neutral-200 text-xs font-semibold transition-colors shadow-md"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
