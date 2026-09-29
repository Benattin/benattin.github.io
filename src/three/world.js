import * as THREE from 'three';
import { PALETTE, mulberry32 } from './utils.js';

const { purple, purpleSoft, indigo, white } = PALETTE;
const glowMat = (color) => new THREE.MeshBasicMaterial({ color, toneMapped: false });

// Áreas sem prédios, reservadas aos objetos de cada seção: [x, z, raio]
const CLEAR_ZONES = [[-20, -4, 12], [26, -6, 14], [-4, -30, 14]];
const AVENUE_X = 6;

export function buildWorld(scene, { mobile }) {
  const rand = mulberry32(2008);
  const updaters = [];

  const sky = createSky(scene);
  createGround(scene);
  createCity(scene, rand, mobile);
  updaters.push(createAvenue(scene, rand));
  updaters.push(createRain(scene, rand, mobile ? 300 : 1400));
  updaters.push(createCore(scene));
  updaters.push(createOrbit(scene));
  updaters.push(createPanels(scene));
  updaters.push(createPodium(scene));
  updaters.push(createDust(scene, rand));

  return {
    sky,
    update: (t, dt) => updaters.forEach((fn) => fn(t, dt)),
  };
}

// ---------- Céu com estrelas e lua ----------
function createSky(scene) {
  const uniforms = {
    top: { value: new THREE.Color(0x1d0c33) },
    bottom: { value: new THREE.Color(0x07050c) },
    time: { value: 0 },
  };
  const sky = new THREE.Mesh(
    new THREE.SphereGeometry(300, 48, 24),
    new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms,
      vertexShader: `varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `
        uniform vec3 top; uniform vec3 bottom; uniform float time; varying vec3 vP;
        float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
        void main(){
          vec3 d = normalize(vP);
          float h = clamp(d.y * 1.4 + 0.25, 0.0, 1.0);
          vec3 col = mix(bottom, top, h);
          vec2 cell = floor(vec2(atan(d.z, d.x), asin(d.y)) * 160.0);
          float r = hash(cell);
          float star = step(0.996, r) * smoothstep(0.05, 0.4, d.y);
          star *= 0.6 + 0.4 * sin(time * 2.0 + r * 60.0);
          col += vec3(0.85, 0.8, 1.0) * star;
          gl_FragColor = vec4(col, 1.0);
        }`,
    }),
  );
  scene.add(sky);

  const moon = new THREE.Mesh(new THREE.SphereGeometry(7, 32, 16), glowMat(0xe9d5ff));
  moon.position.set(-90, 85, -220);
  scene.add(moon);

  return uniforms;
}

// ---------- Chão molhado ----------
function createGround(scene) {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(400, 400),
    new THREE.MeshStandardMaterial({ color: 0x0b0812, roughness: 0.22, metalness: 0.85 }),
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  const road = new THREE.Mesh(new THREE.PlaneGeometry(7, 260), new THREE.MeshStandardMaterial({ color: 0x07060b, roughness: 0.4, metalness: 0.6 }));
  road.rotation.x = -Math.PI / 2;
  road.position.set(AVENUE_X, 0.01, -60);
  scene.add(road);
}

// ---------- Cidade: prédios, janelas, letreiros e luzes de topo ----------
function createCity(scene, rand, mobile) {
  const count = mobile ? 120 : 230;
  const geo = new THREE.BoxGeometry(1, 1, 1);
  geo.translate(0, 0.5, 0);
  const buildings = new THREE.InstancedMesh(geo, new THREE.MeshStandardMaterial({ color: PALETTE.building, roughness: 0.7, metalness: 0.25 }), count);

  const maxWindows = mobile ? 900 : 2200;
  const windows = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.35, 0.5), glowMat(0xffffff), maxWindows);
  const signs = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), glowMat(0xffffff), 40);
  const beacons = new THREE.InstancedMesh(new THREE.SphereGeometry(0.25, 8, 6), glowMat(indigo), 60);

  const m = new THREE.Matrix4();
  const c = new THREE.Color();
  const hidden = new THREE.Matrix4().makeScale(0, 0, 0);
  let wi = 0, si = 0, bi = 0;

  for (let i = 0; i < count; i++) {
    let x = (rand() - 0.5) * 170;
    const z = -rand() * 125 - 8;
    if (Math.abs(x - AVENUE_X) < 5) x += x > AVENUE_X ? 8 : -8;
    if (CLEAR_ZONES.some(([cx, cz, r]) => Math.hypot(x - cx, z - cz) < r)) {
      buildings.setMatrixAt(i, hidden);
      continue;
    }
    const w = 3 + rand() * 5;
    const d = 3 + rand() * 5;
    const h = 6 + Math.pow(rand(), 2) * 46;
    m.compose(new THREE.Vector3(x, 0, z), new THREE.Quaternion(), new THREE.Vector3(w, h, d));
    buildings.setMatrixAt(i, m);

    const rows = Math.floor(h / 2.2);
    const cols = Math.floor(w / 1.1);
    for (let r = 1; r < rows && wi < maxWindows; r++) {
      for (let k = 0; k < cols && wi < maxWindows; k++) {
        if (rand() > 0.3) continue;
        m.makeTranslation(x - w / 2 + 0.6 + k * 1.1, r * 2.2, z + d / 2 + 0.02);
        windows.setMatrixAt(wi, m);
        const p = rand();
        c.set(p < 0.55 ? purple : p < 0.82 ? 0xe9e3ff : indigo).multiplyScalar(0.5 + rand() * 0.7);
        windows.setColorAt(wi++, c);
      }
    }

    if (h > 22 && si < 40 && rand() < 0.35) {
      const vertical = rand() < 0.6;
      const sw = vertical ? 0.35 : w * 0.7;
      const sh = vertical ? h * 0.35 : 0.35;
      m.compose(new THREE.Vector3(x + (vertical ? w / 2 - 0.5 : 0), h * (vertical ? 0.6 : 0.85), z + d / 2 + 0.2), new THREE.Quaternion(), new THREE.Vector3(sw, sh, 0.1));
      signs.setMatrixAt(si, m);
      signs.setColorAt(si++, c.set(rand() < 0.6 ? purple : indigo).multiplyScalar(1.6));
    }

    if (h > 30 && bi < 60) {
      m.makeTranslation(x, h + 0.4, z);
      beacons.setMatrixAt(bi++, m);
    }
  }

  windows.count = wi;
  signs.count = si;
  beacons.count = bi;
  scene.add(buildings, windows, signs, beacons);
}

// ---------- Avenida: faixas e rastros de faróis ----------
function createAvenue(scene, rand) {
  const lanes = new THREE.InstancedMesh(new THREE.BoxGeometry(0.12, 0.02, 2), glowMat(0x6b6480), 60);
  const m = new THREE.Matrix4();
  for (let i = 0; i < 60; i++) {
    m.makeTranslation(AVENUE_X, 0.03, 30 - i * 4.5);
    lanes.setMatrixAt(i, m);
  }
  scene.add(lanes);

  const streaks = new THREE.Group();
  const geo = new THREE.BoxGeometry(0.1, 0.1, 7);
  for (let i = 0; i < 44; i++) {
    const inbound = i % 2 === 0;
    const s = new THREE.Mesh(geo, glowMat(inbound ? white : indigo));
    s.position.set(AVENUE_X + (inbound ? -1.6 : 1.6), 0.5, -rand() * 130 + 25);
    s.userData.speed = (inbound ? 1 : -1) * (20 + rand() * 14);
    streaks.add(s);
  }
  scene.add(streaks);

  return (t, dt) => {
    for (const s of streaks.children) {
      s.position.z += s.userData.speed * dt;
      if (s.position.z > 35) s.position.z = -105;
      else if (s.position.z < -105) s.position.z = 35;
    }
  };
}

// ---------- Chuva fina ----------
function createRain(scene, rand, count) {
  const pos = new Float32Array(count * 6);
  for (let i = 0; i < count; i++) {
    const x = (rand() - 0.5) * 120, y = rand() * 60, z = (rand() - 0.5) * 120;
    pos.set([x, y, z, x - 0.05, y - 0.9, z], i * 6);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const rain = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({ color: purpleSoft, transparent: true, opacity: 0.22 }));
  scene.add(rain);

  return (t, dt) => {
    const a = geo.attributes.position.array;
    const fall = 38 * dt;
    for (let i = 0; i < a.length; i += 6) {
      a[i + 1] -= fall;
      a[i + 4] -= fall;
      if (a[i + 4] < 0) {
        a[i + 1] += 60;
        a[i + 4] += 60;
      }
    }
    geo.attributes.position.needsUpdate = true;
  };
}

// ---------- Perfil: núcleo ----------
function createCore(scene) {
  const group = new THREE.Group();
  group.position.set(-20, 5, -4);
  const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(3, 1), new THREE.MeshBasicMaterial({ color: purple, wireframe: true, toneMapped: false }));
  const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 0), new THREE.MeshStandardMaterial({ color: indigo, emissive: indigo, emissiveIntensity: 1.4, flatShading: true }));
  const ring = new THREE.Mesh(new THREE.TorusGeometry(4.3, 0.03, 8, 96), glowMat(purpleSoft));
  ring.rotation.x = Math.PI / 2.3;
  group.add(shell, inner, ring);
  scene.add(group);

  return (t) => {
    shell.rotation.set(t * 0.2, t * 0.3, 0);
    inner.rotation.set(-t * 0.4, t * 0.25, 0);
    ring.rotation.z = t * 0.5;
    group.position.y = 5 + Math.sin(t * 0.8) * 0.3;
  };
}

// ---------- Habilidades: formas orbitando ----------
function createOrbit(scene) {
  const orbit = new THREE.Group();
  orbit.position.set(0, 30, -6);
  const shapes = [
    new THREE.OctahedronGeometry(1.2),
    new THREE.TetrahedronGeometry(1.3),
    new THREE.TorusGeometry(1, 0.3, 8, 20),
    new THREE.BoxGeometry(1.5, 1.5, 1.5),
    new THREE.DodecahedronGeometry(1.1),
  ];
  shapes.forEach((g, i) => {
    const mesh = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: i % 2 ? indigo : purple, wireframe: true, toneMapped: false }));
    const a = (i / shapes.length) * Math.PI * 2;
    mesh.position.set(Math.cos(a) * 8, Math.sin(a * 2) * 1.5, Math.sin(a) * 8);
    orbit.add(mesh);
  });
  const halo = new THREE.Mesh(new THREE.TorusGeometry(8, 0.02, 6, 128), glowMat(purpleSoft));
  halo.rotation.x = Math.PI / 2;
  orbit.add(halo);
  scene.add(orbit);

  return (t) => {
    orbit.rotation.y = t * 0.25;
    orbit.children.forEach((o, i) => o !== halo && o.rotation.set(t * (0.3 + i * 0.1), t * 0.4, 0));
  };
}

// ---------- Projetos: monitores flutuantes ----------
function createPanels(scene) {
  const group = new THREE.Group();
  group.position.set(26, 7, -6);
  for (let i = 0; i < 5; i++) {
    const p = new THREE.Mesh(
      new THREE.PlaneGeometry(4.8, 3),
      new THREE.MeshBasicMaterial({ map: panelTexture(i), transparent: true, opacity: 0.95, side: THREE.DoubleSide, toneMapped: false }),
    );
    const a = (i - 2) * 0.45;
    p.position.set(Math.sin(a) * 9, (i % 2) * 1.2 - 0.6, -Math.cos(a) * 9 + 9);
    p.lookAt(0, p.position.y, 12);
    p.userData.baseY = p.position.y;
    group.add(p);
  }
  scene.add(group);
  return (t) => group.children.forEach((p, i) => (p.position.y = p.userData.baseY + Math.sin(t * 1.1 + i) * 0.18));
}

function panelTexture(i) {
  const cv = document.createElement('canvas');
  cv.width = 512;
  cv.height = 320;
  const g = cv.getContext('2d');
  const accent = i % 2 ? '#6366f1' : '#8b5cf6';
  g.fillStyle = 'rgba(12,8,20,0.96)';
  g.fillRect(0, 0, 512, 320);
  g.fillStyle = accent;
  g.fillRect(0, 0, 512, 28);
  ['#c4b5fd', '#818cf8', '#5b5470'].forEach((col, k) => {
    g.fillStyle = col;
    g.beginPath();
    g.arc(18 + k * 18, 14, 5, 0, Math.PI * 2);
    g.fill();
  });
  const r = mulberry32(i + 7);
  for (let l = 0; l < 12; l++) {
    g.fillStyle = r() > 0.72 ? '#818cf8' : r() > 0.4 ? '#c4b5fd' : '#5b5470';
    g.fillRect(28 + (l % 3) * 20, 50 + l * 21, 70 + r() * 320, 8);
  }
  g.strokeStyle = accent;
  g.lineWidth = 4;
  g.strokeRect(2, 2, 508, 316);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// ---------- Conquistas: pódio e troféu ----------
function createPodium(scene) {
  const group = new THREE.Group();
  group.position.set(-4, 0, -34);
  const mat = new THREE.MeshStandardMaterial({ color: 0x1b1426, roughness: 0.4, metalness: 0.5 });
  [[0, 3], [-3.2, 2], [3.2, 1.3]].forEach(([x, h]) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(3, h, 3), mat);
    b.position.set(x, h / 2, 0);
    const edge = new THREE.Mesh(new THREE.BoxGeometry(3.02, 0.06, 3.02), glowMat(purple));
    edge.position.set(x, h, 0);
    group.add(b, edge);
  });
  const trophy = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.9, 0.28, 140, 18),
    new THREE.MeshStandardMaterial({ color: purpleSoft, emissive: purple, emissiveIntensity: 0.5, metalness: 0.9, roughness: 0.18 }),
  );
  trophy.position.set(0, 5, 0);
  const light = new THREE.PointLight(purple, 70, 22);
  light.position.set(0, 9, 3);
  group.add(trophy, light);
  scene.add(group);

  return (t) => {
    trophy.rotation.y = t * 0.6;
    trophy.position.y = 5 + Math.sin(t * 1.3) * 0.2;
  };
}

// ---------- Poeira luminosa ----------
function createDust(scene, rand) {
  const count = 800;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) pos.set([(rand() - 0.5) * 160, rand() * 70, (rand() - 0.5) * 160 - 20], i * 3);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const dust = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xd8b4fe, size: 0.16, transparent: true, opacity: 0.6, depthWrite: false }));
  scene.add(dust);
  return (t) => (dust.rotation.y = t * 0.01);
}
