import { SKILLS } from './skills';
import { PROJECTS } from './projects';
import { EDUCATION } from './education';
import { EXPERIENCE } from './experience';
import { PUBLICATIONS } from './publications';

export const cv = {
  // Titles
  EXPERIENCE: 'Experiencia',
  EDUCATION: 'Educación',
  PROJECTS: 'Proyectos',
  PUBLICATIONS: 'Publicaciones',
  SKILLS: 'Habilidades',

  WEB_SITE: 'Sitio Web',
  Certificate: 'Certificado',

  Skill: 'Habilidad',

  // Experience
  ...SKILLS,
  ...PROJECTS,
  ...EDUCATION,
  ...EXPERIENCE,
  ...PUBLICATIONS,
} as const;
