import eularPhi from "./eularPhi.js";
import primeFactorization from "./primeFactorization.js";
import calcOrder from "./calcOrder.js";

/**
 * @param {bigint} n 
 * @param {bigint} g 
 */
export default function isPrimitiveRoot(n, g) {
  const phiN = eularPhi(n, primeFactorization(n));
  return calcOrder(g, n, primeFactorization(phiN)) === phiN;
}
