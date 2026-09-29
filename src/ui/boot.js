import { content } from '../content/data.js';
import { state, t } from '../core/state.js';
import { $ } from './dom.js';
import { renderMenu, renderSheet } from './render.js';

// Clicar ou apertar uma tecla na abertura pula as esperas restantes
let skipped = false;
const wait = (ms) => new Promise((r) => setTimeout(r, skipped ? 0 : ms));

export async function runBoot() {
  const d = t();
  const skip = () => (skipped = true);
  $('#boot').addEventListener('click', skip);
  addEventListener('keydown', skip, { once: true });
  const bar = $('.boot__bar i');
  const task = $('.boot__task');
  const pct = $('.boot__pct');
  const step = (p, label) => {
    bar.style.transform = `scaleX(${p / 100})`;
    task.textContent = label;
    pct.textContent = String(Math.round(p)).padStart(3, '0');
  };

  step(8, d.bootTasks[0]);
  await Promise.race([document.fonts?.ready, wait(600)]);
  step(30, d.bootTasks[1]);

  try {
    const { createScene } = await import('../three/scene.js');
    step(65, d.bootTasks[2]);
    state.scene = createScene($('#scene'));
    state.scene.goTo(content.sections[state.index], true);
  } catch (err) {
    console.warn('WebGL indisponível', err);
    document.body.classList.add('no-webgl');
  }

  step(88, d.bootTasks[3]);
  renderMenu();
  renderSheet();
  await wait(120);
  step(100, d.bootDone);
  await wait(220);
  $('#boot').classList.add('is-done');
  document.body.classList.add('is-ready');
}
