import { Joke, JokeCategory } from '../types';

// Curated collection of top-tier hilarious localized African, Nigerian, Akpos, and global jokes
const CURATED_JOKES: Joke[] = [
  {
    id: 'naija-1',
    category: 'Akpos Classic',
    type: 'twopart',
    setup: 'Teacher: Akpos, if you have 10 oranges and I ask you for 6, how many will you have left?',
    delivery: 'Akpos: I will still have 10 oranges sir, because I will refuse to give you any!',
    source: 'African Comedy Vault'
  },
  {
    id: 'naija-2',
    category: 'African Parents',
    type: 'twopart',
    setup: 'My African mom dropped her glass of water on the rug...',
    delivery: 'She turned to me angrily and shouted: "You see?! If you weren\'t always pressing your phone, this glass wouldn\'t have fallen!"',
    source: 'African Comedy Vault'
  },
  {
    id: 'naija-3',
    category: 'Nigerian Humor',
    type: 'twopart',
    setup: 'How do you know you are at a proper Nigerian wedding reception?',
    delivery: 'When the MC announces: "If you know you didn\'t bring a wedding gift, please don\'t ask for fried rice twice!"',
    source: 'African Comedy Vault'
  },
  {
    id: 'naija-4',
    category: 'Akpos Classic',
    type: 'twopart',
    setup: 'Judge: Akpos, you stole a goat from your neighbor\'s house! What do you have to say?',
    delivery: 'Akpos: My Lord, I didn\'t steal any goat. The goat was walking, I was walking, and we happened to be walking in the same direction!',
    source: 'African Comedy Vault'
  },
  {
    id: 'naija-5',
    category: 'Nigerian Humor',
    type: 'twopart',
    setup: 'Lagos Bus Conductor: "Enter with your 100 Naira change o! No change no entering!"',
    delivery: 'Passenger gives 1000 Naira note. Conductor pairs him with a total stranger and says: "The two of you should go and share 800 Naira together!"',
    source: 'African Comedy Vault'
  },
  {
    id: 'naija-6',
    category: 'African Parents',
    type: 'twopart',
    setup: 'Why is 5:30 AM the most dangerous time in an African household?',
    delivery: 'Because if your mother hears your footstep, you are leading the 45-minute opening prayer for morning devotion!',
    source: 'African Comedy Vault'
  },
  {
    id: 'naija-7',
    category: 'Akpos Classic',
    type: 'twopart',
    setup: 'Doctor: Akpos, I have bad news and worse news. The bad news is you have 24 hours to live.',
    delivery: 'Akpos: Chai! What could be worse than that?! Doctor: I\'ve been trying to reach you since yesterday!',
    source: 'African Comedy Vault'
  },
  {
    id: 'naija-8',
    category: 'Nigerian Humor',
    type: 'twopart',
    setup: 'Lecturer: "This university exam is open book. You can bring anything to class."',
    delivery: 'Akpos walked into the examination hall carrying a PhD graduate sitting right next to him!',
    source: 'African Comedy Vault'
  },
  {
    id: 'naija-9',
    category: 'African Parents',
    type: 'twopart',
    setup: 'Dad looks at report card: "Akpos, why did you come 25th out of 30 pupils in class?"',
    delivery: 'Akpos: "Daddy, at least I am not 30th." Dad: "Shut up! The pupil who came 1st, does he have two heads?!"',
    source: 'African Comedy Vault'
  },
  {
    id: 'naija-10',
    category: 'Akpos Classic',
    type: 'twopart',
    setup: 'Pastor: "If you know you want to go to heaven, raise up your hand!"',
    delivery: 'Everyone raised their hand except Akpos. Pastor asks: "Akpos, don\'t you want to go to heaven?" Akpos: "I want to go sir, but not today! I thought you were packing bus now!"',
    source: 'African Comedy Vault'
  },
  {
    id: 'naija-11',
    category: 'Nigerian Humor',
    type: 'twopart',
    setup: 'What is the fastest phenomenon known to physics in Nigeria?',
    delivery: 'The speed at which 40 kids run to plug their phones the exact microsecond NEPA brings back the light!',
    source: 'African Comedy Vault'
  },
  {
    id: 'naija-12',
    category: 'African Parents',
    type: 'twopart',
    setup: 'Why did my African dad send a 12-minute voice note on WhatsApp?',
    delivery: 'Because 10 minutes was him sighing, clearing his throat, and adjusting his glasses before saying "Good morning my son"!',
    source: 'African Comedy Vault'
  },
  {
    id: 'naija-13',
    category: 'Akpos Classic',
    type: 'twopart',
    setup: 'Traffic Police: "Akpos, pull over! Why are you driving so fast without a seatbelt?"',
    delivery: 'Akpos: "Officer, please don\'t be angry! I forgot my driver\'s license at home so I was rushing back before police catch me!"',
    source: 'African Comedy Vault'
  },
  {
    id: 'naija-14',
    category: 'Nigerian Humor',
    type: 'twopart',
    setup: 'Why does 2 drops of rain in Lagos cause 4 hours of gridlock traffic?',
    delivery: 'Because even the cars pause to debate if they should turn into canoes!',
    source: 'African Comedy Vault'
  },
  {
    id: 'naija-15',
    category: 'African Parents',
    type: 'twopart',
    setup: 'When an African mother calls out "Food is ready!" what does it actually mean?',
    delivery: 'It means she is about to turn on the gas burner to start chopping onions!',
    source: 'African Comedy Vault'
  },
  {
    id: 'curated-1',
    category: 'General',
    type: 'twopart',
    setup: 'Why don\'t scientists trust atoms?',
    delivery: 'Because they make up everything!',
    source: 'Global Humor'
  },
  {
    id: 'curated-2',
    category: 'Programming',
    type: 'twopart',
    setup: 'Why do programmers prefer dark mode?',
    delivery: 'Because light attracts bugs!',
    source: 'Dev Jokes'
  },
  {
    id: 'curated-3',
    category: 'Programming',
    type: 'twopart',
    setup: 'There are 10 types of people in the world...',
    delivery: 'Those who understand binary, and those who don\'t!',
    source: 'Dev Jokes'
  },
  {
    id: 'curated-4',
    category: 'DadJokes',
    type: 'twopart',
    setup: 'How do you organize a space party?',
    delivery: 'You planet!',
    source: 'Dad Jokes'
  },
  {
    id: 'curated-5',
    category: 'Pun',
    type: 'twopart',
    setup: 'What do you call a fake noodle?',
    delivery: 'An impasta!',
    source: 'Pun Vault'
  }
];

