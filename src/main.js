import './styles/index.css';
import { state } from './core/state.js';
import { runBoot } from './ui/boot.js';
import { mountCharacter } from './ui/character.js';
import { clock } from './ui/effects.js';
import { bindNavigation } from './ui/navigation.js';
import { renderStatic } from './ui/render.js';

renderStatic();
state.onLang = clock();
mountCharacter();
bindNavigation();
runBoot();
