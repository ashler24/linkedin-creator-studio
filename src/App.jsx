import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Sparkles,
  Download,
  Type,
  Palette,
  Layout,
  Edit3,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  FileCode,
  CheckCircle,
  Info,
  Copy,
  Share2,
  X,
  Check,
  AlertCircle,
  Monitor,
  ArrowDownToLine,
  CheckCircle2,
  Bold,
  Italic,
  FileText,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Smartphone,
  Upload,
  RefreshCw,
  Layers,
  HelpCircle,
  Undo2,
  FileImage,
  ArrowUp,
  ArrowDown,
  Code
} from 'lucide-react';

// ==========================================
// --- CONSTANTS: LINKEDIN CAROUSEL & POST ---
// ==========================================

// --- Unicode Character Mappings for Rich Text Formatter ---
const unicodeMap = {
  bold: {
    A: '𝐀', B: '𝐁', C: '𝐂', D: '𝐃', E: '𝐄', F: '𝐅', G: '𝐆', H: '𝐇', I: '𝐈', J: '𝐉', K: '𝐊', L: '𝐋', M: '𝐌', N: '𝐍', O: '𝐎', P: '𝐏', Q: '𝐐', R: '𝐑', S: '𝐒', T: '𝐓', U: '𝐔', V: '𝐕', W: '𝐖', X: '𝐗', Y: '𝐘', Z: '𝐙',
    a: '𝐚', b: '𝐛', c: '𝐜', d: '𝐝', e: '𝐞', f: '𝐟', g: '𝐠', h: '𝐡', i: '𝐢', j: '𝐣', k: '𝐤', l: '𝐥', m: '𝐦', n: '𝐧', o: '𝐨', p: '𝐩', q: '𝐪', r: '𝐫', s: '𝐬', t: '𝐭', u: '𝐮', v: '𝐯', w: '𝐰', x: '𝐱', y: '𝐲', z: '𝐳',
    '0': '𝟎', '1': '𝟏', '2': '𝟐', '3': '𝟑', '4': '𝟒', '5': '𝟓', '6': '𝟔', '7': '𝟕', '8': '𝟖', '9': '𝟗'
  },
  italic: {
    A: '𝘈', B: '𝘉', C: '𝘊', D: '𝘋', E: '𝘌', F: '𝘍', G: '𝘎', H: '𝘏', I: '𝘑', J: '𝘑', K: '𝘒', L: '𝘓', M: '𝘔', N: '𝘕', O: '𝘖', P: '𝘗', Q: '𝘘', R: '𝘙', S: '𝘚', T: '𝘛', U: '𝘜', V: '𝘝', W: '𝘞', X: '𝘟', Y: '𝘠', Z: '𝘡',
    a: '𝘢', b: '𝘣', c: '𝘤', d: '𝘥', e: '𝘦', f: '𝘧', g: '𝘨', h: '𝘩', i: '𝘪', j: '𝘫', k: '𝘬', l: '𝘭', m: '𝘮', n: '𝘯', o: '𝘰', p: '𝘱', q: '𝘲', r: '𝘳', s: '𝘴', t: '𝘵', u: '𝘶', v: '𝘷', w: '𝘸', x: '𝘹', y: '𝘺', z: '𝘻'
  },
  boldItalic: {
    A: '𝘼', B: '𝘽', C: '𝘾', D: '𝘿', E: '𝙀', F: '𝙁', G: '𝙂', H: '𝙃', I: '𝙄', J: '𝙅', K: '𝙆', L: '𝙇', M: '𝙈', N: '𝙉', O: '𝙊', P: '𝙋', Q: '𝙌', R: '𝙍', S: '𝙎', T: '𝙏', U: '𝙐', V: '𝙑', W: '𝙒', X: '𝙓', Y: '𝙔', Z: '𝙕',
    a: '𝙖', b: '𝙗', c: '𝙘', d: '𝙙', e: '𝙚', f: '𝙛', g: '𝙜', h: '𝙝', i: '𝙞', j: '𝙟', k: '𝙠', l: '𝙡', m: '𝙢', n: '𝙣', o: '𝙤', p: '𝙥', q: '𝙦', r: '𝙧', s: '𝙨', t: '𝙩', u: '𝙪', v: '𝐯', w: '𝙬', x: '𝙭', y: '𝙮', z: '𝙯'
  },
  script: {
    A: '𝒜', B: 'ℬ', C: '𝒞', D: '𝒟', E: 'ℰ', F: 'ℱ', G: '𝒢', H: 'ℋ', I: 'ℐ', J: '𝒥', K: '𝒦', L: 'ℒ', M: 'ℳ', N: '𝒩', O: '𝒪', P: '𝒫', Q: '𝒬', R: 'ℛ', S: '𝒮', T: '𝒯', U: '𝒰', V: '𝒱', W: '𝒲', X: '𝒳', Y: '𝒴', Z: '𝒵',
    a: '𝒶', b: '𝒷', c: '𝒸', d: '𝒹', e: 'ℯ', f: '𝒻', g: 'ℊ', h: '𝒽', i: '𝒾', j: '𝒿', k: '𝓀', l: '𝓁', m: '𝓂', n: '𝓃', o: 'ℴ', p: '𝓅', q: '𝓆', r: '𝓇', s: '𝓈', t: '𝓉', u: '𝓊', v: '𝓋', w: '𝓌', x: '𝓍', y: '𝓎', z: '𝓏'
  },
  monospace: {
    A: '𝙰', B: '𝙱', C: '𝙲', D: '𝙳', E: '𝙴', F: '𝙵', G: '𝙶', H: '𝙷', I: '𝙸', J: '𝙹', K: '𝙺', L: '𝙻', M: '𝙼', N: '𝙽', O: '𝙾', P: '𝙿', Q: '𝚀', R: '𝚁', S: '𝚂', T: '𝚃', U: '𝚄', V: '𝚅', W: '𝚆', X: '𝚇', Y: '𝚈', Z: '𝚉',
    a: '𝚊', b: '𝚋', c: '𝚌', d: '𝚍', e: '𝚎', f: '𝓋', g: '𝚐', h: '𝚑', i: '𝚒', j: '𝙹', k: '𝚔', l: '𝚕', m: '𝚖', n: '𝚗', o: '𝚘', p: '𝚙', q: '𝚚', r: '𝚛', s: '𝚜', t: '𝚝', u: '𝚞', v: '𝚟', w: '𝚠', x: '𝚡', y: '𝚢', z: '𝚣',
    '0': '𝟶', '1': '𝟷', '2': '𝟸', '3': '𝟹', '4': '𝟺', '5': '𝟻', '6': '𝟼', '7': '𝟽', '8': '𝟾', '9': '𝟿'
  }
};

// --- Theme Profiles for LinkedIn Carousels ---
const LINKEDIN_THEMES = {
  classicBlue: {
    name: 'Classic Blue',
    bg: 'bg-gradient-to-br from-[#0c2445] to-[#0a66c2]',
    text: 'text-white',
    subtitle: 'text-blue-100',
    accent: 'text-amber-300',
    accentBg: 'bg-amber-400/20',
    accentColor: '#fcd34d',
    border: 'border-blue-400/30',
    codeBg: 'bg-slate-900/80',
    numberText: 'text-blue-200',
    tagColor: 'text-[#38bdf8]',
  },
  obsidianGold: {
    name: 'Obsidian Gold',
    bg: 'bg-gradient-to-br from-[#0f0f10] to-[#1e1b18]',
    text: 'text-stone-100',
    subtitle: 'text-stone-300',
    accent: 'text-amber-400',
    accentBg: 'bg-amber-400/15',
    accentColor: '#fbbf24',
    border: 'border-stone-700',
    codeBg: 'bg-[#18181b]',
    numberText: 'text-stone-400',
    tagColor: 'text-amber-400',
  },
  emeraldOasis: {
    name: 'Emerald Oasis',
    bg: 'bg-gradient-to-br from-[#064e3b] to-[#047857]',
    text: 'text-white',
    subtitle: 'text-emerald-100',
    accent: 'text-emerald-300',
    accentBg: 'bg-emerald-300/20',
    accentColor: '#6ee7b7',
    border: 'border-emerald-500/20',
    codeBg: 'bg-[#022c22]',
    numberText: 'text-emerald-200',
    tagColor: 'text-teal-200',
  },
  sunsetGlow: {
    name: 'Sunset Glow',
    bg: 'bg-gradient-to-br from-[#4c0519] to-[#be123c]',
    text: 'text-white',
    subtitle: 'text-rose-100',
    accent: 'text-yellow-300',
    accentBg: 'bg-yellow-300/20',
    accentColor: '#fde047',
    border: 'border-rose-500/20',
    codeBg: 'bg-rose-950/40',
    numberText: 'text-rose-200',
    tagColor: 'text-rose-300',
  },
  midnightPurple: {
    name: 'Midnight Purple',
    bg: 'bg-gradient-to-br from-[#1e1b4b] to-[#5b21b6]',
    text: 'text-slate-50',
    subtitle: 'text-purple-100',
    accent: 'text-fuchsia-300',
    accentBg: 'bg-fuchsia-500/20',
    accentColor: '#f5d0fe',
    border: 'border-purple-500/20',
    codeBg: 'bg-purple-950/40',
    numberText: 'text-purple-200',
    tagColor: 'text-violet-300',
  },
  minimalistWhite: {
    name: 'Minimalist White',
    bg: 'bg-white border border-slate-200',
    text: 'text-slate-900',
    subtitle: 'text-slate-600',
    accent: 'text-[#0a66c2]',
    accentBg: 'bg-[#0a66c2]/10',
    accentColor: '#0a66c2',
    border: 'border-slate-200',
    codeBg: 'bg-slate-50 border border-slate-200',
    numberText: 'text-slate-500',
    tagColor: 'text-[#0a66c2]',
  },
  cyberpunk: {
    name: 'Cyberpunk Neon',
    bg: 'bg-zinc-950 border-[3px] border-cyan-400',
    text: 'text-white',
    subtitle: 'text-zinc-400',
    accent: 'text-cyan-400',
    accentBg: 'bg-cyan-500/10',
    accentColor: '#22d3ee',
    border: 'border-cyan-400/40',
    codeBg: 'bg-black border border-cyan-400/30',
    numberText: 'text-cyan-400/70',
    tagColor: 'text-pink-400',
  },
  crimsonLuxury: {
    name: 'Crimson Luxury',
    bg: 'bg-gradient-to-br from-[#1A0A0A] to-[#2E0505]',
    text: 'text-rose-50',
    subtitle: 'text-rose-200',
    accent: 'text-rose-400',
    accentBg: 'bg-rose-500/10',
    accentColor: '#F43F5E',
    border: 'border-rose-900/30',
    codeBg: 'bg-rose-950/40',
    numberText: 'text-rose-300',
    tagColor: 'text-rose-400',
  },
  tokyoNight: {
    name: 'Tokyo Night',
    bg: 'bg-gradient-to-br from-[#0F141C] to-[#151D2A]',
    text: 'text-slate-100',
    subtitle: 'text-cyan-200',
    accent: 'text-[#bb9af3]',
    accentBg: 'bg-[#bb9af3]/10',
    accentColor: '#bb9af3',
    border: 'border-[#2A374A]/30',
    codeBg: 'bg-[#1A202C]/65',
    numberText: 'text-cyan-300',
    tagColor: 'text-[#7aa2f7]',
  },
  oceanDeep: {
    name: 'Ocean Deep',
    bg: 'bg-gradient-to-br from-[#041217] to-[#011B24]',
    text: 'text-cyan-50',
    subtitle: 'text-cyan-200',
    accent: 'text-[#14B8A6]',
    accentBg: 'bg-[#14B8A6]/10',
    accentColor: '#14B8A6',
    border: 'border-teal-900/30',
    codeBg: 'bg-[#08232D]/60',
    numberText: 'text-teal-350',
    tagColor: 'text-cyan-300',
  },
  terminalHack: {
    name: 'Terminal Hack',
    bg: 'bg-gradient-to-br from-[#030704] to-[#021307]',
    text: 'text-green-50',
    subtitle: 'text-green-200',
    accent: 'text-[#22C55E]',
    accentBg: 'bg-[#22C55E]/10',
    accentColor: '#22C55E',
    border: 'border-green-900/30',
    codeBg: 'bg-[#0A120B]/60',
    numberText: 'text-green-300',
    tagColor: 'text-emerald-300',
  },
  royalVelvet: {
    name: 'Royal Velvet',
    bg: 'bg-gradient-to-br from-[#0E0616] to-[#1F072E]',
    text: 'text-purple-50',
    subtitle: 'text-purple-200',
    accent: 'text-[#D946EF]',
    accentBg: 'bg-[#D946EF]/10',
    accentColor: '#D946EF',
    border: 'border-purple-900/30',
    codeBg: 'bg-[#1C0E2B]/60',
    numberText: 'text-purple-300',
    tagColor: 'text-fuchsia-300',
  }
};

// --- Font Families ---
const LINKEDIN_FONTS = {
  sans: 'font-family-inter',
  serif: 'font-family-playfair',
  display: 'font-family-grotesk',
  mono: 'font-family-mono'
};

const linkedinFontStyles = {
  'font-family-inter': { fontFamily: "'Inter', sans-serif" },
  'font-family-playfair': { fontFamily: "'Playfair Display', serif" },
  'font-family-grotesk': { fontFamily: "'Space Grotesk', sans-serif" },
  'font-family-mono': { fontFamily: "'JetBrains Mono', monospace" }
};

// --- Default Templates for LinkedIn Posts ---
const LINKEDIN_POST_TEMPLATES = [
  {
    name: 'The Story Hook (Highly Engaging)',
    text: `I used to think 𝗯𝘂𝘀𝘆𝗻𝗲𝘀𝘀 was a badge of honor.

Then, I burned out and lost a crucial client.

Here is what I learned about reclaiming my time:

1. 𝘛𝘩𝘦 𝘗𝘰𝘸𝘦𝘳 𝘰𝘧 '𝘕𝘰': Protecting your calendar is not selfish; it is survival.
2. 𝘚𝘺𝘴𝘵ε𝘮𝘴 > 𝘏𝘶𝘴𝘵𝘭ε: Automate what you can, delegate the rest.
3. 𝘙ε𝘴𝘵 𝘪𝘴 𝘗ε𝘳𝘧𝘰𝘳𝘮𝘢𝘯𝘤ε: Downtime is when your brain makes strategic connections.

Stop running in circles. Build systems, not exhaustion.

What is your #1 strategy for avoiding burnout? Let's discuss! 👇`
  },
  {
    name: 'The Contrarion Hot Take',
    text: `𝗨𝗻𝗽𝗼𝗽𝘂𝗹𝗮𝗿 𝗼𝗽𝗶𝗻𝗶𝗼𝗻:
Most technical documentation is useless.

Not because the writers aren't talented, but because they write for 𝘵𝘩ε𝘮𝘴ε𝘭𝘷ε𝘴, not the user.

A great guide should focus on:
• Why this configuration matters.
• Common pitfalls and how they manifest.
• Real-world context, not just API tables.

Stop writing documentation like a dictionary. Write it like a roadmap.

Agree or disagree? Share your worst doc stories below. 👇`
  },
  {
    name: 'The Step-by-Step Guide',
    text: `How to build a 𝗵𝗶𝗴𝗵-𝗽𝗲𝗿𝗳𝗼𝗿𝗺𝗶𝗻𝗴 codebase in 5 simple steps:

1. 𝗦𝗲𝘁 𝗦𝘁𝗿𝗶𝗰𝘁 𝗟𝗶𝗻𝘁𝗶𝗻𝗴: Avoid style arguments. Let automation decide.
2. 𝗪𝗿𝗶𝘁𝗲 𝗜𝗻𝘁𝗲𝗴𝗿𝗮𝘁𝗶𝗼𝗻 𝗧𝗲𝘀𝘁𝘀: Unit tests are good, but flows are what break.
3. 𝗖𝗼𝗻𝘁𝗶𝗻𝘂𝗼𝘂𝘀 𝗗𝗲𝗽𝗹𝗼𝘆𝗺𝗲𝗻𝘁: Ship small, ship often. Reduce release stress.
4. 𝗗𝗼𝗰𝘂𝗺𝗲𝗻𝘁 𝘁𝗵𝗲 '𝗪𝗵𝘆': Code tells you *how*, comments should tell you *why*.
5. 𝗣𝗲𝗲𝗿 𝗥𝗲𝘃𝗶𝗲𝘄𝘀: Treat reviews as knowledge sharing, not gatekeeping.

Which step does your current team struggle with the most?

Repost 🔁 if you found this valuable!`
  }
];


