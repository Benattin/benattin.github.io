import { reducedMotion, t } from '../core/state.js';
import { $ } from './dom.js';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*/<>';

export function scramble(el) {
  const final = el.dataset.text;
  if (reducedMotion) return;
  const total = 24;
  let frame = 0;
  const tick = () => {
    const progress = frame / total;
    el.textContent = [...final]
      .map((ch, i) => (ch === ' ' || progress > i / final.length ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
      .join('');
    if (++frame <= total) requestAnimationFrame(tick);
    else el.textContent = final;
  };
  tick();
}

export function flash() {
  const el = $('#flash');
  el.classList.remove('is-on');
  void el.offsetWidth;
  el.classList.add('is-on');
}

let toastTimer;
export function toast(message) {
  const el = $('#toast');
  el.textContent = message;
  el.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-on'), 2200);
}

// Relógio de São Paulo na barra superior
export function clock() {
  const el = $('#clock');
  const update = () => {
    const time = new Intl.DateTimeFormat(t().locale, { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' }).format(new Date());
    el.textContent = `SP ${time}`;
  };
  update();
  setInterval(update, 15000);
  return update;
}
