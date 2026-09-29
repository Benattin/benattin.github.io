import './styles/index.css';
import { state } from './core/state.js';
import { runBoot } from './ui/boot.js';
import { content } from './content/data.js';
import { mountCharacter } from './ui/character.js';
import { clock } from './ui/effects.js';
import { loadRepos } from './ui/github.js';
import { bindNavigation } from './ui/navigation.js';
import { renderSheet, renderStatic } from './ui/render.js';

renderStatic();
state.onLang = clock();
mountCharacter();
bindNavigation();
runBoot();
loadRepos().then(() => {
  if (content.sections[state.index] === 'projetos') renderSheet({ animate: false, keepScroll: true });
});