// ==========================================
// --- CONSTANTS: INFOGRAPHIC FEATURE STUDIO ---
// ==========================================

const INFOGRAPHIC_THEMES = [
  {
    id: 'obsidian',
    name: 'Obsidian Night',
    bg: 'bg-[#0B0F19]',
    cardBg: 'bg-[#161D30]/90 border-[#263554]',
    textColor: 'text-slate-100',
    subtitleColor: 'text-slate-400',
    accent: '#38BDF8', // Sky Blue
    accentClass: 'text-[#38BDF8] border-[#38BDF8]',
    accentBg: 'bg-[#38BDF8]/10',
    gradient: 'from-[#0F172A] via-[#0B0F19] to-[#020617]',
    badgeBg: 'bg-sky-500/15 text-sky-400 border-sky-500/30'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Neon',
    bg: 'bg-[#03000A]',
    cardBg: 'bg-[#0D001A]/95 border-[#FF007F]/40',
    textColor: 'text-[#F1F1F1]',
    subtitleColor: 'text-purple-300/70',
    accent: '#FF007F', // Hot Pink
    accentClass: 'text-[#FF007F] border-[#FF007F]',
    accentBg: 'bg-[#FF007F]/10',
    gradient: 'from-[#050010] via-[#0A001F] to-[#12002E]',
    badgeBg: 'bg-[#FF007F]/15 text-[#FF007F] border-[#FF007F]/30'
  },
  {
    id: 'emerald',
    name: 'Forest Emerald',
    bg: 'bg-[#051614]',
    cardBg: 'bg-[#0D2421]/95 border-[#155E54]',
    textColor: 'text-emerald-50',
    subtitleColor: 'text-emerald-300/60',
    accent: '#10B981', // Mint Emerald
    accentClass: 'text-[#10B981] border-[#10B981]',
    accentBg: 'bg-[#10B981]/10',
    gradient: 'from-[#020E0D] via-[#051614] to-[#010706]',
    badgeBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
  },
  {
    id: 'sunset',
    name: 'Golden Amber',
    bg: 'bg-[#120D08]',
    cardBg: 'bg-[#211810]/95 border-[#78350F]/70',
    textColor: 'text-amber-50',
    subtitleColor: 'text-amber-200/60',
    accent: '#F59E0B', // Amber
    accentClass: 'text-[#F59E0B] border-[#F59E0B]',
    accentBg: 'bg-[#F59E0B]/10',
    gradient: 'from-[#0A0704] via-[#120D08] to-[#1A120B]',
    badgeBg: 'bg-amber-500/15 text-amber-400 border-amber-500/30'
  },
  {
    id: 'nord',
    name: 'Nordic Frost',
    bg: 'bg-[#2E3440]',
    cardBg: 'bg-[#3B4252]/95 border-[#4C566A]',
    textColor: 'text-[#ECEFF4]',
    subtitleColor: 'text-[#D8DEE9]/70',
    accent: '#88C0D0', // Frost Teal
    accentClass: 'text-[#88C0D0] border-[#88C0D0]',
    accentBg: 'bg-[#88C0D0]/10',
    gradient: 'from-[#242933] via-[#2E3440] to-[#3B4252]',
    badgeBg: 'bg-[#88C0D0]/15 text-[#8FBCBB] border-[#88C0D0]/30'
  },
  {
    id: 'crimson',
    name: 'Crimson Luxury',
    bg: 'bg-[#1A0A0A]',
    cardBg: 'bg-[#2A1010]/95 border-[#5C1E1E]',
    textColor: 'text-rose-50',
    subtitleColor: 'text-rose-300/60',
    accent: '#F43F5E', // Rose Red
    accentClass: 'text-[#F43F5E] border-[#F43F5E]',
    accentBg: 'bg-[#F43F5E]/10',
    gradient: 'from-[#120505] via-[#1A0A0A] to-[#2E0505]',
    badgeBg: 'bg-rose-500/15 text-rose-400 border-rose-500/30'
  },
  {
    id: 'tokyo',
    name: 'Tokyo Night',
    bg: 'bg-[#0F141C]',
    cardBg: 'bg-[#1A202C]/95 border-[#2A374A]',
    textColor: 'text-slate-100',
    subtitleColor: 'text-cyan-300/60',
    accent: '#bb9af3', // Lilac
    accentClass: 'text-[#bb9af3] border-[#bb9af3]',
    accentBg: 'bg-[#bb9af3]/10',
    gradient: 'from-[#0A0D14] via-[#0F141C] to-[#151D2A]',
    badgeBg: 'bg-[#bb9af3]/15 text-[#bb9af3] border-[#bb9af3]/30'
  },
  {
    id: 'ocean',
    name: 'Ocean Deep',
    bg: 'bg-[#041217]',
    cardBg: 'bg-[#08232D]/95 border-[#0E3E4F]',
    textColor: 'text-cyan-50',
    subtitleColor: 'text-cyan-300/60',
    accent: '#14B8A6', // Teal
    accentClass: 'text-[#14B8A6] border-[#14B8A6]',
    accentBg: 'bg-[#14B8A6]/10',
    gradient: 'from-[#01080B] via-[#041217] to-[#011B24]',
    badgeBg: 'bg-teal-500/15 text-teal-400 border-teal-500/30'
  },
  {
    id: 'terminal',
    name: 'Terminal Hack',
    bg: 'bg-[#030704]',
    cardBg: 'bg-[#0A120B]/95 border-[#1A381F]',
    textColor: 'text-green-50',
    subtitleColor: 'text-green-400/60',
    accent: '#22C55E', // Lime Green
    accentClass: 'text-[#22C55E] border-[#22C55E]',
    accentBg: 'bg-[#22C55E]/10',
    gradient: 'from-[#010301] via-[#030704] to-[#021307]',
    badgeBg: 'bg-green-500/15 text-green-400 border-green-500/30'
  },
  {
    id: 'velvet',
    name: 'Royal Velvet',
    bg: 'bg-[#0E0616]',
    cardBg: 'bg-[#1C0E2B]/95 border-[#3E1A5E]',
    textColor: 'text-purple-50',
    subtitleColor: 'text-purple-300/60',
    accent: '#D946EF', // Fuchsia
    accentClass: 'text-[#D946EF] border-[#D946EF]',
    accentBg: 'bg-[#D946EF]/10',
    gradient: 'from-[#06020A] via-[#0E0616] to-[#1F072E]',
    badgeBg: 'bg-fuchsia-500/15 text-fuchsia-400 border-fuchsia-500/30'
  }
];

const INFOGRAPHIC_FONTS = [
  { id: 'sans', name: 'Segoe UI / Inter', class: 'font-sans' },
  { id: 'mono', name: 'JetBrains Mono', class: 'font-mono' },
  { id: 'serif', name: 'Georgia Serif', class: 'font-serif' }
];

// --- Configurable Infographic Cheat Sheet Presets ---
const INFOGRAPHIC_TEMPLATES = {
  java17: {
    name: 'Java 17 LTS Features',
    title: 'JAVA 17: MASTERING KEY FEATURES',
    subtitle: 'BOOSTING CODE PRODUCTIVITY & SECURING RUNTIME ARCHITECTURE',
    category: 'Standard LTS Architecture Guide',
    footerBrand: 'Java Engineering Network',
    themeId: 'obsidian',
    features: [
      {
        id: 'sealed',
        num: 1,
        title: 'Sealed Classes',
        subtitle: 'CONTROL INHERITANCE HIERARCHIES',
        code: `// Restrict inheritance to specific types
public sealed class Shape permits Circle, Square {
    // Core shared shape properties
}

public final class Circle extends Shape {}
public final class Square extends Shape {}`,
        scenarios: [
          'Model exact business domain hierarchies securely',
          'Prevent third-party extension of libraries',
          'Enable exhaustive compiler pattern checking'
        ]
      },
      {
        id: 'records',
        num: 2,
        title: 'Records (Data Carriers)',
        subtitle: 'ELIMINATE BOILERPLATE DATA CLASSES',
        code: `// Constructor, getters, equals, hashcode, toString in ONE line!
public record User(String name, int age) {
    // Compact constructor validator
    public User {
        if (age < 0) throw new IllegalArgumentException();
    }
}`,
        scenarios: [
          'Immutable Data Transfer Objects (DTOs)',
          'Map raw database query outputs directly',
          'Cleaner key containers for HashMaps'
        ]
      },
      {
        id: 'switch',
        num: 3,
        title: 'Pattern Matching for switch',
        subtitle: 'REDUCE TYPE-CASTING VERBOSITY',
        code: `// Cleaner type queries and nested object resolution
static String formatValue(Object obj) {
    return switch (obj) {
        case Integer i -> String.format("Integer value: %d", i);
        case String s  -> String.format("String value of len: %d", s.length());
        case null      -> "Value is null!";
        default        -> obj.toString();
    };
}`,
        scenarios: [
          'Replace complex and repetitive nested if-else structures',
          'Elegant, safe null handling at the pattern matching layer',
          'High-level event/state processing architectures'
        ]
      },
      {
        id: 'textblocks',
        num: 4,
        title: 'Text Blocks',
        subtitle: 'BEAUTIFUL MULTI-LINE STRINGS',
        code: `// No more backslashes or clumsy concatenation arrays
String jsonPayload = """
    {
        "status": "success",
        "data": {
            "version": "17.0.2",
            "environment": "Production"
        }
    }
    """;`,
        scenarios: [
          'Clean embedded database strings (JSON, XML, HTML, SQL)',
          'Highly readable mock payloads for integration tests',
          'Templates without bulky configuration dependencies'
        ]
      },
      {
        id: 'prngs',
        num: 5,
        title: 'Enhanced PRNGs',
        subtitle: 'MODERN PSEUDO-RANDOM GENERATION',
        code: `// Switch and configure random generators easily
RandomGenerator generator = RandomGeneratorFactory
    .of("L128X256MixRandom")
    .create();

double sampleValue = generator.nextDouble();`,
        scenarios: [
          'High-performance statistical modeling simulations',
          'Thread-safe random pipelines across stream elements',
          'Interchangeable random algorithms without changing clients'
        ]
      }
    ]
  },
  react19: {
    name: 'React 19 & Frontend',
    title: 'REACT 19: MODERN FRONTLINE PATTERNS',
    subtitle: 'ASYNC MUTATIONS, ACTIONS API, AND RENDER OPTIMIZATIONS',
    category: 'Frontend Engineering Cheat Sheet',
    footerBrand: 'React Dev Community',
    themeId: 'nord',
    features: [
      {
        id: 'use',
        num: 1,
        title: 'The "use" Hook API',
        subtitle: 'UNIFIED ASYNC RESOURCE ACCESS',
        code: `// Fetch promise results directly in render lifecycle
const data = use(fetchDataPromise);

// Conditional context consumption
if (isLoggedIn) {
  const profile = use(ProfileContext);
}`,
        scenarios: [
          'Eliminate redundant useEffect declarations for fetch operations',
          'Access React Context inside loops or conditional blocks',
          'Clean suspense integrations for fallback load states'
        ]
      },
      {
        id: 'actions',
        num: 2,
        title: 'React Actions & Forms',
        subtitle: 'NATIVE FORM ASYNC HANDLING',
        code: `// Automatic pending state and submission tracking
<form action={async (formData) => {
  const response = await signupUser(formData);
  if (response.error) {
    showErrorNotification(response.error);
  }
}}>
  <input name="username" type="text" />
</form>`,
        scenarios: [
          'Manage pending indicator state automatically via useTransition',
          'Eliminate manual event.preventDefault() Form handles',
          'Natively bound reset hooks for inputs on success'
        ]
      },
      {
        id: 'compiler',
        num: 3,
        title: 'React Compiler Engine',
        subtitle: 'ELIMINATE MANUAL MEMOIZATION',
        code: `// React Compiler automatically memoizes components!
// You no longer need to write:
// - useMemo(() => computeValue(a), [a])
// - useCallback(() => handleAction(), [])
const SortedList = ({ items }) => {
  return items.map(item => <Row item={item} />);
};`,
        scenarios: [
          'Optimize render cycles automatically across subtrees',
          'Clean component definitions without dependency arrays',
          'Avoid bugs caused by missing dependency references'
        ]
      }
    ]
  },
  docker: {
    name: 'Docker & DevOps Commands',
    title: 'DOCKER SYSTEM: CONTAINER ENGINE',
    subtitle: 'ESSENTIAL DESKTOP & DAEMON CLIENT OPERATIONS REFERENCE',
    category: 'DevOps & Infrastructure Cheat Sheet',
    footerBrand: 'DevOps OpsHub',
    themeId: 'cyberpunk',
    features: [
      {
        id: 'build-run',
        num: 1,
        title: 'Build & Instantiate',
        subtitle: 'IMAGE COMPILATION & PORT ROUTING',
        code: `# Build local directory Dockerfile with version tag
docker build -t microservice:v1.0 .

# Spin up daemon container with mapped hosts ports
docker run -d -p 8080:80 --name backend microservice:v1.0`,
        scenarios: [
          'Package applications in standard portable image schemas',
          'Expose isolated container servers to host host interfaces',
          'Run containers in background detached daemon modes'
        ]
      },
      {
        id: 'compose',
        num: 2,
        title: 'Docker Compose Stacks',
        subtitle: 'MULTI-CONTAINER ORCHESTRATION',
        code: `# Start multi-container stack from YAML file
docker-compose up -d --build

# Stop the stack and prune network interfaces
docker-compose down -v`,
        scenarios: [
          'Spin up full local env stacks (web, database, cache) together',
          'Declare dependency ordering and environment configurations',
          'Clean environment tear-downs including persistent volumes'
        ]
      },
      {
        id: 'cleanup',
        num: 3,
        title: 'Pruning & Space Cleanup',
        subtitle: 'PURGE DEFUNCT ASSETS & STORAGE',
        code: `# Clear all stopped containers, caches, and unused volumes
docker system prune -a --volumes

# Clear dangling volumes only
docker volume prune`,
        scenarios: [
          'Free workstation storage disk spaces instantly',
          'Clean broken image builds and routing states',
          'Reset environment parameters to zero state'
        ]
      }
    ]
  },
  git: {
    name: 'Git Workflows & Tips',
    title: 'GIT WORKFLOWS: MASTERING SOURCE CONTROL',
    subtitle: 'ADVANCED BRANCHING, CHERRY-PICKS, AND CONFLICT RESOLUTIONS',
    category: 'Source Control & Collaboration Guide',
    footerBrand: 'Git Dev Ops',
    themeId: 'nord',
    features: [
      {
        id: 'branching',
        num: 1,
        title: 'Feature Branching Workflow',
        subtitle: 'ISOLATE DEVELOPMENT FROM MAINLINE',
        code: `# Create and switch to new branch
git checkout -b feature/user-auth

# Push feature branch to remote origin and track it
git push -u origin feature/user-auth`,
        scenarios: [
          'Develop application features in complete isolation',
          'Avoid breaking the stable main production branch',
          'Enable peer code reviews via Pull Requests'
        ]
      },
      {
        id: 'cherrypick',
        num: 2,
        title: 'Cherry-picking Commits',
        subtitle: 'APPLY SPECIFIC COMMITS ACROSS BRANCHES',
        code: `# Apply commit hash onto your current branch
git cherry-pick 7a8f9c2

# Abort cherry-pick if conflicts occur and you want to rollback
git cherry-pick --abort`,
        scenarios: [
          'Port critical hotfixes from dev back to production branch',
          'Retrieve specific code changes without full merge operations',
          'Keep release branches clean of unnecessary commit noise'
        ]
      },
      {
        id: 'conflicts',
        num: 3,
        title: 'Merge Conflict Resolution',
        subtitle: 'RESOLVE CODE INTEGRATION DISCREPANCIES',
        code: `# Pull remote updates and automatically rebase local work
git pull --rebase origin main

# Once conflicts are manually fixed, continue the rebase
git add .
git rebase --continue`,
        scenarios: [
          'Sync local branch commits cleanly with upstream codebases',
          'Keep a flat, readable, linear commit history tree',
          'Safely handle overlapping team edits'
        ]
      }
    ]
  }
};

