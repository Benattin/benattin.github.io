import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { SHOTS } from './shots.js';
import { PALETTE, easeInOutCubic } from './utils.js';
import { buildWorld } from './world.js';

const TRANSITION_S = 1.8;

export function createScene(canvas) {
  const mobile = window.matchMedia('(max-width: 860px)').matches;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !mobile, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.5));
  renderer.setSize(innerWidth, innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0a0712, 0.012);
  const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 500);

  scene.add(new THREE.AmbientLight(0x5b3a8a, 0.7));
  const moonLight = new THREE.DirectionalLight(PALETTE.purpleSoft, 0.9);
  moonLight.position.set(-30, 60, 20);
  scene.add(moonLight);

  const world = buildWorld(scene, { mobile });

  // Pós-processamento: brilho neon
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight).multiplyScalar(mobile ? 0.5 : 1), 0.9, 0.55, 0.18);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  // Transição de câmera entre seções
  const initial = SHOTS.inicio;
  const cur = { pos: new THREE.Vector3(...initial.pos), look: new THREE.Vector3(...initial.look) };
  const from = { pos: cur.pos.clone(), look: cur.look.clone(), top: new THREE.Color(initial.sky[1]), bottom: new THREE.Color(initial.sky[0]), bloom: initial.bloom };
  const to = { pos: cur.pos.clone(), look: cur.look.clone(), top: from.top.clone(), bottom: from.bottom.clone(), bloom: initial.bloom };
  const clock = new THREE.Clock();
  let startedAt = -TRANSITION_S;

  function goTo(id, instant = false) {
    const shot = SHOTS[id] || initial;
    from.pos.copy(cur.pos);
    from.look.copy(cur.look);
    from.top.copy(world.sky.top.value);
    from.bottom.copy(world.sky.bottom.value);
    from.bloom = bloom.strength;
    to.pos.set(...shot.pos);
    to.look.set(...shot.look);
    to.top.set(shot.sky[1]);
    to.bottom.set(shot.sky[0]);
    to.bloom = shot.bloom;
    startedAt = instant ? -TRANSITION_S : clock.getElapsedTime();
  }

  let last = 0;
  let running = true;
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(frame);
  });

  function frame() {
    if (!running) return;
    const t = clock.getElapsedTime();
    const dt = Math.min(t - last, 0.05);
    last = t;

    const k = easeInOutCubic(Math.min((t - startedAt) / TRANSITION_S, 1));
    cur.pos.lerpVectors(from.pos, to.pos, k);
    cur.look.lerpVectors(from.look, to.look, k);
    world.sky.top.value.lerpColors(from.top, to.top, k);
    world.sky.bottom.value.lerpColors(from.bottom, to.bottom, k);
    world.sky.time.value = t;
    scene.fog.color.copy(world.sky.bottom.value);
    bloom.strength = from.bloom + (to.bloom - from.bloom) * k;

    const sway = Math.sin(t * 0.3) * 0.25;
    camera.position.set(cur.pos.x + sway, cur.pos.y, cur.pos.z);
    camera.lookAt(cur.look);

    world.update(t, dt);
    composer.render();
    requestAnimationFrame(frame);
  }
  frame();

  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    composer.setSize(innerWidth, innerHeight);
  });

  return { goTo };
}
