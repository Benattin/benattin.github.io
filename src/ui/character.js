import { content } from '../content/data.js';
import { reducedMotion, state, t } from '../core/state.js';
import { $, esc } from './dom.js';

// Uma pose por seção (arquivos em src/assets/poses/<secao>.webp)
const POSES = Object.fromEntries(
  Object.entries(import.meta.glob('../assets/poses/*.webp', { eager: true, import: 'default' })).map(([path, url]) => [
    path.split('/').pop().replace('.webp', ''),
    url,
  ]),
);

const IDLE_MS = 14000;
const SWAP_MS = 320;
let el, img, bubble, hideTimer, idleTimer, swapTimer, scrollTimer, focused, clicks = 0;

export function mountCharacter() {
  el = $('#character');
  img = $('.character__img', el);
  bubble = $('#bubble');
  Object.values(POSES).forEach((url) => (new Image().src = url));
  updateCharacter(0);

  // Clique: pulinho e uma fala aleatória
  $('.character__body', el).addEventListener('click', () => {
    const lines = t().characterSays.click;
    say(lines[clicks++ % lines.length]);
    restartClass('is-hop');
  });

  // Passar o mouse em algo com data-say faz o personagem comentar
  document.addEventListener('pointerover', (e) => {
    const target = e.target.closest('[data-say]');
    if (target) say(target.dataset.say, { hold: true });
  });
  document.addEventListener('pointerout', (e) => {
    const target = e.target.closest('[data-say]');
    if (target && !target.contains(e.relatedTarget)) release();
  });

  // Rolar o painel: ele acompanha e comenta o item que ficou no centro
  document.addEventListener('scroll', onSheetScroll, true);

  ['pointermove', 'keydown', 'wheel', 'touchstart'].forEach((ev) => addEventListener(ev, resetIdle, { passive: true }));
  resetIdle();
}

/**
 * Troca de seção: o personagem sai na direção da navegação, troca de pose
 * junto com o título da página e volta com um pulinho.
 * direction: 1 = avançou, -1 = voltou, 0 = sem animação (ex.: troca de idioma)
 */
export function updateCharacter(direction = 0) {
  const section = content.sections[state.index];
  const title = t().menu[state.index];
  const line = t().character[state.index];

  clearTimeout(swapTimer);
  focused = null;
  if (!direction || reducedMotion) {
    applyPose(section);
  } else {
    el.style.setProperty('--dir', direction);
    el.classList.remove('is-entering');
    el.classList.add('is-leaving');
    swapTimer = setTimeout(() => {
      applyPose(section);
      el.classList.remove('is-leaving');
      restartClass('is-entering');
    }, SWAP_MS);
  }
  say(line, { title, hold: true });
}

function applyPose(section) {
  img.src = POSES[section] || POSES.inicio;
  el.dataset.section = section;
}

function restartClass(name) {
  el.classList.remove(name);
  void el.offsetWidth;
  el.classList.add(name);
}

function onSheetScroll(e) {
  const body = e.target;
  if (!(body instanceof Element) || !body.classList.contains('sheet__body')) return;
  el.classList.add('is-scrolling');
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    el.classList.remove('is-scrolling');
    const box = body.getBoundingClientRect();
    const mid = box.top + box.height / 2;
    let best = null;
    let bestDist = Infinity;
    body.querySelectorAll('[data-say]').forEach((item) => {
      const r = item.getBoundingClientRect();
      const dist = Math.abs(r.top + r.height / 2 - mid);
      if (dist < bestDist) [best, bestDist] = [item, dist];
    });
    if (!best || best === focused) return;
    focused?.classList.remove('is-focus');
    focused = best;
    best.classList.add('is-focus');
    say(best.dataset.say);
    restartClass('is-nod');
  }, 180);
}

function resetIdle() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => say(t().characterSays.idle), IDLE_MS);
}

// O balão sempre volta para o título da página atual depois de uma fala
function showHome() {
  say(t().character[state.index], { hold: true, title: t().menu[state.index] });
}

export function say(text, { hold = false, title = '' } = {}) {
  clearTimeout(hideTimer);
  bubble.innerHTML = `${title ? `<b class="character__bubble-title">${esc(title)}</b>` : ''}${esc(text)}`;
  bubble.classList.remove('is-on');
  void bubble.offsetWidth;
  bubble.classList.add('is-on');
  if (!hold) hideTimer = setTimeout(showHome, 4000);
}

function release() {
  clearTimeout(hideTimer);
  hideTimer = setTimeout(showHome, 500);
}