const getAspectRatioSuggestion = (aspect) => {
  switch (aspect) {
    case 'square':
      return {
        title: "Square Format (1:1)",
        performance: "High Performance",
        rating: "★★★★★",
        description: "Perfect for carousel slides on LinkedIn. Displays cleanly on both mobile and desktop feeds without any side cropping. Great for code snippets and checklist summaries.",
        tips: "Ideal for swipeable multi-slide carousel documents."
      };
    case 'portrait':
      return {
        title: "Portrait Format (4:5)",
        performance: "Maximum Mobile Coverage",
        rating: "★★★★★",
        description: "Recommended for single-image posts. It occupies the maximum vertical height on mobile screens (the prime real estate of LinkedIn feeds), leading to 15-20% higher engagement rates.",
        tips: "Best format for vertical readability on mobile phones."
      };
    case 'landscape':
      return {
        title: "Landscape Format (16:9)",
        performance: "Standard Desktop View",
        rating: "★★★☆☆",
        description: "Best for desktop-centric slides or full-screen presentation decks. On mobile devices, it displays with black sidebars or appears smaller, which might reduce mobile engagement.",
        tips: "Great for technical slides intended to be viewed on desktop laptops."
      };
    case 'tall':
    default:
      return {
        title: "Continuous Poster (Tall)",
        performance: "High Detail Cheatsheets",
        rating: "★★★★☆",
        description: "Excellent for reference sheets, cheat sheets, and architecture workflows. LinkedIn feeds will show a preview and collapse it under a 'See more' button. Users like expanding these to zoom in.",
        tips: "Great for single-image developer cheat sheets containing high detail."
      };
  }
};

const getSlideLayoutStyles = (aspect) => {
  if (aspect === 'landscape') {
    return {
      padding: 'py-4 px-6',
      title: 'text-base font-extrabold',
      subtitle: 'text-[8px] tracking-[0.15em] uppercase',
      slideNumber: 'text-lg font-black',
      bodySpace: 'space-y-2 pt-1',
      codeContainer: 'p-2 my-1',
      codeText: 'text-[9.5px] leading-normal',
      scenarioSpace: 'space-y-1 pt-0.5',
      scenarioText: 'text-[9.5px]',
      footerSpace: 'pt-2 mt-1 border-t border-slate-900/60',
      coverTitle: 'text-xl font-extrabold',
      coverSubtitle: 'text-[10px] leading-relaxed'
    };
  } else if (aspect === 'square') {
    return {
      padding: 'py-6 px-6',
      title: 'text-lg font-extrabold',
      subtitle: 'text-[9px] tracking-[0.18em] uppercase',
      slideNumber: 'text-xl font-black',
      bodySpace: 'space-y-3 pt-2',
      codeContainer: 'p-2.5 my-1.5',
      codeText: 'text-[10.5px] leading-relaxed',
      scenarioSpace: 'space-y-1.5 pt-0.5',
      scenarioText: 'text-[10.5px]',
      footerSpace: 'pt-3 mt-1.5 border-t border-slate-900/80',
      coverTitle: 'text-2xl font-extrabold',
      coverSubtitle: 'text-xs leading-relaxed'
    };
  } else { // portrait
    return {
      padding: 'py-10 px-8',
      title: 'text-xl font-extrabold',
      subtitle: 'text-[9px] tracking-[0.2em] uppercase',
      slideNumber: 'text-2xl font-black',
      bodySpace: 'space-y-4 pt-3',
      codeContainer: 'p-3.5 my-2',
      codeText: 'text-xs leading-relaxed',
      scenarioSpace: 'space-y-2 pt-1',
      scenarioText: 'text-xs',
      footerSpace: 'pt-4 mt-2 border-t border-slate-900',
      coverTitle: 'text-3xl font-extrabold',
      coverSubtitle: 'text-xs leading-relaxed'
    };
  }
};


