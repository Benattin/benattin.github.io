export const PALETTE = {
  purple: 0x8b5cf6,
  purpleSoft: 0xc4b5fd,
  indigo: 0x6366f1,
  white: 0xf5f3ff,
  building: 0x1c1629,
};

// Gerador pseudoaleatório com semente: a cidade sai igual em todo carregamento
export function mulberry32(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
