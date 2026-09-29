// Um enquadramento de câmera por seção: posição, alvo e cores do céu [base, topo]
export const SHOTS = {
  inicio: { pos: [2, 9, 48], look: [0, 12, -30], sky: [0x06050b, 0x1a1033], bloom: 0.9 },
  perfil: { pos: [-8, 5, 16], look: [-20, 5, -4], sky: [0x07060d, 0x211440], bloom: 1.0 },
  habilidades: { pos: [0, 44, 24], look: [0, 30, -6], sky: [0x05050b, 0x15112e], bloom: 0.95 },
  experiencia: { pos: [6, 1.8, 30], look: [6, 1.4, -40], sky: [0x06060d, 0x181842], bloom: 1.05 },
  projetos: { pos: [20, 7, 10], look: [26, 7, -6], sky: [0x06050c, 0x1c1238], bloom: 0.8 },
  formacoes: { pos: [-14, 9, 22], look: [-24, 8, -10], sky: [0x06050c, 0x1d1540], bloom: 0.95 },
  conquistas: { pos: [-4, 5.5, -17], look: [-4, 4, -34], sky: [0x07060e, 0x221748], bloom: 1.0 },
  contato: { pos: [0, 12, 52], look: [0, 12, -60], sky: [0x151032, 0x4c3a8f], bloom: 0.7 },
};
