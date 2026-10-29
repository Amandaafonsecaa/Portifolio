/* Física do crachá: integração de Verlet + restrições de posição (PBD).
 *
 * - Fita: corrente de partículas leves. Cada elo só resiste a ESTICAR
 *   (pode afrouxar, como um tecido) e elos alternados impedem dobras
 *   bruscas, dando a rigidez de uma fita de verdade.
 * - Presilha: segmento rígido entre o fim da fita e o topo do crachá,
 *   articulado nas duas pontas.
 * - Crachá: triângulo rígido (topo, canto inferior esquerdo e direito)
 *   mais pesado que a fita; gira em torno da presilha pelo próprio peso.
 * - Arrastar: o ponto agarrado (em coordenadas baricêntricas do
 *   triângulo, ou uma partícula da fita) é puxado até o cursor; ao
 *   soltar, a velocidade acumulada continua, então dá para arremessar.
 */

export const CARD_W = 280;
export const CARD_H = 420;
export const CLIP = 38;
export const SEGMENTS = 16;

const GRAVITY = 2600; // px/s²
export const STEP = 1 / 120;
const ITERATIONS = 16;
const AIR = 0.996; // fração da velocidade mantida por passo
const MAX_SPEED = 55; // px por passo, evita explosões numéricas
const GRAB_STIFFNESS = 0.45;
const ROPE_MASS = 1;
const CARD_MASS = 5;

// índices fixos das partículas
export const RING = SEGMENTS;
export const TOP = SEGMENTS + 1;
export const BOTTOM_LEFT = SEGMENTS + 2;
export const BOTTOM_RIGHT = SEGMENTS + 3;

interface Particle {
  x: number;
  y: number;
  px: number;
  py: number;
  /** massa inversa; 0 = fixa */
  w: number;
}

interface Link {
  a: number;
  b: number;
  len: number;
  /** rope: só puxa; bend: só empurra; rigid: os dois */
  mode: "rope" | "bend" | "rigid";
}

export type Grab =
  | { kind: "card"; weights: [number, number, number]; x: number; y: number }
  | { kind: "rope"; index: number; x: number; y: number };

export interface Rig {
  points: Particle[];
  links: Link[];
  scale: number;
}

const point = (x: number, y: number, mass: number): Particle => ({ x, y, px: x, py: y, w: mass ? 1 / mass : 0 });

/**
 * Monta o sistema dentro de um palco width × height com o ponto de
 * fixação no topo. `drop` começa com o crachá erguido de lado e a fita
 * frouxa, para ele cair, esticar a fita e balançar.
 */
export function buildRig(width: number, height: number, drop: boolean): Rig {
  const scale = Math.min(1, (width - 40) / CARD_W, (height * 0.6) / CARD_H);
  const strap = Math.max(80, height - (CLIP + CARD_H) * scale - 30);
  const segment = strap / SEGMENTS;
  const anchor = { x: width / 2, y: -10 };

  // fim da fita: pendurado em repouso ou erguido para a queda
  const ring = drop ? { x: anchor.x + strap * 0.55, y: anchor.y + strap * 0.12 } : { x: anchor.x, y: anchor.y + strap };

  const points: Particle[] = [];
  for (let i = 0; i <= SEGMENTS; i++) {
    const f = i / SEGMENTS;
    points.push(point(anchor.x + (ring.x - anchor.x) * f, anchor.y + (ring.y - anchor.y) * f, i === 0 ? 0 : ROPE_MASS));
  }
  const top = { x: ring.x, y: ring.y + CLIP * scale };
  points.push(point(top.x, top.y, CARD_MASS));
  points.push(point(top.x - (CARD_W / 2) * scale, top.y + CARD_H * scale, CARD_MASS));
  points.push(point(top.x + (CARD_W / 2) * scale, top.y + CARD_H * scale, CARD_MASS));

  const links: Link[] = [];
  const add = (a: number, b: number, mode: Link["mode"], len?: number) => {
    const pa = points[a];
    const pb = points[b];
    links.push({ a, b, mode, len: len ?? Math.hypot(pb.x - pa.x, pb.y - pa.y) });
  };
  for (let i = 0; i < SEGMENTS; i++) add(i, i + 1, "rope", segment);
  for (let i = 0; i < SEGMENTS - 1; i++) add(i, i + 2, "bend", segment * 1.7);
  add(RING, TOP, "rigid", CLIP * scale);
  add(TOP, BOTTOM_LEFT, "rigid");
  add(TOP, BOTTOM_RIGHT, "rigid");
  add(BOTTOM_LEFT, BOTTOM_RIGHT, "rigid");

  return { points, links, scale };
}

