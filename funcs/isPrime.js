import genPrimes from "./genPrimes.js";
import divAndPow from "./divAndPow.js";

const millerRabinPrimes = genPrimes(500).map(BigInt);
/**
 * @param {bigint} n 
 * @returns {boolean} 
*/
export default function isPrime(n) {
  if (n === 2n) return true;
  if (n < 2n) return false;

  n = BigInt(n);
  let d = n - 1n;

  let r = 0n;
  while ((d & 1n) === 0n) {
    r++;
    d /= 2n;
  }

  l: for (const p of millerRabinPrimes) {
    if (n === p) return true;
    if (divAndPow(p, d, n) === 1n) continue;
    for (let i = 0n; i < r; i++) {
      if (divAndPow(p, 2n**i * d, n) === n - 1n) continue l;
    }
    return false;
  }
  return true;
}
