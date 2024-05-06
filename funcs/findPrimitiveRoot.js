import eularPhi from "./eularPhi.js";
import primeFactorization from "./primeFactorization.js";
import calcOrder from "./calcOrder.js";

/**
 * @param {bigint} n 
 * @param {number} count 
 */
export default function findPrimitiveRoot(n, count=1) {
  const phiN = eularPhi(n, primeFactorization(n));
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
