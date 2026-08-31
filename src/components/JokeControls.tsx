import React from 'react';
import { JokeCategory } from '../types';
import { ArrowRight, RefreshCw, Filter, ShieldCheck, Zap, Play, Pause } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface JokeControlsProps {
  category: JokeCategory;
  onSelectCategory: (cat: JokeCategory) => void;
  onNextJoke: () => void;
  loading: boolean;
  safeMode: boolean;
  onToggleSafeMode: () => void;
  autoReveal: boolean;
  onToggleAutoReveal: () => void;
  autoPlay: boolean;
  onToggleAutoPlay: () => void;
}

const CATEGORIES: { id: JokeCategory; label: string; icon: string }[] = [
  { id: 'Any', label: 'All Comedy', icon: '✨' },
  { id: 'Nigerian', label: 'Nigerian & Naija', icon: '🇳🇬' },
  { id: 'Akpos', label: 'Akpos Classics', icon: '🎭' },
  { id: 'AfricanParents', label: 'African Parents', icon: '🌍' },
  { id: 'General', label: 'General Humor', icon: '😄' },
  { id: 'Programming', label: 'Coding & Tech', icon: '💻' },
  { id: 'Pun', label: 'Witty Puns', icon: '🥖' },
  { id: 'DadJokes', label: 'Dad Jokes', icon: '👨' },
  { id: 'ChuckNorris', label: 'Chuck Norris', icon: '🤠' },
];

export const JokeControls: React.FC<JokeControlsProps> = ({
  category,
  onSelectCategory,
  onNextJoke,
  loading,
  safeMode,
  onToggleSafeMode,
  autoReveal,
  onToggleAutoReveal,
  autoPlay,
  onToggleAutoPlay
}) => {
  const handleCategoryClick = (cat: JokeCategory) => {
    onSelectCategory(cat);
    soundFx.playClick();
  };

  return (
    <div className="w-full mt-8 space-y-6">
      {/* Massive Prominent NEXT JOKE Button */}
      <div className="flex justify-center">
        <button
          onClick={() => {
            soundFx.playClick();
            onNextJoke();
          }}
          disabled={loading}
          className="group relative w-full sm:w-auto min-w-[320px] py-5 px-10 bg-[#FACC15] hover:bg-yellow-300 text-[#050505] font-black text-xl uppercase tracking-wider brutalist-shadow-white active:translate-x-1 active:translate-y-1 transition-none flex items-center justify-center gap-4 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed border-2 border-[#FACC15]"
        >
          {loading ? (
            <>
              <RefreshCw className="w-6 h-6 animate-spin text-[#050505]" />
              <span>FETCHING...</span>
            </>
          ) : (
            <>
              <span>HIT ME AGAIN</span>
              <ArrowRight className="w-6 h-6 text-[#050505] group-hover:translate-x-1 transition-transform stroke-[3]" />
            </>
          )}
        </button>
      </div>

      {/* Category Pills Filter */}
      <div className="bg-[#0a0a0a] border border-zinc-800 p-5">
        <div className="flex items-center gap-2 mb-3 text-zinc-400 text-xs font-mono uppercase tracking-widest">
          <Filter className="w-3.5 h-3.5 text-[#FACC15]" />
          <span>FILTER CATEGORIES</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`px-4 py-2 text-xs font-black uppercase transition-all duration-150 flex items-center gap-2 cursor-pointer border ${
                category === cat.id
                  ? 'bg-[#FACC15] text-[#050505] border-[#FACC15] brutalist-shadow-white'
                  : 'bg-[#141414] text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Preferences Settings Bar */}
      <div className="bg-[#0a0a0a] border border-zinc-800 p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Auto-Reveal Punchline Toggle */}
        <label className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-zinc-300 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={autoReveal}
            onChange={() => {
              onToggleAutoReveal();
              soundFx.playClick();
            }}
            className="w-4 h-4 rounded-none accent-[#FACC15] bg-[#141414] border-zinc-700"
          />
          <Zap className="w-3.5 h-3.5 text-[#FACC15]" />
          <span>AUTO-REVEAL PUNCHLINE</span>
        </label>

        {/* Safe Mode Filter Toggle */}
        <label className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-zinc-300 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={safeMode}
            onChange={() => {
              onToggleSafeMode();
              soundFx.playClick();
            }}
            className="w-4 h-4 rounded-none accent-[#FACC15] bg-[#141414] border-zinc-700"
          />
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>SAFE MODE</span>
        </label>

        {/* Auto-Play Slideshow Toggle */}
        <button
          onClick={() => {
            onToggleAutoPlay();
            soundFx.playClick();
          }}
          className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5 border cursor-pointer ${
            autoPlay
              ? 'bg-[#FACC15] text-[#050505] border-[#FACC15] font-black animate-pulse'
              : 'bg-[#141414] text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
          }`}
        >
          {autoPlay ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>AUTO-PLAY ON (8S)</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>AUTO-PLAY SLIDESHOW</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

