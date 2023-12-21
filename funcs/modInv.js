import divAndPow from "./divAndPow.js";
import isPrime from "./isPrime.js";
import primeFactorization from "./primeFactorization.js";
import eularPhi from "./eularPhi.js";

/**
 * @param {bigint} n 
 * @param {bigint} mod 
 */
export default function modInv(n, mod) {
  if (isPrime(mod)) {
    return divAndPow(n, mod - 2n, mod);
  } else {
    const phiN = eularPhi(mod, primeFactorization(mod));
    return divAndPow(n, phiN - 1n, mod);
  }
}