export async function fetchNextJoke(category: JokeCategory = 'Any', safeMode: boolean = true): Promise<Joke> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout for AI generation

  // 1. Try Gemini AI Server API first for hilarious, dynamic localized jokes
  try {
    const response = await fetch('/api/jokes/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, safeMode }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const jokeData = await response.json();
      if (jokeData && (jokeData.setup || jokeData.joke)) {
        return jokeData;
      }
    }
  } catch (err) {
    clearTimeout(timeoutId);
    console.log('Server AI joke generation fallback triggered:', err);
  }

  // 2. Secondary: If ChuckNorris or DadJokes external APIs requested
  try {
    const backupController = new AbortController();
    const backupTimeout = setTimeout(() => backupController.abort(), 3000);

    if (category === 'DadJokes') {
      const res = await fetch('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
        signal: backupController.signal
      });
      clearTimeout(backupTimeout);
      if (res.ok) {
        const data = await res.json();
        return {
          id: `dad-${data.id || Math.random().toString(36).substring(2, 9)}`,
          category: 'Dad Jokes',
          type: 'single',
          joke: data.joke,
          source: 'icanhazdadjoke.com'
        };
      }
    } else if (category === 'ChuckNorris') {
      const res = await fetch('https://api.chucknorris.io/jokes/random', {
        signal: backupController.signal
      });
      clearTimeout(backupTimeout);
      if (res.ok) {
        const data = await res.json();
        return {
          id: `chuck-${data.id}`,
          category: 'Chuck Norris',
          type: 'single',
          joke: data.value,
          source: 'api.chucknorris.io'
        };
      }
    }
  } catch (err) {
    // Ignore backup API error
  }

  // 3. Fail-safe: High-Voltage Curated Joke Vault
  const targetCategoryLower = category.toLowerCase();
  
  let filtered = CURATED_JOKES.filter(j => {
    if (category === 'Any') return true;
    if (targetCategoryLower === 'nigerian') {
      return j.category.toLowerCase().includes('nigerian') || j.category.toLowerCase().includes('akpos');
    }
    if (targetCategoryLower === 'akpos') {
      return j.category.toLowerCase().includes('akpos');
    }
    if (targetCategoryLower === 'africanparents') {
      return j.category.toLowerCase().includes('african parents');
    }
    return j.category.toLowerCase() === targetCategoryLower;
  });

  if (filtered.length === 0) {
    filtered = CURATED_JOKES;
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  const selectedJoke = filtered[randomIndex];

  return {
    ...selectedJoke,
    id: `${selectedJoke.id}-${Date.now()}`
  };
}
