import primeFactorization from "./primeFactorization.js";

/**
 * @param {bigint} n 
*/
export default function calcDivisorCount(n) {
  if (n === 0n) return -1n;
  let count = 1n;
  let sameCount = 1n;
  let prev = 0n;
  for (const factor of primeFactorization(n)) {
    if (prev !== factor) {
      count *= sameCount;
      sameCount = 0n;
      prev = factor;
    }
    sameCount++;
  }
  return count * sameCount;
}
