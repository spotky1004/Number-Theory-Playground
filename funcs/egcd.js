import gcd from "./gcd.js";

/**
 * Solves "ax + by = n"
 * @param {bigint} a 
 * @param {bigint} b 
 * @param {bigint} n 
 * @returns {[x: bigint, y: bigint, xShift: bigint, yShift: bigint]?} 
 */
export default function egcd(a, b, c) {
  if (a === 0n && b === 0n) {
    if (c === 0n) return [0n, 0n, 1n, 1n];
    return null;
  }
  if (a === 0n) {
    if (c % b !== 0n) return null;
    return [0n, c / b, 0n, c / b];
  }
  if (b === 0n) {
    if (c % a !== 0n) return null;
    return [c / a, 0n, c / a, 0n];
  }
  
  let r0 = a, r1 = b;
  let x0 = 1n, x1 = 0n, y0 = 0n, y1 = 1n;
  let q = 0n, tmp;
  while (r1 > 0n) {
    q = r0 / r1;
    tmp = r0;
    r0 = r1, r1 = tmp - r1 * q;
    tmp = x0;
    x0 = x1, x1 = tmp - x1 * q;
    tmp = y0;
    y0 = y1, y1 = tmp - y1 * q;
  }

  const gcd = r0;
  if (c % gcd !== 0n) return null;
  const mul = c / gcd;
  let x = x0 * mul, y = y0 * mul;
  let xp = b / gcd, yp = -a / gcd;
  let offset = x / xp;
  if (x - xp * offset < 0n) offset--;
  x -= xp * offset;
  y -= yp * offset;

  return [x, y, xp, yp];
}