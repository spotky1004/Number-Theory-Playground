import primeFactorization from "./primeFactorization.js";
import calcOrder from "./calcOrder.js";

/**
 * @param {bigint} n 
 * @param {bigint} phiN 
 * @param {number} count 
 */
export default function findPrimitiveRoot(n, phiN, count=1) {
  const phiNFactorization = primeFactorization(phiN);
  const out = [];
  for (let g = 2n; g < n; g++) {
    const result = calcOrder(g, n, phiNFactorization);
    if (result !== phiN) continue;
    out.push(g);
    if (out.length === count) break;
  }

  return out;
}
