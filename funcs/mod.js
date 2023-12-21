/**
 * @template {number | bigint} T 
 * @param {T} n 
 * @param {T} mod 
 * @returns {T} 
 */
export default function mod(n, mod) {
  return ((n % mod) + mod) % mod;
}
