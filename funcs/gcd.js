/**
 * @template {number | bigint} T 
 * @param {T} a 
 * @param {T} b 
 * @returns {T} 
*/
export default function gcd(a, b) {
  return b ? gcd(b, a%b) : a;
}
