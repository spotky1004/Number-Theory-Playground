import gcd from "./gcd.js";
import modInv from "./modInv.js";

/**
 * @param {bigint} a 
 * @param {bigint} b 
 * @param {bigint} m 
 */
export default function divide(a, b, m) {
  const div = gcd(a, b);
  if (gcd(b / div, m) !== 1n) return -1n;
  return (a / div) * modInv((b / div), m) % m;
}
