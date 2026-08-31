export type JokeCategory = 'Any' | 'Nigerian' | 'Akpos' | 'AfricanParents' | 'General' | 'Programming' | 'Pun' | 'DadJokes' | 'ChuckNorris';

export interface Joke {
  id: string;
  category: string;
  type: 'single' | 'twopart';
  setup?: string;
  delivery?: string;
  joke?: string; // For single type jokes
  source: string;
  rating?: number;
  userReaction?: 'funny' | 'hilarious' | 'groan' | null;
}

export interface JokeFilterOptions {
  category: JokeCategory;
  safeMode: boolean;
  autoRevealPunchline: boolean;
}
