/**
 * @template {number | bigint} T 
 * @param {T} n 
 * @param {T[]} factors 
 * @returns {T} 
*/
export default function eularPhi(n, factors) {
  let out = n;
  for (const factor of [...new Set(factors)]) {
    out -= out / factor;
  }
  return out;
}
