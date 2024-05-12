import modInv from "./modInv.js";

/**
 * @param {bigint} a 
 * @param {bigint} b 
 * @param {bigint} m 
 */
export default function divide(a, b, m) {
  return a * modInv(b, m) % m
}