export default function App() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('hub_activeTab') || 'carousel';
  });

  // --- Unified Toast System State ---
  const [toast, setToast] = useState({ show: false, message: '' });
  const triggerToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  // ==========================================
  // --- STATE: LINKEDIN CAROUSEL & POST ---
  // ==========================================
  const [postText, setPostText] = useState(() => {
    return localStorage.getItem('hub_postText') || LINKEDIN_POST_TEMPLATES[0].text;
  });
  const [previewDevice, setPreviewDevice] = useState(() => {
    return localStorage.getItem('hub_previewDevice') || 'desktop';
  });
  const textareaRef = useRef(null);

  const [linkedinSlides, setLinkedinSlides] = useState(() => {
    const saved = localStorage.getItem('hub_linkedinSlides');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        layout: 'title',
        title: 'How to Build a [h]Premium[/h]\nLinkedIn Presence',
        subtitle: '5 actionable steps to stand out in the feed',
        body: '',
        code: '',
        quoteAuthor: '',
        bgOverride: '',
      },
      {
        layout: 'content',
        title: '1. Optimize Your Profile',
        subtitle: '',
        body: 'Your profile is your digital storefront. Make it work for you:\n\n• Use a [h]professional portrait[/h] with clean lighting.\n• Write a headline focused on [h]results[/h], not just job titles.\n• Add links to your [h]featured section[/h] representing your best work.',
        code: '',
        quoteAuthor: '',
        bgOverride: '',
      },
      {
        layout: 'code',
        title: '2. Automate Workflows',
        subtitle: '',
        body: 'Write clean script models to bypass repetitive work.',
        code: `// Express server for asset generation\nimport { Generator } from 'studio-api';\n\nconst studio = new Generator({\n  theme: "obsidianGold",\n  aspect: "square"\n});\n\nawait studio.renderCarousel();`,
        quoteAuthor: '',
        bgOverride: '',
      },
      {
        layout: 'quote',
        title: '',
        subtitle: '',
        body: 'Consistency beats talent every single day. The easiest way to succeed is to simply remain in the game longer than anyone else.',
        code: '',
        quoteAuthor: 'James Clear (Atomic Habits)',
        bgOverride: '',
      },
      {
        layout: 'cta',
        title: 'Thanks For Reading!',
        subtitle: 'Was this guide helpful?',
        body: 'Follow my profile for daily tutorials on web engineering, rich design systems, and startup growth hacks.',
        code: '',
        quoteAuthor: '',
        bgOverride: '',
      }
    ];
  });

  const [linkedinActiveIndex, setLinkedinActiveIndex] = useState(() => {
    const saved = localStorage.getItem('hub_linkedinActiveIndex');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [linkedinTheme, setLinkedinTheme] = useState(() => {
    return localStorage.getItem('hub_linkedinTheme') || 'classicBlue';
  });
  const [linkedinFont, setLinkedinFont] = useState(() => {
    return localStorage.getItem('hub_linkedinFont') || 'sans';
  });
  const [linkedinAspect, setLinkedinAspect] = useState(() => {
    return localStorage.getItem('hub_linkedinAspect') || 'square';
  });
  const [linkedinShowNumbers, setLinkedinShowNumbers] = useState(() => {
    const saved = localStorage.getItem('hub_linkedinShowNumbers');
    return saved !== null ? saved === 'true' : true;
  });
  const [linkedinShowSwipe, setLinkedinShowSwipe] = useState(() => {
    const saved = localStorage.getItem('hub_linkedinShowSwipe');
    return saved !== null ? saved === 'true' : true;
  });
  const [linkedinSwipeText, setLinkedinSwipeText] = useState(() => {
    return localStorage.getItem('hub_linkedinSwipeText') || 'Swipe Next';
  });

  // Branding details
  const [profileName, setProfileName] = useState(() => {
    return localStorage.getItem('hub_profileName') || 'Abhijeet';
  });
  const [profileHeadline, setProfileHeadline] = useState(() => {
    return localStorage.getItem('hub_profileHeadline') || 'Full Stack Engineer & Tech Writer';
  });
  const [profilePic, setProfilePic] = useState(() => {
    return localStorage.getItem('hub_profilePic') || null;
  });
  const [brandLogo, setBrandLogo] = useState(() => {
    return localStorage.getItem('hub_brandLogo') || null;
  });
  const [companyName, setCompanyName] = useState(() => {
    return localStorage.getItem('hub_companyName') || 'DevStudio';
  });

  // Zoom / Scale State
  const [linkedinScale, setLinkedinScale] = useState(0.4);
  const [linkedinExporting, setLinkedinExporting] = useState(null);


  // ==========================================
  // --- STATE: INFOGRAPHIC FEATURE STUDIO ---
  // ==========================================
  const [selectedTemplateId, setSelectedTemplateId] = useState(() => {
    return localStorage.getItem('hub_selectedTemplateId') || 'java17';
  });
  const [infographicFeatures, setInfographicFeatures] = useState(() => {
    const saved = localStorage.getItem('hub_infographicFeatures');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INFOGRAPHIC_TEMPLATES.java17.features;
  });
  const [infographicTheme, setInfographicTheme] = useState(() => {
    const saved = localStorage.getItem('hub_infographicTheme');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INFOGRAPHIC_THEMES[0];
  });
  const [infographicFont, setInfographicFont] = useState(() => {
    const saved = localStorage.getItem('hub_infographicFont');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INFOGRAPHIC_FONTS[0];
  });
  const [infographicLayout, setInfographicLayout] = useState(() => {
    return 'infographic';
  });
  const [infographicAspect, setInfographicAspect] = useState(() => {
    return localStorage.getItem('hub_infographicAspect') || 'portrait';
  });
  const [infographicActiveSlide, setInfographicActiveSlide] = useState(() => {
    const saved = localStorage.getItem('hub_infographicActiveSlide');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [infographicZoom, setInfographicZoom] = useState(() => {
    const saved = localStorage.getItem('hub_infographicZoom');
    return saved ? parseInt(saved, 10) : 85;
  });
  const [infographicCustomAccent, setInfographicCustomAccent] = useState(() => {
    return localStorage.getItem('hub_infographicCustomAccent') || INFOGRAPHIC_THEMES[0].accent;
  });
  
  // Custom Configurable Header/Footer states
  const [infographicTitle, setInfographicTitle] = useState(() => {
    return localStorage.getItem('hub_infographicTitle') || INFOGRAPHIC_TEMPLATES.java17.title;
  });
  const [infographicSubtitle, setInfographicSubtitle] = useState(() => {
    return localStorage.getItem('hub_infographicSubtitle') || INFOGRAPHIC_TEMPLATES.java17.subtitle;
  });
  const [infographicCategory, setInfographicCategory] = useState(() => {
    return localStorage.getItem('hub_infographicCategory') || INFOGRAPHIC_TEMPLATES.java17.category;
  });
  const [infographicFooterBrand, setInfographicFooterBrand] = useState(() => {
    return localStorage.getItem('hub_infographicFooterBrand') || INFOGRAPHIC_TEMPLATES.java17.footerBrand;
  });

  // Custom editing states
  const [infographicEditingIndex, setInfographicEditingIndex] = useState(null);
  const [infographicEditBuffer, setInfographicEditBuffer] = useState(null);
  const [infographicShowResetModal, setInfographicShowResetModal] = useState(false);
  const [infographicExporting, setInfographicExporting] = useState(null);

  const activeInfographicFeatures = infographicFeatures.filter(f => f.selected !== false);

  useEffect(() => {
    if (infographicActiveSlide > activeInfographicFeatures.length) {
      setInfographicActiveSlide(Math.max(0, activeInfographicFeatures.length));
    }
  }, [activeInfographicFeatures.length, infographicActiveSlide]);

  // --- LOCAL STORAGE EFFECTS ---
  useEffect(() => {
    localStorage.setItem('hub_activeTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('hub_postText', postText);
  }, [postText]);

  useEffect(() => {
    localStorage.setItem('hub_previewDevice', previewDevice);
  }, [previewDevice]);

  useEffect(() => {
    localStorage.setItem('hub_linkedinSlides', JSON.stringify(linkedinSlides));
  }, [linkedinSlides]);

  useEffect(() => {
    localStorage.setItem('hub_linkedinActiveIndex', linkedinActiveIndex.toString());
  }, [linkedinActiveIndex]);

  useEffect(() => {
    localStorage.setItem('hub_linkedinTheme', linkedinTheme);
  }, [linkedinTheme]);

  useEffect(() => {
    localStorage.setItem('hub_linkedinFont', linkedinFont);
  }, [linkedinFont]);

  useEffect(() => {
    localStorage.setItem('hub_linkedinAspect', linkedinAspect);
  }, [linkedinAspect]);

  useEffect(() => {
    localStorage.setItem('hub_linkedinShowNumbers', linkedinShowNumbers.toString());
  }, [linkedinShowNumbers]);

  useEffect(() => {
    localStorage.setItem('hub_linkedinShowSwipe', linkedinShowSwipe.toString());
  }, [linkedinShowSwipe]);

  useEffect(() => {
    localStorage.setItem('hub_linkedinSwipeText', linkedinSwipeText);
  }, [linkedinSwipeText]);

  useEffect(() => {
    localStorage.setItem('hub_profileName', profileName);
  }, [profileName]);

  useEffect(() => {
    localStorage.setItem('hub_profileHeadline', profileHeadline);
  }, [profileHeadline]);

  useEffect(() => {
    if (profilePic) localStorage.setItem('hub_profilePic', profilePic);
    else localStorage.removeItem('hub_profilePic');
  }, [profilePic]);

  useEffect(() => {
    if (brandLogo) localStorage.setItem('hub_brandLogo', brandLogo);
    else localStorage.removeItem('hub_brandLogo');
  }, [brandLogo]);

  useEffect(() => {
    localStorage.setItem('hub_companyName', companyName);
  }, [companyName]);

  useEffect(() => {
    localStorage.setItem('hub_selectedTemplateId', selectedTemplateId);
  }, [selectedTemplateId]);

  useEffect(() => {
    localStorage.setItem('hub_infographicFeatures', JSON.stringify(infographicFeatures));
  }, [infographicFeatures]);

  useEffect(() => {
    localStorage.setItem('hub_infographicTheme', JSON.stringify(infographicTheme));
  }, [infographicTheme]);

  useEffect(() => {
    localStorage.setItem('hub_infographicFont', JSON.stringify(infographicFont));
  }, [infographicFont]);

  useEffect(() => {
    localStorage.setItem('hub_infographicLayout', infographicLayout);
  }, [infographicLayout]);

  useEffect(() => {
    localStorage.setItem('hub_infographicAspect', infographicAspect);
  }, [infographicAspect]);

  useEffect(() => {
    localStorage.setItem('hub_infographicActiveSlide', infographicActiveSlide.toString());
  }, [infographicActiveSlide]);

  useEffect(() => {
    localStorage.setItem('hub_infographicZoom', infographicZoom.toString());
  }, [infographicZoom]);

  useEffect(() => {
    localStorage.setItem('hub_infographicCustomAccent', infographicCustomAccent);
  }, [infographicCustomAccent]);

  useEffect(() => {
    localStorage.setItem('hub_infographicTitle', infographicTitle);
  }, [infographicTitle]);

  useEffect(() => {
    localStorage.setItem('hub_infographicSubtitle', infographicSubtitle);
  }, [infographicSubtitle]);

  useEffect(() => {
    localStorage.setItem('hub_infographicCategory', infographicCategory);
  }, [infographicCategory]);

  useEffect(() => {
    localStorage.setItem('hub_infographicFooterBrand', infographicFooterBrand);
  }, [infographicFooterBrand]);

  // --- Style Randomizer Helpers ---
  const handleRandomizeInfographicStyle = () => {
    // 1. Pick a random font
    const randomFont = INFOGRAPHIC_FONTS[Math.floor(Math.random() * INFOGRAPHIC_FONTS.length)];
    setInfographicFont(randomFont);

    // 2. Pick a random base theme
    const randomTheme = INFOGRAPHIC_THEMES[Math.floor(Math.random() * INFOGRAPHIC_THEMES.length)];
    setInfographicTheme(randomTheme);

    // 3. Generate a random vibrant accent color
    const hue = Math.floor(Math.random() * 360);
    const saturation = 85 + Math.floor(Math.random() * 15); // 85% - 100%
    const lightness = 50 + Math.floor(Math.random() * 15); // 50% - 65%
    
    const hslToHex = (h, s, l) => {
      l /= 100;
      const a = s * Math.min(l, 1 - l) / 100;
      const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    };

    const randomAccentHex = hslToHex(hue, saturation, lightness);
    setInfographicCustomAccent(randomAccentHex);

    triggerToast("Generated a random infographic style! 🎨🎲");
  };

  const handleRandomizeLinkedinStyle = () => {
    // 1. Pick a random font
    const fonts = Object.keys(LINKEDIN_FONTS);
    const randomFont = fonts[Math.floor(Math.random() * fonts.length)];
    setLinkedinFont(randomFont);

    // 2. Pick a random theme
    const themes = Object.keys(LINKEDIN_THEMES);
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setLinkedinTheme(randomTheme);

    triggerToast("Generated a random LinkedIn Slides style! 🎨🎲");
  };


  // ==========================================
  // --- HANDLERS: LINKEDIN CAROUSEL & POST ---
  // ==========================================

  const handlePostCopy = () => {
    navigator.clipboard.writeText(postText);
    triggerToast("Post copied to clipboard successfully!");
  };

  const handleUnicodeFormat = (style) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;

    if (start === end) {
      const formatted = text.split('').map(char => unicodeMap[style]?.[char] || char).join('');
      setPostText(formatted);
    } else {
      const selected = text.slice(start, end);
      const formatted = selected.split('').map(char => unicodeMap[style]?.[char] || char).join('');
      const newText = text.slice(0, start) + formatted + text.slice(end);
      setPostText(newText);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start, start + formatted.length);
      }, 0);
    }
  };

  // Image Upload helper
  const handleImageFile = (e, setImgState) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgState(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Parsing [h]highlight text[/h]
  const renderHighlightedText = (text, accentColorClass) => {
    if (!text) return '';
    const parts = text.split(/(\[h\].*?\[\/h\])/g);
    return parts.map((part, index) => {
      if (part.startsWith('[h]') && part.endsWith('[/h]')) {
        const cleanPart = part.slice(3, -4);
        return (
          <span key={index} className={`${accentColorClass} font-extrabold relative inline-block`}>
            {cleanPart}
          </span>
        );
      }
      return part;
    });
  };

  const linkedinAddSlide = () => {
    const newSlide = {
      layout: 'content',
      title: 'New Slide Title',
      subtitle: '',
      body: 'Enter your slide bullet points here.\n\n• Add key [h]takeaways[/h] here.\n• Highlight text using [h]brackets[/h].',
      code: '',
      quoteAuthor: '',
      bgOverride: '',
    };
    const updated = [...linkedinSlides];
    updated.splice(linkedinActiveIndex + 1, 0, newSlide);
    setLinkedinSlides(updated);
    setLinkedinActiveIndex(linkedinActiveIndex + 1);
  };

  const linkedinRemoveSlide = (idx) => {
    if (linkedinSlides.length <= 1) return;
    const updated = linkedinSlides.filter((_, i) => i !== idx);
    setLinkedinSlides(updated);
    setLinkedinActiveIndex(Math.max(0, linkedinActiveIndex - 1));
  };

  const linkedinUpdateSlide = (fields) => {
    const updated = [...linkedinSlides];
    updated[linkedinActiveIndex] = { ...updated[linkedinActiveIndex], ...fields };
    setLinkedinSlides(updated);
  };

  const linkedinMoveSlide = (direction) => {
    if (direction === 'up' && linkedinActiveIndex > 0) {
      const updated = [...linkedinSlides];
      const temp = updated[linkedinActiveIndex];
      updated[linkedinActiveIndex] = updated[linkedinActiveIndex - 1];
      updated[linkedinActiveIndex - 1] = temp;
      setLinkedinSlides(updated);
      setLinkedinActiveIndex(linkedinActiveIndex - 1);
    } else if (direction === 'down' && linkedinActiveIndex < linkedinSlides.length - 1) {
      const updated = [...linkedinSlides];
      const temp = updated[linkedinActiveIndex];
      updated[linkedinActiveIndex] = updated[linkedinActiveIndex + 1];
      updated[linkedinActiveIndex + 1] = temp;
      setLinkedinSlides(updated);
      setLinkedinActiveIndex(linkedinActiveIndex + 1);
    }
  };

  const handleImportTemplateToSlides = (templateId) => {
    const template = INFOGRAPHIC_TEMPLATES[templateId];
    if (!template) return;

    // 1. Create cover slide (Title layout)
    const coverSlide = {
      id: `imported-cover-${Date.now()}`,
      layout: 'title',
      title: template.title,
      subtitle: template.subtitle,
      body: '',
      code: '',
      quoteAuthor: '',
      bgOverride: '',
    };

    // 2. Create feature slides (Code layout)
    const featureSlides = template.features.map((feature, fIdx) => {
      const scenariosBody = feature.scenarios.map(sc => `• ${sc}`).join('\n');
      return {
        id: `imported-feature-${fIdx}-${Date.now()}`,
        layout: 'code',
        title: feature.title,
        subtitle: feature.subtitle,
        code: feature.code,
        body: scenariosBody,
        quoteAuthor: '',
        bgOverride: '',
      };
    });

    // 3. Create N+1 CTA slide
    const ctaSlide = {
      id: `imported-cta-${Date.now()}`,
      layout: 'cta',
      title: 'Thanks for Reading!',
      body: 'If you found this helpful, click follow to see daily developer cheat sheets and tips!',
      code: '',
      quoteAuthor: '',
      bgOverride: '',
    };

    // Update settings
    if (template.footerBrand) {
      setCompanyName(template.footerBrand);
    }

    setLinkedinSlides([coverSlide, ...featureSlides, ctaSlide]);
    setLinkedinActiveIndex(0);
    setActiveTab('carousel');
    triggerToast(`Loaded "${template.name}" template into Slides Builder!`);
  };

  const downloadCarouselPDF = async () => {
    setLinkedinExporting('pdf');
    await new Promise(resolve => setTimeout(resolve, 500));

    const width = 1080;
    const height = linkedinAspect === 'portrait' ? 1350 : 1080;
    
    const doc = new jsPDF({
      orientation: linkedinAspect === 'portrait' ? 'portrait' : 'landscape',
      unit: 'px',
      format: [width, height],
      hotfixes: ['px_scaling'],
    });

    for (let i = 0; i < linkedinSlides.length; i++) {
      const element = document.getElementById(`slide-export-${i}`);
      if (!element) continue;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: width,
        height: height,
      });

      const imgData = canvas.toDataURL('image/png');
      
      if (i > 0) {
        doc.addPage([width, height], linkedinAspect === 'portrait' ? 'portrait' : 'landscape');
      }

      doc.addImage(imgData, 'PNG', 0, 0, width, height, undefined, 'FAST');
    }

    doc.save(`linkedin-carousel-${Date.now()}.pdf`);
    setLinkedinExporting(null);
    triggerToast("Carousel PDF downloaded successfully!");
  };

  const downloadCarouselImages = async () => {
    setLinkedinExporting('png');
    await new Promise(resolve => setTimeout(resolve, 500));

    const width = 1080;
    const height = linkedinAspect === 'portrait' ? 1350 : 1080;

    try {
      for (let i = 0; i < linkedinSlides.length; i++) {
        const element = document.getElementById(`slide-export-${i}`);
        if (!element) continue;

        const canvas = await html2canvas(element, {
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          logging: false,
          width: width,
          height: height,
        });

        const imgData = canvas.toDataURL('image/png');
        
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `linkedin-slide-${i + 1}-${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        await new Promise(resolve => setTimeout(resolve, 150));
      }
      triggerToast("All slides exported as PNG images successfully!");
    } catch (error) {
      console.error("Image export error:", error);
      triggerToast("Failed to export some slides as images.");
    } finally {
      setLinkedinExporting(null);
    }
  };

  // --- Internal Slide Renderer Component ---
  const LinkedinSlideContent = ({ slide, index, isForExport = false }) => {
    if (!slide) return null;
    const theme = LINKEDIN_THEMES[linkedinTheme] || LINKEDIN_THEMES.classicBlue;
    const fontClass = LINKEDIN_FONTS[linkedinFont] || 'font-family-inter';
    const isLast = index === linkedinSlides.length - 1;
    
    const bgStyle = slide.bgOverride ? `bg-[${slide.bgOverride}]` : theme.bg;
    const textStyle = theme.text || 'text-white';
    const accentStyle = theme.accent || 'text-amber-300';
    const borderStyle = theme.border || 'border-blue-400/30';
    const codeBg = theme.codeBg || 'bg-slate-900/80';

    return (
      <div 
        id={isForExport ? `slide-export-${index}` : undefined}
        className={`w-[1080px] ${linkedinAspect === 'portrait' ? 'h-[1350px]' : 'h-[1080px]'} relative flex flex-col justify-between p-20 select-none overflow-hidden ${bgStyle} ${fontClass}`}
        style={{ ...(linkedinFontStyles[fontClass] || {}), boxSizing: 'border-box' }}
      >
        {linkedinTheme !== 'minimalistWhite' && (
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        )}

        {/* --- HEADER --- */}
        <div className="flex items-center justify-between w-full z-10">
          <div className="flex items-center gap-4">
            {brandLogo ? (
              <img src={brandLogo} alt="Logo" className="w-14 h-14 rounded-xl object-contain border border-white/10" />
            ) : (
              <div className={`w-14 h-14 rounded-xl ${theme.accentBg} flex items-center justify-center border ${borderStyle}`}>
                <Sparkles className={`w-7 h-7 ${accentStyle}`} />
              </div>
            )}
            <div>
              <span className={`text-xl font-bold uppercase tracking-wider ${textStyle}`}>
                {companyName || 'STUDIO'}
              </span>
            </div>
          </div>
          <div className={`text-lg opacity-60 tracking-wide font-medium ${textStyle}`}>
            @{profileName.toLowerCase().replace(/\s+/g, '') || 'username'}
          </div>
        </div>

        {/* --- MAIN BODY --- */}
        <div className="flex-1 flex flex-col justify-center my-8 z-10">
          {slide.layout === 'title' && (
            <div className="space-y-8 text-center md:text-left">
              <div className="inline-flex">
                <span className={`px-5 py-2 rounded-full text-lg font-semibold border ${borderStyle} ${theme.accentBg} ${accentStyle}`}>
                  🔥 MASTERCLASS
                </span>
              </div>
              <h1 className={`text-[68px] font-extrabold leading-[1.1] tracking-tight whitespace-pre-line ${textStyle}`}>
                {renderHighlightedText(slide.title, accentStyle)}
              </h1>
              {slide.subtitle && (
                <p className={`text-3xl font-medium tracking-wide ${theme.subtitle}`}>
                  {slide.subtitle}
                </p>
              )}
            </div>
          )}

          {slide.layout === 'content' && (
            <div className="space-y-8">
              {slide.title && (
                <h2 className={`text-5xl font-extrabold leading-snug tracking-tight ${textStyle}`}>
                  {renderHighlightedText(slide.title, accentStyle)}
                </h2>
              )}
              <div className={`text-[32px] leading-[1.6] space-y-6 font-normal ${theme.subtitle} whitespace-pre-line`}>
                {renderHighlightedText(slide.body, accentStyle)}
              </div>
            </div>
          )}

          {slide.layout === 'code' && (
            <div className="space-y-6">
              {slide.title && (
                <h2 className={`text-[42px] font-extrabold tracking-tight ${textStyle}`}>
                  {renderHighlightedText(slide.title, accentStyle)}
                </h2>
              )}
              <div className="space-y-4">
                <div className={`rounded-2xl overflow-hidden shadow-2xl ${codeBg} border ${borderStyle}`}>
                  <div className="flex items-center justify-between px-6 py-4 bg-black/30 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-500/80"></div>
                      <div className="w-4 h-4 rounded-full bg-yellow-500/80"></div>
                      <div className="w-4 h-4 rounded-full bg-green-500/80"></div>
                    </div>
                    <span className="text-sm font-mono opacity-50 tracking-wider text-slate-300">index.js</span>
                  </div>
                  <pre className="p-8 overflow-x-auto text-left font-mono text-[24px] leading-relaxed text-slate-300">
                    <code>{slide.code}</code>
                  </pre>
                </div>
                {slide.body && (
                  <p className={`text-2xl italic tracking-wide mt-2 ${theme.subtitle}`}>
                    {renderHighlightedText(slide.body, accentStyle)}
                  </p>
                )}
              </div>
            </div>
          )}

          {slide.layout === 'quote' && (
            <div className="relative text-center max-w-4xl mx-auto space-y-8">
              <span className={`absolute -top-20 left-1/2 -translate-x-1/2 text-[260px] select-none font-serif opacity-[0.08] ${accentStyle}`}>
                “
              </span>
              <p className={`text-[40px] italic leading-relaxed font-serif ${textStyle}`}>
                {slide.body}
              </p>
              {slide.quoteAuthor && (
                <div className="space-y-1">
                  <div className="w-12 h-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent mx-auto mb-4"></div>
                  <p className={`text-2xl font-bold tracking-widest uppercase ${accentStyle}`}>
                    — {slide.quoteAuthor}
                  </p>
                </div>
              )}
            </div>
          )}

          {slide.layout === 'cta' && (
            <div className="text-center space-y-10 max-w-3xl mx-auto">
              <div className="relative inline-block">
                {profilePic ? (
                  <img src={profilePic} alt={profileName} className={`w-40 h-40 rounded-full object-cover border-[4px] ${borderStyle} mx-auto shadow-2xl`} />
                ) : (
                  <div className={`w-40 h-40 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border-[4px] ${borderStyle} flex items-center justify-center text-5xl font-extrabold text-white mx-auto shadow-2xl`}>
                    {profileName.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className={`absolute bottom-1 right-2 w-10 h-10 rounded-full ${theme.accentBg} flex items-center justify-center border ${borderStyle} shadow-lg`}>
                  <Sparkles className={`w-5 h-5 ${accentStyle}`} />
                </div>
              </div>
              <div className="space-y-3">
                <h3 className={`text-[46px] font-extrabold tracking-tight ${textStyle}`}>
                  {slide.title || 'Thanks for Reading!'}
                </h3>
                <p className={`text-2xl font-medium ${theme.subtitle}`}>
                  {profileName} • {profileHeadline}
                </p>
              </div>
              <p className={`text-2xl leading-relaxed max-w-2xl mx-auto ${theme.subtitle} opacity-90`}>
                {slide.body}
              </p>
              <div className="pt-4 flex items-center justify-center gap-6">
                <button className={`px-10 py-5 rounded-2xl text-xl font-bold bg-[#0a66c2] hover:bg-[#0a66c2]/90 text-white shadow-xl transition-all`}>
                  Follow +
                </button>
              </div>
            </div>
          )}
        </div>

        {/* --- FOOTER --- */}
        <div className="flex items-center justify-between w-full border-t border-white/5 pt-8 z-10">
          <div className="flex items-center gap-4">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="w-12 h-12 rounded-full object-cover border border-white/10" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-base">
                {profileName.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="text-left">
              <h4 className={`text-lg font-bold leading-tight ${textStyle}`}>
                {profileName || 'Your Name'}
              </h4>
              <p className={`text-sm opacity-60 leading-tight truncate max-w-[400px] ${textStyle}`}>
                {profileHeadline || 'Your Headline'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {linkedinShowSwipe && !isLast && (
              <div className="flex items-center gap-3">
                <span className={`text-lg font-semibold uppercase tracking-widest ${accentStyle}`}>
                  {linkedinSwipeText}
                </span>
                <ChevronRight className={`w-6 h-6 animate-pulse ${accentStyle}`} />
              </div>
            )}
            {linkedinShowNumbers && (
              <span className={`text-xl font-bold py-2 px-4 rounded-xl bg-black/20 ${theme.numberText}`}>
                {index + 1} / {linkedinSlides.length}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };


  // ==========================================
  // --- HANDLERS: INFOGRAPHIC & CHEAT SHEET ---
  // ==========================================

  const handleLoadTemplate = (templateId) => {
    const template = INFOGRAPHIC_TEMPLATES[templateId];
    if (!template) return;
    
    setSelectedTemplateId(templateId);
    setInfographicFeatures(template.features.map(f => ({ ...f })));
    setInfographicTitle(template.title);
    setInfographicSubtitle(template.subtitle);
    setInfographicCategory(template.category);
    setInfographicFooterBrand(template.footerBrand);
    
    const matchedTheme = INFOGRAPHIC_THEMES.find(t => t.id === template.themeId) || INFOGRAPHIC_THEMES[0];
    setInfographicTheme(matchedTheme);
    setInfographicActiveSlide(0);
    setInfographicEditingIndex(null);
    triggerToast(`Loaded "${template.name}" template successfully!`);
  };

  const infographicStartEditing = (idx) => {
    setInfographicEditingIndex(idx);
    setInfographicEditBuffer({ ...infographicFeatures[idx] });
  };

  const infographicSaveEdit = () => {
    if (infographicEditingIndex !== null && infographicEditBuffer) {
      const updated = [...infographicFeatures];
      updated[infographicEditingIndex] = infographicEditBuffer;
      setInfographicFeatures(updated);
      setInfographicEditingIndex(null);
      setInfographicEditBuffer(null);
      triggerToast("Feature block customized successfully!");
    }
  };

  const infographicHandleEditChange = (field, value) => {
    setInfographicEditBuffer(prev => ({ ...prev, [field]: value }));
  };

  const infographicHandleScenarioChange = (sIdx, value) => {
    const updatedScenarios = [...infographicEditBuffer.scenarios];
    updatedScenarios[sIdx] = value;
    setInfographicEditBuffer(prev => ({ ...prev, scenarios: updatedScenarios }));
  };

  const infographicConfirmReset = () => {
    handleLoadTemplate(selectedTemplateId);
    setInfographicShowResetModal(false);
    triggerToast("Reset infographic content to template defaults.");
  };

  // Card stack management (CRUD)
  const infographicAddBlock = () => {
    const newBlockNum = infographicFeatures.length + 1;
    const newBlock = {
      id: `custom-${Date.now()}`,
      num: newBlockNum,
      title: 'New Feature Block',
      subtitle: 'SUBTITLE / TAGLINE',
      code: `// Write code here\nconsole.log("LinkedIn Creator Hub");`,
      scenarios: [
        'Use Case Scenario Item 1',
        'Use Case Scenario Item 2',
        'Use Case Scenario Item 3'
      ]
    };
    setInfographicFeatures([...infographicFeatures, newBlock]);
    triggerToast("Added a new custom feature block!");
  };

  const infographicRemoveBlock = (idx) => {
    if (infographicFeatures.length <= 1) {
      triggerToast("An infographic must have at least one block.");
      return;
    }
    const updated = infographicFeatures
      .filter((_, i) => i !== idx)
      .map((item, i) => ({ ...item, num: i + 1 }));
    setInfographicFeatures(updated);
    setInfographicActiveSlide(Math.max(0, infographicActiveSlide - 1));
    setInfographicEditingIndex(null);
    triggerToast("Removed feature block successfully.");
  };

  const infographicMoveBlock = (idx, direction) => {
    if (direction === 'up' && idx > 0) {
      const updated = [...infographicFeatures];
      const temp = updated[idx];
      updated[idx] = updated[idx - 1];
      updated[idx - 1] = temp;
      
      const final = updated.map((item, i) => ({ ...item, num: i + 1 }));
      setInfographicFeatures(final);
      if (infographicEditingIndex === idx) setInfographicEditingIndex(idx - 1);
      else if (infographicEditingIndex === idx - 1) setInfographicEditingIndex(idx);
      triggerToast("Moved block up.");
    } else if (direction === 'down' && idx < infographicFeatures.length - 1) {
      const updated = [...infographicFeatures];
      const temp = updated[idx];
      updated[idx] = updated[idx + 1];
      updated[idx + 1] = temp;
      
      const final = updated.map((item, i) => ({ ...item, num: i + 1 }));
      setInfographicFeatures(final);
      if (infographicEditingIndex === idx) setInfographicEditingIndex(idx + 1);
      else if (infographicEditingIndex === idx + 1) setInfographicEditingIndex(idx);
      triggerToast("Moved block down.");
    }
  };
  const infographicToggleSelectBlock = (idx) => {
    const updated = [...infographicFeatures];
    const currentVal = updated[idx].selected !== false;
    updated[idx].selected = !currentVal;
    setInfographicFeatures(updated);
    triggerToast(`Card "${updated[idx].title || `Block #${idx + 1}`}" ${!currentVal ? 'included' : 'excluded'}.`);
  };

  const infographicExportPNG = async () => {
    setInfographicExporting('current');
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const elementId = infographicLayout === 'infographic' ? 'infographic-preview' : `slide-preview-${infographicActiveSlide}`;
      const node = document.getElementById(elementId);
      if (!node) throw new Error("Export target preview element missing");

      // Temporarily hide edit overlay buttons
      const editButtons = node.querySelectorAll('.edit-overlay-btn');
      editButtons.forEach(btn => btn.style.display = 'none');

      // Use html2canvas to render the DOM directly
      const canvas = await html2canvas(node, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });

      // Restore edit buttons
      editButtons.forEach(btn => btn.style.display = '');

      canvas.toBlob((blob) => {
        if (!blob) {
          triggerToast("Export failed: Canvas generation returned empty blob.");
          setInfographicExporting(null);
          return;
        }
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        const safeName = infographicTitle.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 20);
        link.download = `CheatSheet_${safeName}_${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        
        document.body.removeChild(link);
        URL.revokeObjectURL(downloadUrl);
        triggerToast("HD PNG downloaded! Check your system Downloads folder.");
        setInfographicExporting(null);
      }, 'image/png', 1.0);

    } catch (err) {
      console.error(err);
      setInfographicExporting(null);
      triggerToast("An error occurred during export.");
    }
  };

  const infographicExportAllSlides = async () => {
    setInfographicExporting('all');
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const totalSlides = activeInfographicFeatures.length + 1;
      for (let i = 0; i < totalSlides; i++) {
        const element = document.getElementById(`infographic-slide-export-${i}`);
        if (!element) continue;

        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
        });

        const imgData = canvas.toDataURL('image/png');
        
        const link = document.createElement('a');
        link.href = imgData;
        const safeName = infographicTitle.toLowerCase().replace(/[^a-z0-9]+/g, '_').slice(0, 15);
        link.download = `Slide_${i + 1}_${safeName}_${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        await new Promise(resolve => setTimeout(resolve, 150));
      }
      triggerToast("All slides exported as PNG successfully!");
    } catch (error) {
      console.error("All slides export error:", error);
      triggerToast("Failed to export some slides.");
    } finally {
      setInfographicExporting(null);
    }
  };


  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col font-sans antialiased">
      
      {/* Toast Alert Feedback */}
      {toast.show && (
        <div className="fixed top-24 right-6 bg-slate-900 border-2 border-indigo-500/50 text-slate-100 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-[100] animate-in fade-in slide-in-from-top-6">
          <Check className="w-5 h-5 text-indigo-400" />
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}

      {/* Reset Modal */}
      {infographicShowResetModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-[90]">
          <div className="bg-[#0b101d] border border-slate-800 rounded-2xl max-w-sm w-full p-5 shadow-2xl space-y-4">
            <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-sm font-bold text-white">Reset Infographic Elements?</h3>
              <p className="text-xs text-slate-400 mt-1">This will revert any modifications back to the default template values.</p>
            </div>
            <div className="flex gap-3 pt-2">
              <button 
                onClick={() => setInfographicShowResetModal(false)}
                className="flex-1 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-850 text-xs text-slate-300 font-semibold"
              >
                Keep Current
              </button>
              <button 
                onClick={infographicConfirmReset}
                className="flex-1 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-xs text-white font-bold"
              >
                Reset Cards
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Studio Banner Header */}
      <header className="border-b border-slate-800 bg-[#0c101b]/80 backdrop-blur-md sticky top-0 z-50 px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">
                LinkedIn Creator Studio
              </h1>
              <p className="text-xs text-slate-400 font-medium">Post, Infographic & Carousel Offline Architect</p>
            </div>
          </div>
          
          {/* Main Tab Controller */}
          <div className="flex p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('carousel')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'carousel'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/15'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              Carousel Builder
            </button>
            
            <button
              onClick={() => setActiveTab('infographic')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'infographic'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/15'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode className="w-4 h-4" />
              Infographic Designer
            </button>

            <button
              onClick={() => setActiveTab('post')}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'post'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/15'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Type className="w-4 h-4" />
              Post Formatter
            </button>
          </div>

          {/* Quick Tab-Specific Action Buttons */}
          {activeTab === 'infographic' && (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setInfographicShowResetModal(true)}
                className="px-3 py-1.5 rounded-lg border border-slate-850 hover:border-slate-700 text-xs text-slate-400 hover:text-white transition-all flex items-center gap-1.5 bg-slate-950/40"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Default
              </button>
              {infographicLayout === 'carousel' && (
                <button
                  onClick={infographicExportAllSlides}
                  disabled={infographicExporting !== null}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-300 hover:text-white transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  {infographicExporting === 'all' ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Exporting Slides...
                    </>
                  ) : (
                    <>
                      <FileImage className="w-3.5 h-3.5 text-emerald-400" /> Export All Slides (PNG)
                    </>
                  )}
                </button>
              )}
              <button
                onClick={infographicExportPNG}
                disabled={infographicExporting !== null}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white shadow-lg transition-all flex items-center gap-1.5 disabled:opacity-50"
              >
                {infographicExporting === 'current' ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Compiling PNG...
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" /> {infographicLayout === 'carousel' ? 'Export Current Slide' : 'Export HD PNG'}
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Workspace Frame */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* ========================================== */}
        {/* --- TAB CONTENT: LINKEDIN CAROUSEL --- */}
        {/* ========================================== */}
        {activeTab === 'carousel' && (
          <>
            {/* LEFT CONFIGURATION PANELS (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 overflow-y-auto max-h-[calc(100vh-160px)] pr-2">
              
              {/* Cheat Sheet Import Preset Panel */}
              <div className="bg-[#121824]/85 border border-indigo-500/20 rounded-2xl p-5 space-y-3 shadow-xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200">
                    Cheat Sheet Template Importer
                  </h3>
                </div>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Instantly build your entire slide carousel by loading one of our pre-designed developer cheat sheets!
                </p>
                <div className="flex items-center gap-2">
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        handleImportTemplateToSlides(e.target.value);
                        e.target.value = ""; // reset dropdown selection
                      }
                    }}
                    defaultValue=""
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer font-medium"
                  >
                    <option value="" disabled>-- Load Pre-designed Cheat Sheet --</option>
                    {Object.entries(INFOGRAPHIC_TEMPLATES).map(([key, t]) => (
                      <option key={key} value={key}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Profile / Branding Section */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-blue-500" />
                  1. Brand Identity
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 font-semibold">Creator Name</label>
                    <input
                      type="text"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 font-semibold">Company / Logo Text</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-semibold">Headline (Professional Bio)</label>
                  <input
                    type="text"
                    value={profileHeadline}
                    onChange={(e) => setProfileHeadline(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
                
                {/* Images Uploads */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold mb-1">Avatar</span>
                    <label className="flex items-center justify-center gap-2 border border-dashed border-slate-700 hover:border-slate-500 rounded-lg py-2 cursor-pointer bg-slate-950/40 transition-all">
                      <Upload className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs text-slate-300 font-medium">Upload Pic</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFile(e, setProfilePic)}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400 font-semibold mb-1">Company Logo</span>
                    <label className="flex items-center justify-center gap-2 border border-dashed border-slate-700 hover:border-slate-500 rounded-lg py-2 cursor-pointer bg-slate-950/40 transition-all">
                      <Upload className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-xs text-slate-300 font-medium">Upload Logo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageFile(e, setBrandLogo)}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Theme & Styling Settings */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-violet-500" />
                    2. Visual Theme & Layout
                  </h3>
                  <button
                    onClick={handleRandomizeLinkedinStyle}
                    className="flex items-center gap-1 px-2.5 py-1 bg-violet-600/10 hover:bg-violet-600/20 border border-violet-500/20 hover:border-violet-500/40 rounded-lg text-[10px] font-bold text-violet-300 hover:text-white transition-all shadow-sm"
                    title="Generate a random design configuration"
                  >
                    <span>Surprise Me 🎲</span>
                  </button>
                </div>
                
                {/* Theme select */}
                <div className="space-y-2">
                  <label className="text-xs text-slate-400 font-semibold">Select Color Template</label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(LINKEDIN_THEMES).map(([key, th]) => (
                      <button
                        key={key}
                        onClick={() => setLinkedinTheme(key)}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                          linkedinTheme === key
                            ? 'border-blue-500 bg-blue-600/10 text-white'
                            : 'border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full mb-1.5 border border-white/10 ${th.bg}`}></div>
                        {th.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Font select */}
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 font-semibold">Typography Family</label>
                    <select
                      value={linkedinFont}
                      onChange={(e) => setLinkedinFont(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                    >
                      <option value="sans">Inter (Modern Sans)</option>
                      <option value="serif">Playfair (Elegant Serif)</option>
                      <option value="display">Space Grotesk (Tech Display)</option>
                      <option value="mono">JetBrains Mono (Developer)</option>
                    </select>
                  </div>
                  {/* Aspect ratio */}
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 font-semibold">Aspect Ratio</label>
                    <select
                      value={linkedinAspect}
                      onChange={(e) => setLinkedinAspect(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                    >
                      <option value="square">Square (1080 x 1080)</option>
                      <option value="portrait">Portrait (1080 x 1350)</option>
                    </select>
                  </div>
                </div>

                {/* Toggles */}
                <div className="space-y-3 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={linkedinShowNumbers}
                      onChange={(e) => setLinkedinShowNumbers(e.target.checked)}
                      className="rounded border-slate-800 text-blue-600 bg-slate-950 focus:ring-blue-500"
                    />
                    <span className="text-xs text-slate-300 font-semibold">Show Slide Page Numbers</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={linkedinShowSwipe}
                      onChange={(e) => setLinkedinShowSwipe(e.target.checked)}
                      className="rounded border-slate-800 text-blue-600 bg-slate-950 focus:ring-blue-500"
                    />
                    <span className="text-xs text-slate-300 font-semibold">Show Swipe indicator</span>
                  </label>
                  {linkedinShowSwipe && (
                    <div className="pl-6 space-y-1">
                      <label className="text-[10px] text-slate-400 font-bold uppercase">Swipe Label</label>
                      <input
                        type="text"
                        value={linkedinSwipeText}
                        onChange={(e) => setLinkedinSwipeText(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Active Slide Editor */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Code className="w-4 h-4 text-emerald-500" />
                    3. Edit Slide {linkedinActiveIndex + 1}
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => linkedinMoveSlide('up')}
                      disabled={linkedinActiveIndex === 0}
                      className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 disabled:opacity-30"
                      title="Move slide up"
                    >
                      <ArrowUp className="w-3.5 h-3.5 text-slate-300" />
                    </button>
                    <button
                      onClick={() => linkedinMoveSlide('down')}
                      disabled={linkedinActiveIndex === linkedinSlides.length - 1}
                      className="p-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 disabled:opacity-30"
                      title="Move slide down"
                    >
                      <ArrowDown className="w-3.5 h-3.5 text-slate-300" />
                    </button>
                    <button
                      onClick={() => linkedinRemoveSlide(linkedinActiveIndex)}
                      disabled={linkedinSlides.length <= 1}
                      className="p-1.5 rounded-lg bg-red-950/40 border border-red-900/30 hover:bg-red-900/40 disabled:opacity-30"
                      title="Delete Slide"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </div>
                </div>

                {/* Layout Preset selector */}
                <div className="space-y-1">
                  <label className="text-xs text-slate-400 font-semibold">Slide Layout Preset</label>
                  <select
                    value={linkedinSlides[linkedinActiveIndex]?.layout || 'content'}
                    onChange={(e) => linkedinUpdateSlide({ layout: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                  >
                    <option value="title">Title (Intro Slide)</option>
                    <option value="content">Content (Bullet points & paragraphs)</option>
                    <option value="code">Code Snippet (macOS IDE Mockup)</option>
                    <option value="quote">Quote Box (Inspiring quote)</option>
                    <option value="cta">CTA (Profile pitch & Follow button)</option>
                  </select>
                </div>

                {/* Slide Fields based on Layout */}
                {linkedinSlides[linkedinActiveIndex]?.layout !== 'quote' && (
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 font-semibold flex items-center justify-between">
                      Slide Title / Heading
                      <span className="text-[10px] text-slate-500 normal-case">Wrap in [h]word[/h] to highlight</span>
                    </label>
                    <input
                      type="text"
                      value={linkedinSlides[linkedinActiveIndex]?.title || ''}
                      onChange={(e) => linkedinUpdateSlide({ title: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}

                {linkedinSlides[linkedinActiveIndex]?.layout === 'title' && (
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 font-semibold">Subtitle</label>
                    <input
                      type="text"
                      value={linkedinSlides[linkedinActiveIndex]?.subtitle || ''}
                      onChange={(e) => linkedinUpdateSlide({ subtitle: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}

                {(linkedinSlides[linkedinActiveIndex]?.layout === 'content' || linkedinSlides[linkedinActiveIndex]?.layout === 'code' || linkedinSlides[linkedinActiveIndex]?.layout === 'cta' || linkedinSlides[linkedinActiveIndex]?.layout === 'quote') && (
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 font-semibold flex items-center justify-between">
                      {linkedinSlides[linkedinActiveIndex]?.layout === 'quote' ? 'Quote Text' : 'Body Paragraphs / Bullet Points'}
                      <span className="text-[10px] text-slate-500 normal-case">Supports bullet (•) shortcuts</span>
                    </label>
                    <textarea
                      rows={5}
                      value={linkedinSlides[linkedinActiveIndex]?.body || ''}
                      onChange={(e) => linkedinUpdateSlide({ body: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                )}

                {linkedinSlides[linkedinActiveIndex]?.layout === 'quote' && (
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 font-semibold">Author Name</label>
                    <input
                      type="text"
                      value={linkedinSlides[linkedinActiveIndex]?.quoteAuthor || ''}
                      onChange={(e) => linkedinUpdateSlide({ quoteAuthor: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                )}

                {linkedinSlides[linkedinActiveIndex]?.layout === 'code' && (
                  <div className="space-y-1">
                    <label className="text-xs text-slate-400 font-semibold">Code Block Content</label>
                    <textarea
                      rows={6}
                      value={linkedinSlides[linkedinActiveIndex]?.code || ''}
                      onChange={(e) => linkedinUpdateSlide({ code: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT WORKSPACE PREVIEW (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col items-center gap-6">
              
              {/* Slide Navigator strip */}
              <div className="w-full bg-slate-900/40 border border-slate-800/85 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Slides:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {linkedinSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setLinkedinActiveIndex(i)}
                        className={`w-7 h-7 rounded-lg text-xs font-extrabold transition-all border ${
                          linkedinActiveIndex === i
                            ? 'bg-blue-600 text-white border-blue-500'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={linkedinAddSlide}
                      className="w-7 h-7 rounded-lg text-xs font-bold bg-slate-950 border border-slate-800 text-emerald-400 hover:border-emerald-700 flex items-center justify-center"
                      title="Add Slide"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label className="text-xs text-slate-400 font-bold uppercase">Zoom Preview:</label>
                  <input
                    type="range"
                    min="0.2"
                    max="0.8"
                    step="0.05"
                    value={linkedinScale}
                    onChange={(e) => setLinkedinScale(parseFloat(e.target.value))}
                    className="w-24 accent-blue-600"
                  />
                  <span className="text-xs font-mono font-semibold text-slate-300">{(linkedinScale * 100).toFixed(0)}%</span>
                </div>
              </div>

              {/* Main Interactive Slide Canvas */}
              <div className="relative border border-slate-800 rounded-3xl bg-slate-950 p-8 flex items-center justify-center shadow-2xl min-h-[460px] w-full">
                
                {/* CSS Scaled Container */}
                <div
                  className="relative overflow-hidden bg-slate-900 border border-white/5 rounded-2xl shadow-inner flex items-center justify-center transition-all duration-300"
                  style={{
                    width: `${1080 * linkedinScale}px`,
                    height: `${(linkedinAspect === 'portrait' ? 1350 : 1080) * linkedinScale}px`,
                  }}
                >
                  <div
                    className="absolute top-0 left-0 origin-top-left"
                    style={{
                      width: '1080px',
                      height: linkedinAspect === 'portrait' ? '1350px' : '1080px',
                      transform: `scale(${linkedinScale})`,
                    }}
                  >
                    <LinkedinSlideContent slide={linkedinSlides[linkedinActiveIndex]} index={linkedinActiveIndex} />
                  </div>
                </div>

                {/* Left/Right floating controls */}
                <button
                  onClick={() => setLinkedinActiveIndex(Math.max(0, linkedinActiveIndex - 1))}
                  disabled={linkedinActiveIndex === 0}
                  className="absolute left-4 p-3 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all disabled:opacity-20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setLinkedinActiveIndex(Math.min(linkedinSlides.length - 1, linkedinActiveIndex + 1))}
                  disabled={linkedinActiveIndex === linkedinSlides.length - 1}
                  className="absolute right-4 p-3 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all disabled:opacity-20"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="w-full flex flex-wrap gap-4 justify-end">
                <button
                  onClick={downloadCarouselImages}
                  disabled={linkedinExporting !== null}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-slate-900 hover:bg-slate-850 text-slate-100 hover:text-white border border-slate-800 hover:border-slate-700 font-extrabold rounded-2xl shadow-xl transition-all text-base disabled:opacity-50"
                >
                  {linkedinExporting === 'png' ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Exporting Images...
                    </>
                  ) : (
                    <>
                      <FileImage className="w-5 h-5 text-emerald-400" />
                      Export All Images (PNG)
                    </>
                  )}
                </button>

                <button
                  onClick={downloadCarouselPDF}
                  disabled={linkedinExporting !== null}
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-2xl shadow-xl shadow-blue-500/10 transition-all text-base disabled:opacity-50"
                >
                  {linkedinExporting === 'pdf' ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Generating High-Res PDF...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Download Carousel PDF
                    </>
                  )}
                </button>
              </div>

              {/* LinkedIn Quality & Anti-Compression Tips */}
              <div className="w-full mt-4 bg-slate-900/60 border border-slate-850 rounded-2xl p-4 flex gap-3 text-left">
                <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-200">LinkedIn Quality & Anti-Compression Tips</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong className="text-indigo-300">📄 Highly Recommended: Upload as PDF Document.</strong> Uploading your carousel as a PDF ("Document" on LinkedIn) bypasses image compression completely. It renders pages as vector paths, keeping text and code crystal clear at any zoom level on both desktop and mobile devices.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    <strong className="text-emerald-400">🖼️ Optimized PNG Images.</strong> When exporting individual slides, the app exports them at a fine-tuned <strong className="text-slate-300">1.5x scale (1620px width)</strong>. This avoids LinkedIn's aggressive compression (often triggered on images over 3–5MB) while preserving perfect clarity.
                  </p>
                </div>
              </div>

              {/* Hidden Export Container */}
              <div 
                style={{ 
                  position: 'absolute', 
                  top: '-99999px', 
                  left: '-99999px', 
                  pointerEvents: 'none', 
                  zIndex: -9999 
                }}
              >
                {linkedinSlides.map((slide, index) => (
                  <div key={index}>
                    <LinkedinSlideContent slide={slide} index={index} isForExport={true} />
                  </div>
                ))}
              </div>
              
            </div>
          </>
        )}

        {/* ========================================== */}
        {/* --- TAB CONTENT: CONFIGURABLE INFOGRAPHIC --- */}
        {/* ========================================== */}
        {activeTab === 'infographic' && (
          <>
            {/* Left Side: Controls & Fields Panel */}
            <aside className="lg:col-span-5 border border-slate-850 rounded-2xl bg-[#090d16]/70 p-5 space-y-5 overflow-y-auto max-h-[calc(100vh-160px)]">
              
              {/* Presets Selector (Dropdown) */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Select Framework Cheat Sheet
                </label>
                <select
                  value={selectedTemplateId}
                  onChange={(e) => handleLoadTemplate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-slate-200 font-semibold focus:outline-none focus:border-indigo-500"
                >
                  {Object.entries(INFOGRAPHIC_TEMPLATES).map(([key, t]) => (
                    <option key={key} value={key}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Infographic Layout Information */}
              <div className="space-y-3">
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Layout className="w-4 h-4 text-indigo-400" /> Cheat Sheet Output Format
                </h2>
                <div className="p-4 bg-slate-900/40 border border-slate-850 rounded-2xl space-y-3">
                  <span className="text-xs font-bold text-slate-200 block">Continuous Vertical Poster</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    This layout compiles all features into a single, high-density vertical cheat sheet. Ideal for comprehensive syntax guides and developer reference posters.
                  </p>
                  <div className="p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl flex gap-2">
                    <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span className="text-[10px] text-slate-400 leading-normal">
                      To create a swipeable slide deck instead, use the <strong>Template Importer</strong> on the <strong>LinkedIn Slides</strong> tab.
                    </span>
                  </div>
                </div>
              </div>

                {/* Suggestions and performance tip box */}
                {(() => {
                  const currentAspect = infographicLayout === 'infographic' ? 'tall' : infographicAspect;
                  const suggest = getAspectRatioSuggestion(currentAspect);
                  return (
                    <div className="space-y-3">
                      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-850/60 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-extrabold text-indigo-400 uppercase tracking-widest">{suggest.title}</span>
                          <span className="text-[8px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">{suggest.performance}</span>
                        </div>
                        <div className="space-y-1.5 text-slate-400 leading-relaxed">
                          <p className="text-[11px]">{suggest.description}</p>
                          <div className="text-[10px] text-slate-500 flex items-center gap-1">
                            <span className="font-bold text-slate-300">Tip:</span> {suggest.tips}
                          </div>
                        </div>
                      </div>

                      {/* LinkedIn Feed Simulator Mockup */}
                      <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-850/60 space-y-2.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">LinkedIn Feed Preview</span>
                        <div className="bg-[#0b0f19] border border-slate-850 rounded-xl p-3.5 space-y-3 shadow-lg max-w-sm mx-auto">
                          
                          {/* Post Header */}
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-[10px] select-none shadow">
                              {profileName ? profileName.slice(0, 2).toUpperCase() : 'ME'}
                            </div>
                            <div className="text-left leading-tight">
                              <div className="text-[10px] font-bold text-slate-100 flex items-center gap-1">
                                {profileName || 'Your Name'}
                                <span className="w-1 h-1 rounded-full bg-slate-600" />
                                <span className="text-[9px] text-blue-400 font-semibold hover:underline cursor-pointer">Follow</span>
                              </div>
                              <span className="text-[8px] text-slate-500 block truncate max-w-[180px]">{profileHeadline || 'Creator & Innovator'}</span>
                              <span className="text-[7px] text-slate-600 block mt-0.5">1h • 🌐</span>
                            </div>
                          </div>

                          {/* Post Text snippet */}
                          <p className="text-[10px] text-slate-300 leading-normal text-left font-sans">
                            🚀 Just compiled the ultimate cheat sheet on <span className="text-blue-400 font-medium">{infographicTitle || 'this topic'}</span>. Let me know your thoughts! #dev #learning
                          </p>

                          {/* Post Media Preview container */}
                          <div className="flex justify-center bg-slate-950/60 rounded-lg p-2 border border-slate-850/40">
                            {(() => {
                              if (currentAspect === 'tall') {
                                return (
                                  <div className="w-full relative rounded-lg border border-slate-800 overflow-hidden bg-slate-950 flex flex-col justify-between" style={{ height: '140px' }}>
                                    {/* Simulated poster background */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${infographicTheme.gradient} opacity-85 flex flex-col justify-start p-2.5 gap-1`}>
                                      <span className="text-[7px] uppercase tracking-wider text-slate-400">{infographicCategory}</span>
                                      <span className="text-[8px] font-bold text-white leading-tight truncate">{infographicTitle}</span>
                                      <div className="w-full h-16 rounded border border-white/5 bg-slate-900/40 p-1.5 overflow-hidden flex flex-col justify-between">
                                        <div className="w-full h-1 bg-white/25 rounded" />
                                        <div className="w-2/3 h-1 bg-white/20 rounded" />
                                        <div className="w-full h-6 rounded bg-slate-950/60" />
                                      </div>
                                    </div>
                                    {/* Faded bottom overflow overlay */}
                                    <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-slate-950 to-transparent flex items-end justify-center pb-1.5 z-10">
                                      <span className="text-[8px] font-bold text-slate-300 px-2 py-0.5 bg-slate-900/90 border border-slate-800 rounded-full shadow-lg flex items-center gap-0.5 select-none scale-90">
                                        Click to expand poster
                                      </span>
                                    </div>
                                  </div>
                                );
                              }

                              // Slides Carousel Aspect ratio layouts
                              const aspectClass = 
                                currentAspect === 'square' ? 'w-full aspect-square' :
                                currentAspect === 'landscape' ? 'w-full aspect-[16/9]' :
                                'w-[110px] aspect-[4/5]'; // portrait
                              
                              return (
                                <div className={`${aspectClass} relative rounded-lg border border-slate-850 overflow-hidden bg-slate-950 shadow-inner flex flex-col justify-between p-2.5 bg-gradient-to-br ${infographicTheme.gradient}`}>
                                  {/* Top header bar */}
                                  <div className="flex justify-between items-center w-full">
                                    <span className="text-[6px] font-bold uppercase tracking-wider text-slate-400 truncate max-w-[70%]">{infographicCategory}</span>
                                    <span className="text-[6px] font-mono text-slate-500">3 of 6</span>
                                  </div>

                                  {/* Body */}
                                  <div className="my-auto space-y-0.5 text-left">
                                    <span className="text-[5px] uppercase tracking-wide font-extrabold text-blue-400 block">Records (Data Carriers)</span>
                                    <span className="text-[7px] font-extrabold text-white leading-tight block">Eliminate Boilerplate</span>
                                    <div className="w-full h-6 rounded bg-slate-950/80 border border-white/5" />
                                  </div>

                                  {/* Footer */}
                                  <div className="flex justify-between items-center w-full pt-1 border-t border-white/5">
                                    <span className="text-[6px] text-slate-500 truncate max-w-[60%]">{infographicFooterBrand}</span>
                                    <span className="text-[6px] font-extrabold text-blue-400">SWIPE NEXT →</span>
                                  </div>

                                  {/* Carousel badge overlay */}
                                  <div className="absolute top-1 right-1 bg-black/60 px-1 py-0.5 rounded text-[5px] font-bold text-white z-10 scale-90">
                                    1 / 6
                                  </div>
                                </div>
                              );
                            })()}
                          </div>

                          {/* Social Actions */}
                          <div className="flex items-center justify-between border-t border-slate-900 pt-2 px-0.5 text-[9px] text-slate-500 font-semibold select-none">
                            <span className="flex items-center gap-0.5 hover:text-slate-300 cursor-pointer">👍 Like</span>
                            <span className="flex items-center gap-0.5 hover:text-slate-300 cursor-pointer">💬 Comment</span>
                            <span className="flex items-center gap-0.5 hover:text-slate-300 cursor-pointer">🔁 Repost</span>
                            <span className="flex items-center gap-0.5 hover:text-slate-300 cursor-pointer">✉️ Send</span>
                          </div>

                        </div>
                      </div>

                      {/* Image Quality & Compression Alert */}
                      <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl flex gap-2 text-left">
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wide block">Anti-Compression Guard</span>
                          <p className="text-[9px] text-slate-400 leading-relaxed">
                            LinkedIn scales down images over <strong>4096px</strong> or <strong>5MB</strong>, which blurs fine text and code.
                          </p>
                          <p className="text-[9px] text-slate-400 leading-relaxed">
                            {infographicLayout === 'carousel' 
                              ? "To bypass this, upload multi-slide carousels as a PDF Document. Single slide PNG downloads are auto-optimized to fit safety thresholds."
                              : "This tall infographic will render at a perfect 1200px width (2.0x scale) to ensure crystal-clear text quality while staying under LinkedIn's compression limits."
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })()}

              {/* Preset Theme Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-indigo-400" /> 3. Palette Accent & Colors
                  </h2>
                  <button
                    onClick={handleRandomizeInfographicStyle}
                    className="flex items-center gap-1 px-2.5 py-1 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 hover:border-indigo-500/40 rounded-lg text-[10px] font-bold text-indigo-300 hover:text-white transition-all shadow-sm"
                    title="Generate a random color combination"
                  >
                    <span>Surprise Me 🎲</span>
                  </button>
                </div>
                
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-850 space-y-3">
                  <div className="grid grid-cols-5 gap-1.5">
                    {INFOGRAPHIC_THEMES.map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setInfographicTheme(theme)}
                        className={`p-2 rounded-lg text-center transition-all border text-xs flex flex-col items-center gap-1 ${
                          infographicTheme.id === theme.id 
                            ? 'bg-slate-850 border-indigo-500 text-white' 
                            : 'bg-slate-950/60 border-slate-850 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full block" style={{ backgroundColor: theme.accent }} />
                        <span className="text-[9px] tracking-tight truncate max-w-full">{theme.name.split(' ')[0]}</span>
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                    <span className="text-xs text-slate-400">Custom Accent:</span>
                    <div className="flex items-center gap-1.5">
                      <input 
                        type="color" 
                        value={infographicCustomAccent}
                        onChange={(e) => setInfographicCustomAccent(e.target.value)}
                        className="w-5 h-5 rounded cursor-pointer bg-transparent border-0"
                      />
                      <input 
                        type="text" 
                        value={infographicCustomAccent} 
                        onChange={(e) => setInfographicCustomAccent(e.target.value)}
                        className="px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-xs font-mono w-20 text-center text-indigo-300"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Font Type Selection */}
              <div className="space-y-3">
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Type className="w-4 h-4 text-indigo-400" /> 4. Layout Typography
                </h2>
                <div className="grid grid-cols-3 gap-2">
                  {INFOGRAPHIC_FONTS.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => setInfographicFont(font)}
                      className={`py-1 px-2 rounded-lg text-xs font-medium text-center border transition-all ${
                        infographicFont.id === font.id 
                          ? 'bg-indigo-600/15 border-indigo-500 text-white' 
                          : 'bg-slate-950/60 border-slate-850 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      <span className={font.class}>{font.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Headings Text Editors */}
              <div className="space-y-3">
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-indigo-400" /> 5. Custom Cover Headings
                </h2>
                <div className="p-3.5 bg-slate-900/60 border border-slate-850 space-y-2.5 rounded-xl">
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 block mb-1">Top Flag Category</label>
                    <input 
                      type="text" 
                      value={infographicCategory} 
                      onChange={(e) => setInfographicCategory(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-855 rounded text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 block mb-1">Banner Title</label>
                    <input 
                      type="text" 
                      value={infographicTitle} 
                      onChange={(e) => setInfographicTitle(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-850 rounded text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 block mb-1">Banner Description</label>
                    <textarea 
                      rows={2}
                      value={infographicSubtitle} 
                      onChange={(e) => setInfographicSubtitle(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-850 rounded text-xs text-white resize-none focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 block mb-1">Footer Brand Text</label>
                    <input 
                      type="text" 
                      value={infographicFooterBrand} 
                      onChange={(e) => setInfographicFooterBrand(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-850 rounded text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Cards Stack Customization */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    6. Infographic Card Stack
                  </h2>
                  <button
                    onClick={infographicAddBlock}
                    className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-[10px] font-bold text-white flex items-center gap-1 transition-all"
                  >
                    <Plus className="w-3 h-3" /> Add Card
                  </button>
                </div>

                <div className="space-y-2">
                  {infographicFeatures.map((feature, idx) => (
                    <div key={feature.id} className="border border-slate-850 rounded-xl overflow-hidden bg-slate-900/30">
                      {infographicEditingIndex === idx ? (
                        <div className="p-4 space-y-3 bg-[#0c101d] border-t-2" style={{ borderColor: infographicCustomAccent }}>
                          <div className="flex items-center justify-between pb-1.5 border-b border-slate-850">
                            <span className="text-xs font-bold text-slate-300">Editing Block #{feature.num}</span>
                            <div className="flex gap-2">
                              <button onClick={() => setInfographicEditingIndex(null)} className="text-[10px] px-2 py-0.5 text-slate-400">Cancel</button>
                              <button onClick={infographicSaveEdit} className="text-[10px] px-2.5 py-0.5 bg-indigo-600 text-white rounded font-bold">Save</button>
                            </div>
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-400 block mb-0.5">Title Name</label>
                            <input 
                              type="text" 
                              value={infographicEditBuffer.title}
                              onChange={(e) => infographicHandleEditChange('title', e.target.value)}
                              className="w-full px-2 py-1 bg-slate-900 border border-slate-850 rounded text-xs text-white focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-400 block mb-0.5">Tagline Accent</label>
                            <input 
                              type="text" 
                              value={infographicEditBuffer.subtitle}
                              onChange={(e) => infographicHandleEditChange('subtitle', e.target.value)}
                              className="w-full px-2 py-1 bg-slate-900 border border-slate-850 rounded text-xs text-white focus:outline-none"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-400 block mb-0.5">Runnable Code</label>
                            <textarea 
                              rows={5}
                              value={infographicEditBuffer.code}
                              onChange={(e) => infographicHandleEditChange('code', e.target.value)}
                              className="w-full px-2 py-1.5 bg-slate-900 border border-slate-850 rounded text-[11px] font-mono text-emerald-300 leading-relaxed focus:outline-none"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-400 block">Usage/Use Cases</label>
                            {infographicEditBuffer.scenarios.map((sc, scIdx) => (
                              <input 
                                key={scIdx}
                                type="text" 
                                value={sc}
                                onChange={(e) => infographicHandleScenarioChange(scIdx, e.target.value)}
                                className="w-full px-2 py-1 bg-slate-900 border border-slate-850 rounded text-xs text-slate-300 focus:outline-none"
                              />
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className={`w-full p-3 hover:bg-slate-850/30 transition-all flex items-center justify-between ${feature.selected === false ? 'opacity-50' : ''}`}>
                          <div className="flex items-center gap-2.5">
                            <input 
                              type="checkbox"
                              checked={feature.selected !== false}
                              onChange={() => infographicToggleSelectBlock(idx)}
                              className="w-3.5 h-3.5 rounded border-slate-850 bg-slate-950 text-indigo-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-indigo-600"
                              title={feature.selected !== false ? "Deselect Card (Exclude from preview)" : "Select Card (Include in preview)"}
                            />
                            <div className="w-5.5 h-5.5 rounded-md flex items-center justify-center font-mono font-semibold text-[10px]" style={{ backgroundColor: `${infographicCustomAccent}15`, color: infographicCustomAccent }}>
                              0{feature.num}
                            </div>
                            <span className={`text-xs font-bold ${feature.selected === false ? 'text-slate-500 line-through' : 'text-slate-200'}`}>{feature.title}</span>
                          </div>
                          
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => infographicMoveBlock(idx, 'up')}
                              disabled={idx === 0}
                              className="p-1 rounded bg-slate-950 border border-slate-850 text-slate-400 hover:text-white disabled:opacity-25"
                              title="Move Block Up"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => infographicMoveBlock(idx, 'down')}
                              disabled={idx === infographicFeatures.length - 1}
                              className="p-1 rounded bg-slate-950 border border-slate-850 text-slate-400 hover:text-white disabled:opacity-25"
                              title="Move Block Down"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => infographicStartEditing(idx)}
                              className="text-[10px] px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-indigo-400 hover:text-indigo-300"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => infographicRemoveBlock(idx)}
                              disabled={infographicFeatures.length <= 1}
                              className="text-[10px] px-2 py-0.5 bg-slate-950 border border-slate-800 rounded text-red-400 hover:text-red-300 disabled:opacity-25"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Right Side: Render Sandbox & Canvas Workspace */}
            <div className="lg:col-span-7 flex flex-col items-center justify-start gap-6">
              
              {/* Slides Nav Header */}
              <div className="w-full bg-[#0b0f19]/90 border border-slate-850 rounded-xl p-3 flex flex-wrap gap-4 items-center justify-between shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 bg-slate-950 rounded border border-slate-850">
                    Mode: {infographicLayout === 'infographic' ? 'Continuous Poster' : `Slide ${infographicActiveSlide + 1}/${activeInfographicFeatures.length + 1}`}
                  </span>
                </div>

                {infographicLayout === 'carousel' && (
                  <div className="flex items-center gap-1.5">
                    <button
                      disabled={infographicActiveSlide === 0}
                      onClick={() => setInfographicActiveSlide(prev => Math.max(0, prev - 1))}
                      className="p-1 rounded-lg border border-slate-800 hover:border-slate-700 disabled:opacity-30 text-slate-300 bg-slate-950"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold text-slate-300 px-1">
                      {infographicActiveSlide + 1} / {activeInfographicFeatures.length + 1}
                    </span>
                    <button
                      disabled={infographicActiveSlide === activeInfographicFeatures.length}
                      onClick={() => setInfographicActiveSlide(prev => Math.min(activeInfographicFeatures.length, prev + 1))}
                      className="p-1 rounded-lg border border-slate-800 hover:border-slate-700 disabled:opacity-30 text-slate-300 bg-slate-950"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button onClick={() => setInfographicZoom(z => Math.max(30, z - 10))} className="p-1 hover:bg-slate-850 rounded text-slate-400 hover:text-white">
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-slate-400 w-10 text-center">{infographicZoom}%</span>
                  <button onClick={() => setInfographicZoom(z => Math.min(100, z + 10))} className="p-1 hover:bg-slate-850 rounded text-slate-400 hover:text-white">
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Output Preview Canvas */}
              <div className="border border-slate-800 rounded-3xl bg-slate-950 p-6 flex justify-center w-full min-h-[500px] overflow-hidden">
                <div 
                  className="transition-all duration-300 origin-top flex justify-center h-fit" 
                  style={{ transform: `scale(${infographicZoom / 100})` }}
                >
                  {/* Infographic Tall Format */}
                  {infographicLayout === 'infographic' && (
                    <div 
                      id="infographic-preview"
                      className={`w-[600px] py-12 px-10 relative flex flex-col justify-start rounded-2xl shadow-2xl transition-all duration-300 bg-gradient-to-br ${infographicTheme.gradient} ${infographicFont.class}`}
                    >
                      {/* Visual Ambient Light glow */}
                      <div 
                        className="absolute top-20 left-20 w-80 h-80 rounded-full blur-[140px] opacity-[0.14] pointer-events-none"
                        style={{ backgroundColor: infographicCustomAccent }}
                      />

                      {/* Cover Main Heading */}
                      <header className="mb-10 border-b border-slate-800/80 pb-6 relative">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-slate-400">
                            {infographicCategory}
                          </span>
                        </div>

                        <h1 className="text-[26px] font-extrabold tracking-tight leading-none mb-3 text-white">
                          {infographicTitle}
                        </h1>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
                          {infographicSubtitle}
                        </p>

                        <div className="absolute top-2 right-0 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: infographicCustomAccent }} />
                          <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">PRO CHEATSHEET</span>
                        </div>
                      </header>

                      {/* Features stack list */}
                      <div className="space-y-8">
                        {activeInfographicFeatures.map((feature, idx) => {
                          const originalIdx = infographicFeatures.findIndex(f => f.id === feature.id);
                          return (
                            <article 
                              key={feature.id} 
                              className={`p-5 rounded-xl border transition-all relative ${infographicTheme.cardBg}`}
                            >
                              <button 
                                onClick={() => infographicStartEditing(originalIdx)}
                                className="edit-overlay-btn absolute top-3 right-3 text-[10px] py-1 px-2 bg-slate-900 border border-slate-800 hover:border-slate-750 rounded text-slate-400 hover:text-white flex items-center gap-1"
                              >
                                <Edit3 className="w-3 h-3" /> Edit
                              </button>

                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <div className="text-[9px] font-extrabold tracking-[0.18em] mb-1 uppercase" style={{ color: infographicCustomAccent }}>
                                    {feature.subtitle}
                                  </div>
                                  <h3 className="text-lg font-extrabold text-white">{feature.title}</h3>
                                </div>
                                <span 
                                  className="text-2.5xl font-mono font-black opacity-40 select-none"
                                  style={{ color: infographicCustomAccent }}
                                >
                                  0{idx + 1}
                                </span>
                              </div>

                              {/* Code Block Container */}
                              <div className="rounded-lg overflow-hidden bg-slate-950/90 border border-slate-850/80 p-3.5 mb-3.5">
                                <pre className="text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre leading-relaxed select-all">
                                  {feature.code}
                                </pre>
                              </div>

                              {/* Scenario Bullets */}
                              <div>
                                <h4 className="text-[9px] uppercase font-bold tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
                                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: infographicCustomAccent }} />
                                  Key Use Cases & Scenarios
                                </h4>
                                <ul className="space-y-1.5">
                                  {feature.scenarios.map((scenario, sIdx) => (
                                    <li key={sIdx} className="flex items-start gap-2 text-xs text-slate-400 font-sans">
                                      <span className="text-[10px] mt-0.5 font-bold px-1 rounded font-mono" style={{ backgroundColor: `${infographicCustomAccent}12`, color: infographicCustomAccent }}>
                                        {sIdx + 1}
                                      </span>
                                      <span className="leading-relaxed">{scenario}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </article>
                          );
                        })}
                      </div>

                      <footer className="mt-12 border-t border-slate-900 pt-6 flex items-center justify-between text-[10px] text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-850 border border-slate-800 flex items-center justify-center font-bold text-white text-[8px]">★</span>
                          <span>{infographicFooterBrand}</span>
                        </div>
                        <div>Like, share & save this infographic</div>
                      </footer>
                    </div>
                  )}

                  {/* Slide Carousel mode */}
                  {infographicLayout === 'carousel' && (() => {
                    const layoutStyles = getSlideLayoutStyles(infographicAspect);
                    return (
                      <div 
                        id={`slide-preview-${infographicActiveSlide}`}
                        className={`${layoutStyles.padding} relative flex flex-col justify-between rounded-2xl shadow-2xl transition-all duration-300 bg-gradient-to-br ${infographicTheme.gradient} ${infographicFont.class}`}
                        style={{
                          width: infographicAspect === 'square' ? '540px' : infographicAspect === 'landscape' ? '640px' : '540px',
                          height: infographicAspect === 'square' ? '540px' : infographicAspect === 'landscape' ? '360px' : '675px',
                        }}
                      >
                        <div 
                          className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full blur-[130px] opacity-[0.12] pointer-events-none"
                          style={{ backgroundColor: infographicCustomAccent }}
                        />

                        {/* Slides type index cover */}
                        {infographicActiveSlide === 0 && (
                          <div className="flex-1 flex flex-col justify-between h-full relative">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: infographicCustomAccent }} />
                                <span className="text-[10px] tracking-[0.2em] font-extrabold text-slate-400 uppercase">{infographicCategory}</span>
                              </div>
                              <span className="text-[10px] font-mono text-slate-500">1 of {activeInfographicFeatures.length + 1}</span>
                            </div>

                            <div className="my-auto space-y-3">
                              <h2 className={`${layoutStyles.coverTitle} text-white leading-tight`}>
                                {infographicTitle}
                              </h2>
                              <p className={`${layoutStyles.coverSubtitle} text-slate-400 max-w-sm`}>
                                {infographicSubtitle}
                              </p>
                            </div>

                            <div className={`flex items-center justify-between text-xs ${layoutStyles.footerSpace}`}>
                              <span className="text-slate-400 font-semibold flex items-center gap-1">Swipe to start</span>
                              <span className="font-extrabold tracking-wider animate-pulse" style={{ color: infographicCustomAccent }}>NEXT SLIDE →</span>
                            </div>
                          </div>
                        )}

                        {/* Individual Slide detail pages */}
                        {infographicActiveSlide > 0 && infographicActiveSlide <= activeInfographicFeatures.length && (() => {
                          const feature = activeInfographicFeatures[infographicActiveSlide - 1];
                          if (!feature) return null;
                          const originalIdx = infographicFeatures.findIndex(f => f.id === feature.id);
                          return (
                            <div className="flex-1 flex flex-col justify-between h-full relative">
                              <button 
                                onClick={() => infographicStartEditing(originalIdx)}
                                className="edit-overlay-btn absolute top-0 right-12 text-[10px] py-1 px-2 bg-slate-900 border border-slate-800 hover:border-slate-750 rounded text-slate-400 hover:text-white"
                              >
                                Edit Text
                              </button>

                              <div className="flex items-center justify-between">
                                <span className={`${layoutStyles.subtitle}`} style={{ color: infographicCustomAccent }}>
                                  {feature.subtitle}
                                </span>
                                <span className="text-[10px] font-mono text-slate-500">{infographicActiveSlide + 1} of {activeInfographicFeatures.length + 1}</span>
                              </div>

                              <div className={`my-auto ${layoutStyles.bodySpace}`}>
                                <div className="flex items-center justify-between">
                                  <h3 className={`${layoutStyles.title} text-white tracking-tight`}>{feature.title}</h3>
                                  <span className={`${layoutStyles.slideNumber} opacity-35`} style={{ color: infographicCustomAccent }}>0{infographicActiveSlide}</span>
                                </div>

                                {/* Slide code syntax block */}
                                <div className={`rounded-lg overflow-hidden bg-slate-950/95 border border-slate-850/80 ${layoutStyles.codeContainer}`}>
                                  <pre className={`${layoutStyles.codeText} font-mono text-slate-300 overflow-x-auto whitespace-pre leading-relaxed`}>
                                    {feature.code}
                                  </pre>
                                </div>

                                {/* Targeted production use case list */}
                                <div className={`${layoutStyles.scenarioSpace}`}>
                                  <h4 className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Key Scenarios</h4>
                                  <ul className="space-y-1">
                                    {feature.scenarios.map((scenario, sIdx) => (
                                      <li key={sIdx} className={`flex items-start gap-2 ${layoutStyles.scenarioText} text-slate-400`}>
                                        <span className="text-xs font-mono font-bold" style={{ color: infographicCustomAccent }}>•</span>
                                        <span className="font-sans">{scenario}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className={`flex items-center justify-between text-[10px] text-slate-500 ${layoutStyles.footerSpace}`}>
                                <span>{infographicFooterBrand}</span>
                                <span className="font-bold uppercase tracking-wider" style={{ color: infographicCustomAccent }}>
                                  {infographicActiveSlide === activeInfographicFeatures.length ? 'FINISH' : 'SWIPE NEXT →'}
                                </span>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Hidden Infographic Slide Export Container */}
              {infographicLayout === 'carousel' && (
                <div 
                  style={{ 
                    position: 'absolute', 
                    top: '-99999px', 
                    left: '-99999px', 
                    pointerEvents: 'none', 
                    zIndex: -9999 
                  }}
                >
                  {Array.from({ length: activeInfographicFeatures.length + 1 }).map((_, slideIdx) => {
                    const layoutStyles = getSlideLayoutStyles(infographicAspect);
                    return (
                      <div 
                        key={slideIdx}
                        id={`infographic-slide-export-${slideIdx}`}
                        className={`${layoutStyles.padding} relative flex flex-col justify-between rounded-2xl shadow-2xl bg-gradient-to-br ${infographicTheme.gradient} ${infographicFont.class}`}
                        style={{
                          width: infographicAspect === 'square' ? '540px' : infographicAspect === 'landscape' ? '640px' : '540px',
                          height: infographicAspect === 'square' ? '540px' : infographicAspect === 'landscape' ? '360px' : '675px',
                        }}
                      >
                        <div 
                          className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full blur-[130px] opacity-[0.12] pointer-events-none"
                          style={{ backgroundColor: infographicCustomAccent }}
                        />

                        {slideIdx === 0 && (
                          <div className="flex-1 flex flex-col justify-between h-full relative">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: infographicCustomAccent }} />
                                <span className="text-[10px] tracking-[0.2em] font-extrabold text-slate-400 uppercase">{infographicCategory}</span>
                              </div>
                              <span className="text-[10px] font-mono text-slate-500">1 of {activeInfographicFeatures.length + 1}</span>
                            </div>

                            <div className="my-auto space-y-3">
                              <h2 className={`${layoutStyles.coverTitle} text-white leading-tight`}>
                                {infographicTitle}
                              </h2>
                              <p className={`${layoutStyles.coverSubtitle} text-slate-400 max-w-sm`}>
                                {infographicSubtitle}
                              </p>
                            </div>

                            <div className={`flex items-center justify-between text-xs ${layoutStyles.footerSpace}`}>
                              <span className="text-slate-400 font-semibold flex items-center gap-1">Swipe to start</span>
                              <span className="font-extrabold tracking-wider" style={{ color: infographicCustomAccent }}>NEXT SLIDE →</span>
                            </div>
                          </div>
                        )}

                        {slideIdx > 0 && (() => {
                          const feature = activeInfographicFeatures[slideIdx - 1];
                          if (!feature) return null;
                          return (
                            <div className="flex-1 flex flex-col justify-between h-full relative">
                              <div className="flex items-center justify-between">
                                <span className={`${layoutStyles.subtitle}`} style={{ color: infographicCustomAccent }}>
                                  {feature.subtitle}
                                </span>
                                <span className="text-[10px] font-mono text-slate-500">{slideIdx + 1} of {activeInfographicFeatures.length + 1}</span>
                              </div>

                              <div className={`my-auto ${layoutStyles.bodySpace}`}>
                                <div className="flex items-center justify-between">
                                  <h3 className={`${layoutStyles.title} text-white tracking-tight`}>{feature.title}</h3>
                                  <span className={`${layoutStyles.slideNumber} opacity-35`} style={{ color: infographicCustomAccent }}>0{slideIdx}</span>
                                </div>

                                <div className={`rounded-lg overflow-hidden bg-slate-950/95 border border-slate-850/80 ${layoutStyles.codeContainer}`}>
                                  <pre className={`${layoutStyles.codeText} font-mono text-slate-300 overflow-x-auto whitespace-pre leading-relaxed`}>
                                    {feature.code}
                                  </pre>
                                </div>

                                <div className={`${layoutStyles.scenarioSpace}`}>
                                  <h4 className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Key Scenarios</h4>
                                  <ul className="space-y-1">
                                    {feature.scenarios.map((scenario, sIdx) => (
                                      <li key={sIdx} className={`flex items-start gap-2 ${layoutStyles.scenarioText} text-slate-400 font-sans`}>
                                        <span className="text-xs font-mono font-bold" style={{ color: infographicCustomAccent }}>•</span>
                                        <span className="font-sans">{scenario}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className={`flex items-center justify-between text-[10px] text-slate-500 ${layoutStyles.footerSpace}`}>
                                <span>{infographicFooterBrand}</span>
                                <span className="font-bold uppercase tracking-wider" style={{ color: infographicCustomAccent }}>
                                  {slideIdx === activeInfographicFeatures.length ? 'FINISH' : 'SWIPE NEXT →'}
                                </span>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}

        {/* ========================================== */}
        {/* --- TAB CONTENT: POST FORMATTER --- */}
        {/* ========================================== */}
        {activeTab === 'post' && (
          <>
            {/* LEFT INPUT SECTION (6 Cols) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Template quick loader */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-500" />
                  Select A Post Framework
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {LINKEDIN_POST_TEMPLATES.map((tmpl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPostText(tmpl.text)}
                      className="p-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl text-left text-xs font-semibold leading-snug transition-all"
                    >
                      {tmpl.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Editor Textbox */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col h-[520px]">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Type className="w-4 h-4 text-violet-500" />
                    Write Post Content
                  </span>
                  
                  {/* Unicode controls */}
                  <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => handleUnicodeFormat('bold')}
                      className="p-2 hover:bg-slate-900 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-all flex items-center gap-1"
                      title="Convert Selected Text to Unicode Bold"
                    >
                      <Bold className="w-3.5 h-3.5" />
                      Bold
                    </button>
                    <button
                      onClick={() => handleUnicodeFormat('italic')}
                      className="p-2 hover:bg-slate-900 rounded-lg text-xs font-semibold italic text-slate-300 hover:text-white transition-all flex items-center gap-1"
                      title="Convert Selected Text to Unicode Italic"
                    >
                      <Italic className="w-3.5 h-3.5" />
                      Italic
                    </button>
                    <button
                      onClick={() => handleUnicodeFormat('monospace')}
                      className="p-2 hover:bg-slate-900 rounded-lg text-xs font-mono text-slate-300 hover:text-white transition-all"
                      title="Convert Selected Text to Monospace"
                    >
                      Mono
                    </button>
                    <button
                      onClick={() => handleUnicodeFormat('script')}
                      className="p-2 hover:bg-slate-900 rounded-lg text-xs text-slate-300 hover:text-white transition-all"
                      title="Convert Selected Text to Script Style"
                    >
                      Script
                    </button>
                  </div>
                </div>

                {/* Text area */}
                <textarea
                  ref={textareaRef}
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  placeholder="Type your LinkedIn post here. Highlight text and click 'Bold' or 'Italic' formatting tools above to apply styling!"
                  className="w-full flex-1 bg-transparent border-0 resize-none text-slate-200 focus:outline-none focus:ring-0 text-base leading-relaxed"
                />

                {/* Counter & helper details */}
                <div className="flex items-center justify-between border-t border-slate-800/80 pt-3 text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <span>Characters: <b className="text-slate-300">{postText.length}</b> / 3000</span>
                    <span>Words: <b className="text-slate-300">{postText.split(/\s+/).filter(Boolean).length}</b></span>
                  </div>
                  <button
                    onClick={() => setPostText('')}
                    className="hover:text-red-400 transition-all font-medium"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT PREVIEW SECTION (6 Cols) */}
            <div className="lg:col-span-6 space-y-6 flex flex-col items-center">
              
              {/* Preview controls */}
              <div className="w-full bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Preview Device:</span>
                  <div className="flex p-0.5 bg-slate-950 rounded-lg border border-slate-800">
                    <button
                      onClick={() => setPreviewDevice('desktop')}
                      className={`p-1.5 rounded-md text-xs font-semibold transition-all ${
                        previewDevice === 'desktop' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setPreviewDevice('mobile')}
                      className={`p-1.5 rounded-md text-xs font-semibold transition-all ${
                        previewDevice === 'mobile' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handlePostCopy}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 hover:text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95"
                >
                  <Copy className="w-4 h-4" />
                  Copy Post Text
                </button>
              </div>

              {/* Feed Card Mockup */}
              <div className="w-full flex items-center justify-center p-4 bg-slate-950/20 border border-slate-800/60 rounded-3xl">
                <div 
                  className={`bg-white text-slate-900 rounded-lg shadow-xl border border-slate-200 select-none ${
                    previewDevice === 'mobile' ? 'w-[360px]' : 'w-full max-w-[552px]'
                  } transition-all duration-300`}
                >
                  {/* LinkedIn Post Header */}
                  <div className="p-4 flex items-start justify-between">
                    <div className="flex gap-3">
                      {profilePic ? (
                        <img src={profilePic} alt="Author" className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-lg">
                          {profileName.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 hover:underline cursor-pointer flex items-center gap-1.5">
                          {profileName || 'Your Name'}
                          <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-600 font-semibold">1st</span>
                        </h4>
                        <p className="text-[11px] text-slate-500 leading-snug line-clamp-1">
                          {profileHeadline || 'Your Professional Headline'}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                          1h • Edited • 🌐
                        </p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      •••
                    </button>
                  </div>

                  {/* LinkedIn Post content */}
                  <div className="px-4 pb-4 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap font-sans break-words">
                    {postText || 'Post content will preview here...'}
                  </div>

                  {/* LinkedIn Reactions bar */}
                  <div className="px-4 py-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <span className="flex -space-x-1">
                        <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[9px] text-white">👍</span>
                        <span className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[9px] text-white">❤️</span>
                        <span className="w-4 h-4 rounded-full bg-yellow-500 flex items-center justify-center text-[9px] text-white">👏</span>
                      </span>
                      <span>42 reactions</span>
                    </div>
                    <div className="hover:underline cursor-pointer">
                      5 comments • 2 reposts
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="border-t border-slate-100 py-1 px-2 flex items-center justify-around text-xs font-semibold text-slate-600">
                    <button className="flex items-center gap-2 py-2 px-3 hover:bg-slate-100 rounded-md transition-all">
                      <span>👍</span> Like
                    </button>
                    <button className="flex items-center gap-2 py-2 px-3 hover:bg-slate-100 rounded-md transition-all">
                      <span>💬</span> Comment
                    </button>
                    <button className="flex items-center gap-2 py-2 px-3 hover:bg-slate-100 rounded-md transition-all">
                      <span>🔁</span> Repost
                    </button>
                    <button className="flex items-center gap-2 py-2 px-3 hover:bg-slate-100 rounded-md transition-all">
                      <span>✉️</span> Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

      </main>

      {/* Footer Info */}
      <footer className="py-6 border-t border-slate-900/60 bg-slate-950/40 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 LinkedIn Creator Studio. Offline Standalone Application.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              Tailwind CSS Configured
            </span>
            <span>•</span>
            <span className="text-slate-400 font-semibold">LinkedIn Content Hub Mode</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
