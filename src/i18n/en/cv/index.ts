import { SKILLS } from './skills';
import { PROJECTS } from './projects';
import { EDUCATION } from './education';
import { EXPERIENCE } from './experience';
import { PUBLICATIONS } from './publications';

export const cv = {
  // Titles
  EXPERIENCE: 'Experience',
  EDUCATION: 'Education',
  PROJECTS: 'Projects',
  PUBLICATIONS: 'Publications',
  SKILLS: 'Skills',

  WEB_SITE: 'Web Site',
  Certificate: 'Certificate',

  // Experience
  ...SKILLS,
  ...PROJECTS,
  ...EDUCATION,
  ...EXPERIENCE,
  ...PUBLICATIONS,
} as const;
