import { content } from '../content/data.js';

export const state = {
  lang: localStorage.getItem('lang') || 'pt',
  index: Math.max(0, content.sections.indexOf(location.hash.slice(1))),
  filter: 'all',
  scene: null,
  locked: false,
};

export const t = () => content[state.lang];
export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
