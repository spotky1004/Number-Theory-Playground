import gcd from "./gcd.js";

/**
 * @param {bigint} a 
 * @param {bigint} b 
 */
export default function lcm(a, b) {
  return a * b / gcd(a, b);
}
