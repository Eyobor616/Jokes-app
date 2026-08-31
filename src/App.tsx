import React, { useState, useEffect, useCallback } from 'react';
import { Joke, JokeCategory } from './types';
import { fetchNextJoke } from './services/jokeApi';
import { Header } from './components/Header';
import { JokeCard } from './components/JokeCard';
import { JokeControls } from './components/JokeControls';
import { SavedJokesModal } from './components/SavedJokesModal';
import { Footer } from './components/Footer';
import { soundFx } from './utils/audio';

export default function App() {
  const [currentJoke, setCurrentJoke] = useState<Joke | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<JokeCategory>('Any');
  const [safeMode, setSafeMode] = useState<boolean>(true);
  const [autoReveal, setAutoReveal] = useState<boolean>(false);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [jokeCount, setJokeCount] = useState<number>(0);
  const [favorites, setFavorites] = useState<Joke[]>(() => {
    try {
      const saved = localStorage.getItem('chucklebox_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chucklebox_favorites', JSON.stringify(favorites));
    } catch {
      // Storage error ignored
    }
  }, [favorites]);

  // Sync soundFx enabled status
  useEffect(() => {
    soundFx.enabled = soundEnabled;
  }, [soundEnabled]);

  // Fetch next joke
  const getNextJoke = useCallback(async (selectedCat: JokeCategory = category) => {
    setLoading(true);
    try {
      const joke = await fetchNextJoke(selectedCat, safeMode);
      setCurrentJoke(joke);
      setJokeCount(prev => prev + 1);
    } catch (err) {
      console.error('Failed to load joke:', err);
    } finally {
      setLoading(false);
    }
  }, [category, safeMode]);

  // Initial load on mount
  useEffect(() => {
    getNextJoke('Any');
  }, [getNextJoke]);

  // Category switch handler
  const handleSelectCategory = (newCategory: JokeCategory) => {
    setCategory(newCategory);
    getNextJoke(newCategory);
  };

  // Toggle favorite joke
  const handleToggleFavorite = (joke: Joke) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === joke.id);
      if (exists) {
        return prev.filter(f => f.id !== joke.id);
      } else {
        return [joke, ...prev];
      }
    });
  };

  const handleRemoveFavorite = (jokeId: string) => {
    setFavorites(prev => prev.filter(f => f.id !== jokeId));
  };

  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to clear all saved jokes?')) {
      setFavorites([]);
    }
  };

  // Keyboard shortcut listener for spacebar / 'n' key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keypresses inside input fields or textareas
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === 'Space' || e.key.toLowerCase() === 'n') {
        e.preventDefault();
        soundFx.playClick();
        getNextJoke();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [getNextJoke]);

  // Auto-play interval timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (autoPlay) {
      interval = setInterval(() => {
        getNextJoke();
      }, 8000); // New joke every 8 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoPlay, getNextJoke]);

  const isCurrentJokeFavorite = currentJoke ? favorites.some(f => f.id === currentJoke.id) : false;

  return (
    <div className="min-h-screen bg-[#050505] text-white flex font-sans selection:bg-[#FACC15] selection:text-[#050505]">
      {/* Signature Left Rail for Desktop */}
      <aside className="hidden lg:flex w-20 border-r-2 border-[#FACC15] bg-[#050505] flex-col items-center justify-between py-10 sticky top-0 h-screen select-none z-40">
        <div className="writing-vertical text-[#FACC15] text-xs font-black tracking-[0.3em] uppercase">
          ESTABLISHED 2026
        </div>
        <div className="writing-vertical text-[#FACC15] text-xs font-black tracking-[0.3em] uppercase">
          LAUGH MORE
        </div>
        <div className="writing-vertical text-[#FACC15] text-xs font-black tracking-[0.3em] uppercase">
          VOLUME 01
        </div>
      </aside>

      {/* Main Container Stage */}
      <div className="flex-1 flex flex-col min-h-screen bg-radial-artistic overflow-x-hidden">
        {/* Header */}
        <Header
          favoriteCount={favorites.length}
          onOpenFavorites={() => setIsFavoritesOpen(true)}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(prev => !prev)}
          jokeCount={jokeCount}
        />

        {/* Main Content Area */}
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 sm:py-12 flex flex-col justify-center">
          <JokeCard
            joke={currentJoke}
            loading={loading}
            autoReveal={autoReveal}
            isFavorite={isCurrentJokeFavorite}
            onToggleFavorite={handleToggleFavorite}
            onNextJoke={() => getNextJoke()}
          />

          <JokeControls
            category={category}
            onSelectCategory={handleSelectCategory}
            onNextJoke={() => getNextJoke()}
            loading={loading}
            safeMode={safeMode}
            onToggleSafeMode={() => setSafeMode(prev => !prev)}
            autoReveal={autoReveal}
            onToggleAutoReveal={() => setAutoReveal(prev => !prev)}
            autoPlay={autoPlay}
            onToggleAutoPlay={() => setAutoPlay(prev => !prev)}
          />
        </main>

        {/* Saved Favorites Drawer/Modal */}
        <SavedJokesModal
          isOpen={isFavoritesOpen}
          onClose={() => setIsFavoritesOpen(false)}
          favorites={favorites}
          onRemoveFavorite={handleRemoveFavorite}
          onClearAll={handleClearFavorites}
        />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
