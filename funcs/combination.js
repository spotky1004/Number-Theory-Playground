import divAndPow from "./divAndPow.js";

/**
 * @template {number | bigint} T 
 * @param {T} n 
 * @param {T} r 
 * @param {T} p
 * @param {T[]} factroials
*/
export default function combination(n, r, p, factroials) {
  // TODO: CRT
  const type = typeof n === "number" ? Number : BigInt;
  if (n < r) return type(0);
  return factroials[n] * divAndPow(factroials[n - r] * factroials[r], type(Number(p) - 2), p) % p;
}