/** Coordenadas baricêntricas de (x, y) no triângulo do crachá. */
export function cardWeights(rig: Rig, x: number, y: number): [number, number, number] {
  const a = rig.points[TOP];
  const b = rig.points[BOTTOM_LEFT];
  const c = rig.points[BOTTOM_RIGHT];
  const v0x = b.x - a.x, v0y = b.y - a.y;
  const v1x = c.x - a.x, v1y = c.y - a.y;
  const v2x = x - a.x, v2y = y - a.y;
  const d00 = v0x * v0x + v0y * v0y;
  const d01 = v0x * v1x + v0y * v1y;
  const d11 = v1x * v1x + v1y * v1y;
  const d20 = v2x * v0x + v2y * v0y;
  const d21 = v2x * v1x + v2y * v1y;
  const den = d00 * d11 - d01 * d01 || 1;
  const v = (d11 * d20 - d01 * d21) / den;
  const w = (d00 * d21 - d01 * d20) / den;
  return [1 - v - w, v, w];
}

/** Partícula da fita mais próxima de (x, y). */
export function nearestRopePoint(rig: Rig, x: number, y: number) {
  let best = 1;
  let bestDistance = Infinity;
  for (let i = 1; i <= RING; i++) {
    const d = Math.hypot(rig.points[i].x - x, rig.points[i].y - y);
    if (d < bestDistance) {
      best = i;
      bestDistance = d;
    }
  }
  return best;
}

/** Empurra o crachá de lado (teclado). */
export function nudge(rig: Rig, dx: number) {
  for (const i of [TOP, BOTTOM_LEFT, BOTTOM_RIGHT]) rig.points[i].px -= dx;
}

function applyGrab(rig: Rig, grab: Grab) {
  const p = rig.points;
  if (grab.kind === "rope") {
    const target = p[grab.index];
    target.x += (grab.x - target.x) * GRAB_STIFFNESS;
    target.y += (grab.y - target.y) * GRAB_STIFFNESS;
    return;
  }
  const [u, v, w] = grab.weights;
  const ids = [TOP, BOTTOM_LEFT, BOTTOM_RIGHT];
  const cx = u * p[TOP].x + v * p[BOTTOM_LEFT].x + w * p[BOTTOM_RIGHT].x;
  const cy = u * p[TOP].y + v * p[BOTTOM_LEFT].y + w * p[BOTTOM_RIGHT].y;
  const norm = u * u + v * v + w * w || 1;
  const dx = ((grab.x - cx) * GRAB_STIFFNESS) / norm;
  const dy = ((grab.y - cy) * GRAB_STIFFNESS) / norm;
  [u, v, w].forEach((weight, k) => {
    p[ids[k]].x += weight * dx;
    p[ids[k]].y += weight * dy;
  });
}

/** Avança um passo fixo. Devolve a maior velocidade (px/passo) para saber se o sistema parou. */
export function step(rig: Rig, grab: Grab | null) {
  let fastest = 0;
  const g = GRAVITY * STEP * STEP;

  for (const p of rig.points) {
    if (!p.w) continue;
    let vx = (p.x - p.px) * AIR;
    let vy = (p.y - p.py) * AIR;
    const speed = Math.hypot(vx, vy);
    if (speed > MAX_SPEED) {
      vx *= MAX_SPEED / speed;
      vy *= MAX_SPEED / speed;
    }
    fastest = Math.max(fastest, speed);
    p.px = p.x;
    p.py = p.y;
    p.x += vx;
    p.y += vy + g;
  }

  for (let iteration = 0; iteration < ITERATIONS; iteration++) {
    if (grab) applyGrab(rig, grab);
    for (const link of rig.links) {
      const a = rig.points[link.a];
      const b = rig.points[link.b];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const d = Math.hypot(dx, dy) || 0.0001;
      if (link.mode === "rope" && d <= link.len) continue;
      if (link.mode === "bend" && d >= link.len) continue;
      const k = (d - link.len) / d / (a.w + b.w);
      a.x += a.w * k * dx;
      a.y += a.w * k * dy;
      b.x -= b.w * k * dx;
      b.y -= b.w * k * dy;
    }
  }

  return fastest;
}
