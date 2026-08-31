import React from 'react';
import { Laugh, Volume2, VolumeX, Bookmark, Sparkles, Smile } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface HeaderProps {
  favoriteCount: number;
  onOpenFavorites: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  jokeCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  favoriteCount,
  onOpenFavorites,
  soundEnabled,
  onToggleSound,
  jokeCount
}) => {
  return (
    <header className="w-full bg-[#050505]/90 backdrop-blur-md border-b border-[#FACC15]/20 sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FACC15] text-[#050505] flex items-center justify-center font-black rounded-xs shadow-[3px_3px_0px_#FFFFFF]">
            <Laugh className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              CHUCKLE<span className="text-[#FACC15]">BOX</span>
              <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-xs bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/40 tracking-widest uppercase">
                <Sparkles className="w-3 h-3 text-[#FACC15]" />
                VOLUME 01
              </span>
            </h1>
            <p className="text-[11px] text-zinc-400 font-mono tracking-wider uppercase hidden sm:block">
              ESTABLISHED 2026 • DAILY HUMOR RIOT
            </p>
          </div>
        </div>

        {/* Header Action Controls */}
        <div className="flex items-center gap-3">
          {/* Joke Count badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#141414] text-zinc-300 text-xs font-mono border border-zinc-800 rounded-xs">
            <Smile className="w-4 h-4 text-[#FACC15]" />
            <span>JOKES: <strong className="text-white font-bold">{jokeCount}</strong></span>
          </div>

          {/* Mute / Unmute Button */}
          <button
            onClick={() => {
              onToggleSound();
              soundFx.playClick();
            }}
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            className={`px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all duration-150 border flex items-center gap-1.5 cursor-pointer ${
              soundEnabled
                ? 'bg-[#FACC15] text-[#050505] border-[#FACC15] hover:bg-yellow-300'
                : 'bg-[#141414] text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
            }`}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-4 h-4" />
                <span className="hidden md:inline">SOUND ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden md:inline">MUTED</span>
              </>
            )}
          </button>

          {/* Saved Favorites Button */}
          <button
            onClick={() => {
              onOpenFavorites();
              soundFx.playClick();
            }}
            className="px-3.5 py-1.5 bg-white hover:bg-zinc-100 text-[#050505] text-xs font-black uppercase tracking-wider transition-all duration-150 flex items-center gap-2 cursor-pointer brutalist-shadow-yellow"
          >
            <Bookmark className="w-4 h-4 fill-[#050505]" />
            <span className="hidden sm:inline">SAVED</span>
            {favoriteCount > 0 && (
              <span className="px-1.5 py-0.2 bg-[#050505] text-[#FACC15] font-extrabold text-[10px]">
                {favoriteCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

