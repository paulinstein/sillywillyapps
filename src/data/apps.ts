import type { ImageMetadata } from 'astro';
import dogStoriesIcon from '../assets/apps/dog-stories.png';
import factRallyIcon from '../assets/apps/fact-rally.png';
import wordyGerdyIcon from '../assets/apps/wordy-gerdy.png';

export interface App {
  name: string;
  pitch: string;
  icon: ImageMetadata;
  website: string;
  /** Add once the app is live; until then the card says "Coming soon". */
  appStore?: string;
  googlePlay?: string;
}

/** Newest first. Adding an app is one more entry here. */
export const apps: App[] = [
  {
    name: 'Wordy Gerdy',
    pitch: 'Sight word flashcards for grades 1 to 5. Read it, hear it, find it, and earn stars.',
    icon: wordyGerdyIcon,
    website: '/wordy-gerdy/',
  },
  {
    name: 'Fact Rally',
    pitch: 'A math facts race for grades 1 to 5. Answer fast, pass the cars, win the race.',
    icon: factRallyIcon,
    website: '/fact-rally/',
  },
  {
    name: 'Dog Stories',
    pitch: 'A merge game full of heartwarming stories about dogs and their people.',
    icon: dogStoriesIcon,
    website: 'https://dogstories.sillywillyapps.com',
    appStore: 'https://apps.apple.com/app/id6831840230',
  },
];

/** Show a "next app: coming someday" card after the real ones. */
export const showComingSomeday = true;
