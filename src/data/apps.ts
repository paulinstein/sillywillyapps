import type { ImageMetadata } from 'astro';
import dogStoriesIcon from '../assets/apps/dog-stories.png';

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
    name: 'Dog Stories',
    pitch: 'A merge game full of heartwarming stories about dogs and their people.',
    icon: dogStoriesIcon,
    website: 'https://dogstories.sillywillyapps.com',
    appStore: 'https://apps.apple.com/app/id6831840230',
  },
];

/** Show a "next app: coming someday" card after the real ones. */
export const showComingSomeday = true;
