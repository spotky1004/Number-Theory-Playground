import divAndPow from "./divAndPow.js";
import gcd from "./gcd.js";

/**
 * @param {bigint} x 
 * @param {bigint} n 
 * @param {bigint[]} phiNFactorization 
 */
export default function calcOrder(x, n, phiNFactorization) {
  if (gcd(x, n) !== 1n) return -1n;
  
  let order = phiNFactorization.reduce((a, b) => a * b, 1n);

  for (const p of phiNFactorization) {
    if (divAndPow(x, order / p, n) !== 1n) continue;
    order /= p;
  }

  return order;
}
