import React from 'react';
import { Joke } from '../types';
import { X, Trash2, Download, Bookmark, Sparkles, Copy, Check } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface SavedJokesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Joke[];
  onRemoveFavorite: (jokeId: string) => void;
  onClearAll: () => void;
}

export const SavedJokesModal: React.FC<SavedJokesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onClearAll
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (joke: Joke) => {
    const text = joke.type === 'twopart' ? `${joke.setup} - ${joke.delivery}` : joke.joke || '';
    navigator.clipboard.writeText(text);
    setCopiedId(joke.id);
    soundFx.playClick();
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleExportText = () => {
    const content = favorites
      .map((j, i) => `${i + 1}. [${j.category}] ${j.type === 'twopart' ? `${j.setup}\nAnswer: ${j.delivery}` : j.joke}`)
      .join('\n\n-------------------------------\n\n');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-favorite-jokes.txt';
    a.click();
    URL.revokeObjectURL(url);
    soundFx.playClick();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0a0a0a] w-full max-w-2xl border-2 border-[#FACC15] shadow-[12px_12px_0px_#FFFFFF] overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#050505] text-white flex items-center justify-between border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#FACC15] fill-[#FACC15]" />
            <h2 className="text-base font-black uppercase tracking-wider">SAVED FAVORITE JOKES ({favorites.length})</h2>
          </div>
          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {favorites.length === 0 ? (
            <div className="py-12 text-center text-zinc-400 space-y-3 font-mono">
              <Sparkles className="w-10 h-10 text-[#FACC15] mx-auto opacity-80" />
              <p className="font-bold text-base uppercase text-white">NO SAVED JOKES YET!</p>
              <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                Click the bookmark icon on any joke to save your favorite punchlines here.
              </p>
            </div>
          ) : (
            favorites.map((joke) => (
              <div
                key={joke.id}
                className="p-4 bg-[#141414] border border-zinc-800 hover:border-[#FACC15]/60 transition-all space-y-2 relative group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black px-2 py-0.5 bg-[#FACC15] text-[#050505] uppercase tracking-wider">
                    {joke.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCopy(joke)}
                      className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                      title="Copy joke text"
                    >
                      {copiedId === joke.id ? (
                        <Check className="w-4 h-4 text-[#FACC15]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => {
                        onRemoveFavorite(joke.id);
                        soundFx.playClick();
                      }}
                      className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {joke.type === 'twopart' ? (
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white">"{joke.setup}"</p>
                    <p className="text-sm font-serif italic text-[#FACC15]">➜ {joke.delivery}</p>
                  </div>
                ) : (
                  <p className="text-sm font-bold text-white">"{joke.joke}"</p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Modal Footer Actions */}
        {favorites.length > 0 && (
          <div className="p-4 bg-[#050505] border-t border-zinc-800 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                onClearAll();
                soundFx.playClick();
              }}
              className="text-xs font-mono font-bold uppercase text-red-400 hover:text-red-300 hover:underline cursor-pointer"
            >
              CLEAR ALL
            </button>
            <button
              onClick={handleExportText}
              className="px-4 py-2 bg-[#FACC15] hover:bg-yellow-300 text-[#050505] font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer brutalist-shadow-white"
            >
              <Download className="w-4 h-4" />
              <span>EXPORT (.TXT)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

