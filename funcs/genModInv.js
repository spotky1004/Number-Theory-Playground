import isPrime from "./isPrime.js";
import eularPhi from "./eularPhi.js";
import primeFactorization from "./primeFactorization.js";
import gcd from "./gcd.js";
import divAndPow from "./divAndPow.js";

/**
 * @param {number} n 
 * @param {bigint} mod 
 * @returns {bigint[]} 
 */
export default function genModInv(n, mod) {
  if (isPrime(mod)) {
    const modInvs = Array(n + 1);
    modInvs[0] = Infinity;
    if (n < 1n) return modInvs;
    modInvs[1] = 1n;
    const bigN = BigInt(n);
    for (let i = 2n; i <= bigN; i += 1n) {
      modInvs[i] = modInvs[mod % i] * (mod - mod / i) % mod;
    }
    return modInvs;
  } else {
    const modInvs = Array(n + 1);
    for (let i = 0n; i <= n; i++) {
      if (gcd(i, mod) !== 1n) {
        modInvs[i] = null;
        continue;
      }
      const phiN = eularPhi(mod, primeFactorization(mod));
      modInvs[i] = divAndPow(i, phiN - 1n, mod);
    }
    return modInvs;
  }
}
