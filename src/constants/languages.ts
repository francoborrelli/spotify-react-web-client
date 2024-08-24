import type { Languages } from '../interfaces/languages';

export const AVAILABLE_LANGUAGES = [
  { value: 'en', label: 'English', englishLabel: 'English' },
  {
    value: 'es',
    label: 'Español (Argentina)',
    englishLabel: 'Spanish',
  },
] as {
  label: string;
  value: Languages;
  englishLabel: string;
}[];
