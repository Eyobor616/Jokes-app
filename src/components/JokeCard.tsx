import React, { useState, useEffect } from 'react';
import { Joke } from '../types';
import { Bookmark, Copy, Check, Volume2, VolumeX, Eye, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface JokeCardProps {
  joke: Joke | null;
  loading: boolean;
  autoReveal: boolean;
  isFavorite: boolean;
  onToggleFavorite: (joke: Joke) => void;
  onNextJoke: () => void;
}

export const JokeCard: React.FC<JokeCardProps> = ({
  joke,
  loading,
  autoReveal,
  isFavorite,
  onToggleFavorite,
  onNextJoke
}) => {
  const [revealed, setRevealed] = useState(autoReveal);
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [reaction, setReaction] = useState<'hilarious' | 'good' | 'groan' | null>(null);

  // Reset state when joke changes
  useEffect(() => {
    setRevealed(autoReveal);
    setCopied(false);
    setReaction(null);
    soundFx.stopSpeech();
    setSpeaking(false);
  }, [joke, autoReveal]);

  if (loading) {
    return (
      <div className="w-full bg-[#0a0a0a] border-2 border-[#FACC15]/30 p-8 sm:p-12 flex flex-col items-center justify-center min-h-[340px] text-center animate-pulse relative overflow-hidden">
        <div className="w-14 h-14 bg-[#FACC15] text-[#050505] flex items-center justify-center font-black mb-6 shadow-[4px_4px_0px_#FFFFFF]">
          <Sparkles className="w-8 h-8 animate-spin" />
        </div>
        <div className="h-8 w-3/4 bg-zinc-800 mb-4"></div>
        <div className="h-6 w-1/2 bg-zinc-900 mb-8"></div>
        <p className="text-[#FACC15] font-mono text-xs uppercase tracking-widest">LOADING HIGH-VOLTAGE HUMOR...</p>
      </div>
    );
  }

  if (!joke) {
    return (
      <div className="w-full bg-[#0a0a0a] border-2 border-[#FACC15] p-8 sm:p-12 text-center">
        <p className="text-zinc-300 font-bold text-lg mb-4">No joke loaded yet.</p>
        <button
          onClick={onNextJoke}
          className="px-8 py-4 bg-[#FACC15] text-[#050505] font-black text-lg uppercase tracking-wider brutalist-shadow-white cursor-pointer"
        >
          HIT ME AGAIN →
        </button>
      </div>
    );
  }

  const handleReveal = () => {
    if (!revealed) {
      setRevealed(true);
      soundFx.playRimshot();
    }
  };

  const handleCopy = () => {
    const textToCopy = joke.type === 'twopart'
      ? `${joke.setup}\n\n... ${joke.delivery}`
      : joke.joke || '';

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    soundFx.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTextToSpeech = () => {
    if (speaking) {
      soundFx.stopSpeech();
      setSpeaking(false);
    } else {
      setSpeaking(true);
      const fullText = joke.type === 'twopart'
        ? `${joke.setup}. ... ... ${joke.delivery}`
        : joke.joke || '';

      soundFx.speak(fullText, () => setSpeaking(false));
    }
  };

  const handleReaction = (type: 'hilarious' | 'good' | 'groan') => {
    setReaction(type);
    soundFx.playRimshot();
  };

  return (
    <article className="w-full bg-[#050505] border-2 border-[#FACC15]/40 p-6 sm:p-10 relative overflow-hidden shadow-[12px_12px_0px_rgba(250,204,21,0.08)] transition-all">
      {/* Massive Background Quote Mark */}
      <span className="absolute top-[-30px] left-[20px] text-[220px] sm:text-[300px] font-black text-[#FACC15]/[0.04] pointer-events-none select-none font-serif leading-none z-0">
        “
      </span>

      {/* Decorative Dot Grid */}
      <div className="absolute bottom-6 right-6 hidden sm:grid grid-cols-4 gap-2 z-0 opacity-40">
        {[...Array(11)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-[#FACC15]/30"></div>
        ))}
        <div className="w-2 h-2 rounded-full bg-[#FACC15]"></div>
      </div>

      {/* Category & Action Bar Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800 relative z-10">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-[11px] font-black tracking-widest text-[#FACC15] uppercase border border-[#FACC15]/30 bg-[#141414]">
            {joke.category}
          </span>
          <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
            SOURCE: {joke.source.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Read Aloud Button */}
          <button
            onClick={handleTextToSpeech}
            title={speaking ? 'Stop Speech' : 'Read Joke Aloud'}
            className={`p-2 transition-colors cursor-pointer border ${
              speaking
                ? 'bg-[#FACC15] text-[#050505] border-[#FACC15] animate-pulse'
                : 'bg-[#141414] text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
            }`}
          >
            {speaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Copy Joke Button */}
          <button
            onClick={handleCopy}
            title="Copy Joke Text"
            className="p-2 bg-[#141414] text-zinc-400 border border-zinc-800 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-[#FACC15]" /> : <Copy className="w-4 h-4" />}
          </button>

          {/* Favorite / Bookmark Button */}
          <button
            onClick={() => {
              onToggleFavorite(joke);
              soundFx.playClick();
            }}
            title={isFavorite ? 'Remove from Saved' : 'Save Favorite Joke'}
            className={`p-2 transition-all cursor-pointer border ${
              isFavorite
                ? 'bg-[#FACC15] text-[#050505] border-[#FACC15]'
                : 'bg-[#141414] text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-[#050505]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Joke Content */}
      <div className="my-6 min-h-[160px] flex flex-col justify-center relative z-10">
        {joke.type === 'twopart' ? (
          <div className="space-y-6">
            {/* Setup */}
            <div className="border-l-8 border-[#FACC15] pl-6 py-2">
              <p className="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
                "{joke.setup}"
              </p>
            </div>

            {/* Delivery / Punchline */}
            {revealed ? (
              <div className="ml-8 pt-4 border-t border-zinc-800/80 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-2 font-mono">
                  PUNCHLINE
                </span>
                <p className="font-serif italic text-2xl sm:text-3xl font-bold text-[#FACC15] leading-snug">
                  "{joke.delivery}"
                </p>
              </div>
            ) : (
              <div className="ml-8">
                <button
                  onClick={handleReveal}
                  className="w-full py-4 px-6 bg-[#141414] hover:bg-[#1a1a1a] border-2 border-dashed border-[#FACC15]/60 text-[#FACC15] font-black text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 transition-all cursor-pointer hover:border-[#FACC15]"
                >
                  <Eye className="w-5 h-5 text-[#FACC15]" />
                  <span>REVEAL PUNCHLINE 🎭</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Single Line Joke */
          <div className="border-l-8 border-[#FACC15] pl-6 py-2">
            <p className="text-2xl sm:text-4xl font-extrabold text-white leading-relaxed tracking-tight">
              "{joke.joke}"
            </p>
          </div>
        )}
      </div>

      {/* Reactions & Feedback Bar */}
      <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 mr-2">
            RATING:
          </span>
          
          <button
            onClick={() => handleReaction('hilarious')}
            className={`px-3 py-1.5 text-xs font-bold uppercase transition-all flex items-center gap-1.5 border cursor-pointer ${
              reaction === 'hilarious'
                ? 'bg-[#FACC15] text-[#050505] border-[#FACC15] font-black'
                : 'bg-[#141414] text-zinc-300 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            😂 <span>HILARIOUS</span>
          </button>

          <button
            onClick={() => handleReaction('good')}
            className={`px-3 py-1.5 text-xs font-bold uppercase transition-all flex items-center gap-1.5 border cursor-pointer ${
              reaction === 'good'
                ? 'bg-[#FACC15] text-[#050505] border-[#FACC15] font-black'
                : 'bg-[#141414] text-zinc-300 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            😊 <span>GOOD ONE</span>
          </button>

          <button
            onClick={() => handleReaction('groan')}
            className={`px-3 py-1.5 text-xs font-bold uppercase transition-all flex items-center gap-1.5 border cursor-pointer ${
              reaction === 'groan'
                ? 'bg-[#FACC15] text-[#050505] border-[#FACC15] font-black'
                : 'bg-[#141414] text-zinc-300 border-zinc-800 hover:border-zinc-700'
            }`}
          >
            🤦 <span>GROAN</span>
          </button>
        </div>

        {/* Quick Next Shortcut Info */}
        <div className="text-[11px] text-zinc-400 font-mono">
          [<kbd className="px-1.5 py-0.5 bg-[#141414] text-[#FACC15] font-mono text-[10px] border border-zinc-800">SPACE</kbd>] FOR NEXT
        </div>
      </div>
    </article>
  );
};

