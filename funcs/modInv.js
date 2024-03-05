import divAndPow from "./divAndPow.js";
import isPrime from "./isPrime.js";
import primeFactorization from "./primeFactorization.js";
import eularPhi from "./eularPhi.js";
import gcd from "./gcd.js";

/**
 * @param {bigint} n 
 * @param {bigint | null} mod 
 */
export default function modInv(n, mod) {
  if (isPrime(mod)) {
    return divAndPow(n, mod - 2n, mod);
  } else {
    if (gcd(n, mod) !== 1n) return null;
    const phiN = eularPhi(mod, primeFactorization(mod));
    return divAndPow(n, phiN - 1n, mod);
  }
}
